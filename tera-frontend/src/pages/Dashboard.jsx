/**
 * Dashboard Page Orchestrator
 * Integrates layout components (Header, Sidebar), feature modules, and dialog overlays
 * Directly wired to Supabase Backend API
 */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import OverviewTab from '../features/dashboard/OverviewTab';
import CalculatorTab from '../features/dashboard/CalculatorTab';
import VisionTab from '../features/dashboard/VisionTab';
import LumbungTab from '../features/dashboard/LumbungTab';
import FinanceTab from '../features/dashboard/FinanceTab';
import GamificationTab from '../features/dashboard/GamificationTab';
import DistributorQuotaTab from '../features/dashboard/DistributorQuotaTab';
import DistributorFleetTab from '../features/dashboard/DistributorFleetTab';
import LogoutModal from '../features/dashboard/Modals/LogoutModal';
import WithdrawModal from '../features/dashboard/Modals/WithdrawModal';
import ClusterModal from '../features/dashboard/Modals/ClusterModal';
import QRTicketModal from '../features/dashboard/Modals/QRTicketModal';
import ConfirmModal from '../features/dashboard/Modals/ConfirmModal';
import { DEFAULT_CLUSTERS, WEATHER_MATRIX } from '../constants/app.constants';
import { dashboardApi } from '../api/dashboard.api';
import { authApi } from '../api/auth.api';

