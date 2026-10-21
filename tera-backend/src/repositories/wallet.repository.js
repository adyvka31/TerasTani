/**
 * Wallet Repository
 * Encapsulates all direct PostgreSQL queries for the `wallet_transactions` table
 */
const { query, pool } = require('../config/db.config');

class WalletRepository {
  async findByUserId(userId, limit = 20, offset = 0) {
    const text = `
      SELECT * FROM wallet_transactions
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT $2 OFFSET $3
    `;
    const result = await query(text, [userId, limit, offset]);
    return result.rows;
  }

  async findById(id) {
    const text = 'SELECT * FROM wallet_transactions WHERE id = $1 LIMIT 1';
    const result = await query(text, [id]);
    return result.rows[0] || null;
  }

  async create({ user_id, harvest_submission_id, amount, type, payment_method, notes, reference_code }) {
    const text = `
      INSERT INTO wallet_transactions
        (user_id, harvest_submission_id, amount, type, payment_method, notes, reference_code)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const result = await query(text, [
      user_id, harvest_submission_id, amount, type, payment_method, notes, reference_code,
    ]);
    return result.rows[0];
  }

  async updateStatus(id, status) {
    const setClauses = ['status = $2'];
    if (status === 'COMPLETED') {
      setClauses.push('processed_at = NOW()');
    }
    const text = `UPDATE wallet_transactions SET ${setClauses.join(', ')} WHERE id = $1 RETURNING *`;
    const result = await query(text, [id, status]);
    return result.rows[0] || null;
  }

  /**
   * Atomically process a withdrawal: create transaction + debit user balance
   */
  async processWithdrawal(userId, amount, paymentMethod, notes) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // 1. Check balance
      const balRes = await client.query('SELECT wallet_balance FROM users WHERE id = $1 FOR UPDATE', [userId]);
      const balance = parseFloat(balRes.rows[0]?.wallet_balance || 0);
      if (balance < amount) {
        throw new Error('INSUFFICIENT_BALANCE');
      }

      // 2. Debit user wallet
      await client.query(
        'UPDATE users SET wallet_balance = wallet_balance - $2 WHERE id = $1',
        [userId, amount]
      );

      // 3. Create transaction record
      const refCode = `WD-${Date.now()}-${Math.floor(Math.random() * 9999)}`;
      const txRes = await client.query(
        `INSERT INTO wallet_transactions (user_id, amount, type, status, payment_method, notes, reference_code, processed_at)
         VALUES ($1, $2, 'WITHDRAWAL', 'COMPLETED', $3, $4, $5, NOW())
         RETURNING *`,
        [userId, amount, paymentMethod, notes, refCode]
      );

      await client.query('COMMIT');
      return txRes.rows[0];
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }

  /**
   * Atomically release escrow: credit user balance + create transaction
   */
  async releaseEscrow(userId, harvestSubmissionId, amount) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // 1. Credit user wallet
      await client.query(
        'UPDATE users SET wallet_balance = wallet_balance + $2 WHERE id = $1',
        [userId, amount]
      );

      // 2. Create escrow release transaction (HARVEST_PAYOUT)
      const refCode = `ESC-${Date.now()}-${Math.floor(Math.random() * 9999)}`;
      const txRes = await client.query(
        `INSERT INTO wallet_transactions (user_id, harvest_submission_id, amount, type, status, reference_code, processed_at)
         VALUES ($1, $2, $3, 'HARVEST_PAYOUT', 'COMPLETED', $4, NOW())
         RETURNING *`,
        [userId, harvestSubmissionId, amount, refCode]
      );

      await client.query('COMMIT');
      return txRes.rows[0];
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }

  async getUserBalance(userId) {
    const text = 'SELECT wallet_balance FROM users WHERE id = $1';
    const result = await query(text, [userId]);
    return parseFloat(result.rows[0]?.wallet_balance || 0);
  }

  async getSummary(userId) {
    const txSummaryText = `
      SELECT
        COALESCE(SUM(CASE WHEN type = 'WITHDRAWAL' AND status = 'COMPLETED' THEN amount ELSE 0 END), 0) AS total_withdrawn,
        COALESCE(SUM(CASE WHEN type IN ('HARVEST_PAYOUT', 'ESCROW_RELEASE', 'BONUS') AND status = 'COMPLETED' THEN amount ELSE 0 END), 0) AS total_earned,
        COALESCE(SUM(CASE WHEN status = 'PENDING' THEN amount ELSE 0 END), 0) AS tx_pending_escrow
      FROM wallet_transactions
      WHERE user_id = $1
    `;
    const harvestEscrowText = `
      SELECT COALESCE(SUM(
        hs.claimed_weight_kg * CASE 
          WHEN hs.crop_name LIKE '%Mint%' THEN 45000
          WHEN hs.crop_name LIKE '%Bayam%' THEN 35000
          WHEN hs.crop_name LIKE '%Pakcoy%' THEN 24000
          ELSE 28500
        END
      ), 0) AS harvest_pending_escrow
      FROM harvest_submissions hs
      WHERE hs.user_id = $1 AND hs.status IN ('PENDING_HOME', 'HOME_VALIDATED', 'PHYSICAL_CHECKED')
    `;
    const [txRes, harvestRes] = await Promise.all([
      query(txSummaryText, [userId]),
      query(harvestEscrowText, [userId]),
    ]);
    const txRow = txRes.rows[0] || {};
    const harvestRow = harvestRes.rows[0] || {};
    const totalPending = parseFloat(txRow.tx_pending_escrow || 0) + parseFloat(harvestRow.harvest_pending_escrow || 0);

    return {
      total_withdrawn: parseFloat(txRow.total_withdrawn || 0),
      total_earned: parseFloat(txRow.total_earned || 0),
      pending_escrow: totalPending,
    };
  }
}

module.exports = new WalletRepository();
