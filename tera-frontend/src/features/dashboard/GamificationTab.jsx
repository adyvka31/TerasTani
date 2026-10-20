/**
 * Dashboard Tab 6: Quests & Kelurahan Community Leaderboard
 */
import { Award } from 'lucide-react';

export default function GamificationTab({
  user,
  userXP,
  claimedQuests,
  onClaimQuest,
}) {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      <div className="bg-moss-950 text-paper rounded-[2.5rem] p-7 sm:p-10 border-2 border-ink shadow-[8px_8px_0px_0px_#171715]">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border-2 border-white/20 bg-moss-900 font-mono text-xs uppercase font-bold text-ochre-300">
            <Award className="w-3.5 h-3.5" />
            <span>Ekosistem Insentif Partisipatif RW</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-normal text-paper">
            Misi Budidaya & <span className="font-editorial-italic text-ochre-400">Peringkat Komunal</span>
          </h1>
          <p className="text-paper/70 text-xs sm:text-sm leading-relaxed">
            Setiap setoran panen berkualitas dan pencatatan presisi menghasilkan Poin XP yang dapat ditukarkan dengan bibit unggul impor, nutrisi gratis dari dinas terkait, serta voucher diskon peralatan irigasi.
          </p>
        </div>
      </div>

      {/* Quests & Leaderboard Grid */}
      <div className="grid lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left: Active Quests */}
        <div className="lg:col-span-6 bg-white border-2 border-ink rounded-[2.5rem] p-7 shadow-[8px_8px_0px_0px_#171715] flex flex-col justify-between h-full space-y-4">
          <div className="pb-3 border-b-2 border-ink/10 flex items-center justify-between">
            <span className="font-mono text-xs uppercase font-bold text-ink">
              Misi Harian & Mingguan
            </span>
            <span className="font-mono text-xs text-ochre-600 font-bold">Total XP: {userXP}</span>
          </div>

          <div className="space-y-3 font-mono text-xs overflow-y-auto max-h-[460px] pr-1.5 scrollbar-thin">
            {[
              { id: 'q1', title: 'Catat pH & EC Air 3 Hari Berturut', xp: 50, desc: 'Jaga kestabilan nutrisi tandon hidroponik pekarangan Anda.' },
              { id: 'q2', title: 'Validasi Foto Panen dengan Kamera AI', xp: 75, desc: 'Gunakan fitur Computer Vision untuk memastikan standar mutu Grade A.' },
              { id: 'q3', title: 'Setor Minimal 10 kg ke Crate Lumbung', xp: 120, desc: 'Bantu klaster RW Anda mencapai kuota truk logistik mingguan.' }
            ].map((q) => {
              const isClaimed = claimedQuests.includes(q.id);
              return (
                <div key={q.id} className="p-4 rounded-2xl bg-ivory border-2 border-ink/20 flex flex-col justify-between gap-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-ink text-sm">{q.title}</span>
                      <span className="font-bold text-ochre-700 bg-ochre-100 px-2 py-0.5 rounded border border-ochre-300 text-[10px]">
                        +{q.xp} XP
                      </span>
                    </div>
                    <p className="font-sans text-xs text-graphite leading-relaxed">{q.desc}</p>
                  </div>

                  <button
                    type="button"
                    disabled={isClaimed}
                    onClick={() => onClaimQuest(q.id, q.xp)}
                    className={`py-2 px-4 rounded-xl border-2 font-mono text-xs uppercase font-bold transition-all cursor-pointer ${
                      isClaimed
                        ? 'bg-leaf-200 text-leaf-800 border-leaf-400 opacity-80 cursor-default'
                        : 'bg-ochre-400 text-ink border-ink hover:bg-ochre-300 shadow-[2px_2px_0px_0px_#171715]'
                    }`}
                  >
                    {isClaimed ? '✓ Hadiah XP Sudah Diklaim' : `Selesaikan & Klaim +${q.xp} XP`}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Leaderboard Kelurahan */}
        <div className="lg:col-span-6 bg-ivory border-2 border-ink rounded-[2.5rem] p-7 shadow-[8px_8px_0px_0px_#171715] flex flex-col justify-between h-full space-y-4">
          <div className="pb-3 border-b-2 border-ink/10 flex items-center justify-between font-mono text-xs">
            <span className="font-bold text-ink uppercase">Papan Peringkat Rawasari (Bulan Ini)</span>
            <span className="text-graphite">14 Klaster</span>
          </div>

          <div className="space-y-2.5 font-mono text-xs overflow-y-auto max-h-[460px] pr-1.5 scrollbar-thin">
            {[
              { rank: 1, name: 'Siti Rahmawati (RT 03)', xp: '2.420 XP', kg: '84 kg', medal: '🥇' },
              { rank: 2, name: 'Bambang Trianto (RT 05)', xp: '1.890 XP', kg: '62 kg', medal: '🥈' },
              { rank: 3, name: `${user.name || 'Adyvka'} (Anda)`, xp: `${userXP} XP`, kg: '42.5 kg', medal: '🥉', isSelf: true },
              { rank: 4, name: 'Kurniawan H. (RT 01)', xp: '1.210 XP', kg: '38 kg' },
              { rank: 5, name: 'Dewi Anggraini (RT 07)', xp: '980 XP', kg: '31 kg' }
            ].map((row) => (
              <div 
                key={row.rank} 
                className={`p-3.5 rounded-xl border-2 flex items-center justify-between ${
                  row.isSelf 
                    ? 'bg-ochre-400/30 border-ochre-600 font-bold' 
                    : 'bg-white border-ink/15'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 text-center font-bold text-sm">
                    {row.medal || `#${row.rank}`}
                  </span>
                  <span className="text-ink font-semibold">{row.name}</span>
                </div>
                <div className="flex items-center gap-4 text-right">
                  <span className="text-moss-800 font-bold">{row.xp}</span>
                  <span className="text-graphite text-[10px] hidden sm:inline">{row.kg} panen</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