export default function Dashboard() {
  const { user, logout, switchRole } = useAuth();
  const navigate = useNavigate();

  // Navigation & layout state
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Modal visibility states
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isClusterModalOpen, setIsClusterModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [deletingPlotId, setDeletingPlotId] = useState(null);

  // Environmental telemetry & cluster state
  const [clusters, setClusters] = useState(DEFAULT_CLUSTERS);
  const [timeOfDay, setTimeOfDay] = useState('siang');
  const [activeCluster, setActiveCluster] = useState(DEFAULT_CLUSTERS[0]);

  // Financial & gamification user state
  const [walletBalance, setWalletBalance] = useState(user?.wallet_balance || 2450000);
  const [walletDetails, setWalletDetails] = useState(null);
  const [userXP, setUserXP] = useState(user?.xp_points || 1450);
  const [claimedQuests, setClaimedQuests] = useState([]);
  const [missions, setMissions] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  // QR deposit state
  const [depositCrop, setDepositCrop] = useState('Selada Romaine Super');
  const [depositWeight, setDepositWeight] = useState(12.5);
  const [depositTicket, setDepositTicket] = useState(null);
  const [recentTickets, setRecentTickets] = useState([]);
  const [certifiedVisionData, setCertifiedVisionData] = useState(null);

  // Household farming plots state (from Supabase land_calculations)
  const [userCalculations, setUserCalculations] = useState([]);

  // Fetch initial data from Backend
  useEffect(() => {
    let isMounted = true;

    async function loadSystemData() {
      try {
        // 0. User Profile (XP & Balance from Database)
        const pRes = await authApi.getProfile();
        if (isMounted && pRes.data) {
          if (pRes.data.xp_points !== undefined) {
            setUserXP(Number(pRes.data.xp_points));
          }
          if (pRes.data.wallet_balance !== undefined) {
            setWalletBalance(parseFloat(pRes.data.wallet_balance));
          }
        }
      } catch (e) {
        console.warn('Profile fetch note:', e);
      }

      try {
        // 1. Clusters
        const cRes = await dashboardApi.getClusters();
        if (isMounted && cRes.data && cRes.data.length > 0) {
          setClusters(cRes.data);
          setActiveCluster(cRes.data[0]);
        }
      } catch (e) {
        console.warn('Using default clusters fallback:', e);
      }

      try {
        // 2. Wallet
        const wRes = await dashboardApi.getWalletDetails();
        if (isMounted && wRes.data) {
          setWalletDetails(wRes.data);
          setWalletBalance(parseFloat(wRes.data.balance || 0));
        }
      } catch (e) {
        console.warn('Wallet data fallback:', e);
      }

      try {
        // 3. Missions & Leaderboard
        const [mRes, lRes] = await Promise.all([
          dashboardApi.getMissions(),
          dashboardApi.getLeaderboard(),
        ]);
        if (isMounted) {
          if (mRes.data) {
            setMissions(mRes.data);
            const completed = mRes.data
              .filter((m) => m.is_completed)
              .map((m) => m.id);
            setClaimedQuests(completed);
          }
          if (lRes.data) setLeaderboard(lRes.data);
        }
      } catch (e) {
        console.warn('Gamification data fallback:', e);
      }

      try {
        // 4. Harvest Submissions (Supabase)
        const hRes = await dashboardApi.getMyHarvests();
        if (isMounted && hRes.data && hRes.data.length > 0) {
          setRecentTickets(hRes.data);
          const latest = hRes.data[0];
          const cropPrices = {
            'Selada Romaine Super': 28500,
            'Pakcoy Hijau Nauli': 24000,
            'Bayam Jepang Horenso': 35000,
            'Daun Mint & Basil Segar': 45000,
          };
          const unitPrice = cropPrices[latest.crop_name] || 28500;
          const weight = parseFloat(latest.claimed_weight_kg || 0);
          setDepositTicket({
            id: latest.id,
            batchId: latest.qr_ticket_code,
            crop: latest.crop_name,
            weight,
            cluster: latest.village_name ? `Hub ${latest.rw_number || 'RW'} ${latest.village_name}` : 'Hub RW 07 Rawasari',
            timestamp: new Date(latest.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) + ', ' + new Date(latest.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
            escrowValuation: Math.round(weight * unitPrice),
            qualityGrade: latest.ai_quality_grade ? latest.ai_quality_grade.replace('GRADE_', 'Grade ').replace('_', ' ') : 'Grade A',
            status: latest.status,
          });
        }
      } catch (e) {
        console.warn('Harvest history fetch fallback:', e);
      }

      try {
        // 5. User Land Calculations / Household Plots (Supabase)
        const calcRes = await dashboardApi.getUserCalculations();
        if (isMounted && calcRes.data) {
          setUserCalculations(calcRes.data);
        }
      } catch (e) {
        console.warn('User calculations fetch fallback:', e);
      }
    }

    loadSystemData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!user) return null;

  const currentWeather = WEATHER_MATRIX[timeOfDay] || WEATHER_MATRIX.siang;

  const handleGenerateTicket = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const cropPrices = {
      'Selada Romaine Super': 28500,
      'Pakcoy Hijau Nauli': 24000,
      'Bayam Jepang Horenso': 35000,
      'Daun Mint & Basil Segar': 45000,
    };
    const unitPrice = certifiedVisionData?.pricePerKg || cropPrices[depositCrop] || 28500;
    try {
      const res = await dashboardApi.createHarvestSubmission({
        cluster_id: activeCluster.id && activeCluster.id.includes('-') ? activeCluster.id : null,
        crop_name: depositCrop,
        claimed_weight_kg: Number(depositWeight),
        vision_metrics: certifiedVisionData?.metrics || null,
        photo_url: certifiedVisionData?.imageUrl || null,
      });

      const sub = res.data;
      const formattedTicket = {
        id: sub.id,
        batchId: sub.qr_ticket_code,
        crop: sub.crop_name,
        weight: parseFloat(sub.claimed_weight_kg),
        cluster: activeCluster.name || `Hub ${activeCluster.rw_number || 'RW07'}`,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
        escrowValuation: Math.round(depositWeight * unitPrice),
        qualityGrade: sub.ai_details?.qualityGradeDisplay || (sub.ai_quality_grade ? sub.ai_quality_grade.replace('GRADE_', 'Grade ').replace('_', ' ') : (certifiedVisionData?.grade || 'Grade A')),
        status: sub.status || 'HOME_VALIDATED',
      };
      setDepositTicket(formattedTicket);
      setRecentTickets((prev) => [sub, ...prev]);
      setUserXP((prev) => prev + 75);
      setIsQRModalOpen(true);
    } catch (err) {
      console.warn('Fallback local ticket:', err);
      const batchId = `TT-${activeCluster.rw_number || activeCluster.id || 'RW07'}-${Math.floor(100000 + Math.random() * 900000)}`;
      const localTicket = {
        batchId,
        crop: depositCrop,
        weight: depositWeight,
        cluster: activeCluster.name || `Hub ${activeCluster.rw_number || 'RW07'}`,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
        escrowValuation: Math.round(depositWeight * unitPrice),
        qualityGrade: certifiedVisionData?.grade || 'Grade A',
        status: 'HOME_VALIDATED',
      };
      setDepositTicket(localTicket);
      setRecentTickets((prev) => [{ ...localTicket, qr_ticket_code: batchId, crop_name: depositCrop, claimed_weight_kg: depositWeight }, ...prev]);
      setUserXP((prev) => prev + 75);
      setIsQRModalOpen(true);
    }
  };

  const handleQuickAction = () => {
    if (user.role === 'user') {
      handleGenerateTicket();
    } else {
      setActiveTab('dist-quota');
    }
  };

  const handleClaimQuest = async (questId, xpAward) => {
    try {
      const res = await dashboardApi.claimMission(questId);
      setClaimedQuests((prev) => [...prev, questId]);
      if (res.data?.totalXp !== undefined) {
        setUserXP(Number(res.data.totalXp));
      } else {
        setUserXP((prev) => prev + xpAward);
      }

      // Refresh missions and leaderboard dynamically
      const [mRes, lRes] = await Promise.all([
        dashboardApi.getMissions(),
        dashboardApi.getLeaderboard(),
      ]);
      if (mRes.data) {
        setMissions(mRes.data);
        const completed = mRes.data
          .filter((m) => m.is_completed)
          .map((m) => m.id);
        setClaimedQuests(completed);
      }
      if (lRes.data) setLeaderboard(lRes.data);
    } catch (err) {
      console.warn('Failed claiming mission:', err);
      setClaimedQuests((prev) => [...prev, questId]);
      setUserXP((prev) => prev + xpAward);
    }
  };

  const handleWithdrawSuccess = async (amount, paymentMethod) => {
    await dashboardApi.withdrawWallet(amount, paymentMethod);
    setWalletBalance((prev) => Math.max(0, prev - amount));
    // Refresh wallet
    const wRes = await dashboardApi.getWalletDetails();
    if (wRes.data) {
      setWalletDetails(wRes.data);
      setWalletBalance(parseFloat(wRes.data.balance || 0));
    }
  };

  const handleConfirmLogout = () => {
    logout();
    navigate('/home');
  };

  const handleSaveCalculationSuccess = (newCalc) => {
    setUserCalculations((prev) => [newCalc, ...prev]);
  };

  const confirmDeleteCalculation = async () => {
    if (!deletingPlotId) return;
    const calcId = deletingPlotId;
    try {
      await dashboardApi.deleteCalculation(calcId);
      setUserCalculations((prev) => prev.filter((c) => c.id !== calcId));
    } catch (err) {
      console.error('Gagal menghapus plot kalkulasi:', err);
      setUserCalculations((prev) => prev.filter((c) => c.id !== calcId));
    } finally {
      setDeletingPlotId(null);
    }
  };

  const handleDeleteCalculation = (calcId) => {
    setDeletingPlotId(calcId);
  };

  const handleSelectCropForVision = (cropName) => {
    setDepositCrop(cropName);
    setActiveTab('vision');
  };

  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-moss-800 selection:text-paper font-sans flex flex-col antialiased">
      
      {/* Top App Header & Telemetry */}
      <Header
        user={user}
        activeCluster={activeCluster}
        currentWeather={currentWeather}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onOpenClusterModal={() => setIsClusterModalOpen(true)}
        onOpenQuickAction={handleQuickAction}
        onOpenLogoutModal={() => setIsLogoutModalOpen(true)}
      />

      {/* Main Workspace Layout (Sidebar + Active Tab Content) */}
      <div className="max-w-[1600px] w-full mx-auto flex-1 flex flex-col lg:flex-row items-stretch">
        
        {/* Navigation Sidebar */}
        <Sidebar
          user={user}
          userXP={userXP}
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          isSidebarOpen={isSidebarOpen}
          onCloseSidebar={() => setIsSidebarOpen(false)}
          onSwitchRole={switchRole}
        />

        {/* Dynamic Content Panel */}
        <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-full lg:h-[calc(100vh-61px)] lg:overflow-y-auto scrollbar-thin space-y-8">
          
          {activeTab === 'overview' && (
            <OverviewTab
              user={user}
              userXP={userXP}
              setUserXP={setUserXP}
              activeCluster={activeCluster}
              timeOfDay={timeOfDay}
              setTimeOfDay={setTimeOfDay}
              currentWeather={currentWeather}
              onSelectTab={setActiveTab}
              userCalculations={userCalculations}
              onDeleteCalculation={handleDeleteCalculation}
              onSelectCropForVision={handleSelectCropForVision}
              walletBalance={walletBalance}
              pendingEscrow={walletDetails?.pendingEscrow || 0}
              recentTickets={recentTickets}
              transactions={walletDetails?.transactions || []}
            />
          )}

          {activeTab === 'calculator' && (
            <CalculatorTab
              userXP={userXP}
              setUserXP={setUserXP}
              onSaveSuccess={handleSaveCalculationSuccess}
              onSelectTab={setActiveTab}
            />
          )}

          {activeTab === 'vision' && (
            <VisionTab
              onSelectTab={setActiveTab}
              setDepositWeight={setDepositWeight}
              setDepositCrop={setDepositCrop}
              setCertifiedVisionData={setCertifiedVisionData}
            />
          )}

          {activeTab === 'lumbung' && (
            <LumbungTab
              activeCluster={activeCluster}
              depositCrop={depositCrop}
              certifiedVisionData={certifiedVisionData}
              depositWeight={depositWeight}
              setDepositWeight={setDepositWeight}
              depositTicket={depositTicket}
              setDepositTicket={setDepositTicket}
              recentTickets={recentTickets}
              onGenerateTicket={handleGenerateTicket}
              onOpenQRModal={() => setIsQRModalOpen(true)}
            />
          )}

          {activeTab === 'finance' && (
            <FinanceTab
              walletBalance={walletBalance}
              pendingEscrow={walletDetails?.pendingEscrow}
              totalWithdrawn={walletDetails?.totalWithdrawn}
              transactions={walletDetails?.transactions || []}
              onOpenWithdrawModal={() => setIsWithdrawModalOpen(true)}
            />
          )}

          {activeTab === 'gamification' && (
            <GamificationTab
              user={user}
              userXP={userXP}
              missions={missions}
              claimedQuests={claimedQuests}
              onClaimQuest={handleClaimQuest}
              leaderboard={leaderboard}
            />
          )}

          {activeTab === 'dist-quota' && (
            <DistributorQuotaTab />
          )}

          {activeTab === 'dist-fleet' && (
            <DistributorFleetTab />
          )}

        </main>
      </div>

      {/* Overlay Dialogs */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
      />

      <WithdrawModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        walletBalance={walletBalance}
        onWithdrawSuccess={handleWithdrawSuccess}
      />

      <ClusterModal
        isOpen={isClusterModalOpen}
        onClose={() => setIsClusterModalOpen(false)}
        clusters={clusters}
        activeCluster={activeCluster}
        onSelectCluster={setActiveCluster}
      />

      <QRTicketModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        depositTicket={depositTicket}
      />

      <ConfirmModal
        isOpen={!!deletingPlotId}
        onClose={() => setDeletingPlotId(null)}
        onConfirm={confirmDeleteCalculation}
        title="Hapus Plot Budidaya"
        message="Apakah Anda yakin ingin menghapus unit pemantauan plot tanam ini dari ringkasan dasbor Anda?"
        confirmText="Hapus Plot"
        cancelText="Batal"
        isDanger={true}
      />

    </div>
  );
}
