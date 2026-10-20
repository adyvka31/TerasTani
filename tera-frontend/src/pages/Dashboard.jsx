/**
 * Dashboard Page Orchestrator
 * Integrates layout components (Header, Sidebar), feature modules, and dialog overlays
 */
import { useState } from 'react';
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
import { DEFAULT_CLUSTERS, WEATHER_MATRIX } from '../constants/app.constants';

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

  // Environmental telemetry & cluster state
  const [timeOfDay, setTimeOfDay] = useState('siang');
  const [activeCluster, setActiveCluster] = useState(DEFAULT_CLUSTERS[0]);

  // Financial & gamification user state
  const [walletBalance, setWalletBalance] = useState(2450000);
  const [userXP, setUserXP] = useState(1450);
  const [claimedQuests, setClaimedQuests] = useState([]);

  // QR deposit state
  const [depositCrop, setDepositCrop] = useState('Selada Romaine Super');
  const [depositWeight, setDepositWeight] = useState(12.5);
  const [depositTicket, setDepositTicket] = useState(null);

  if (!user) return null;

  const currentWeather = WEATHER_MATRIX[timeOfDay] || WEATHER_MATRIX.siang;

  const handleGenerateTicket = (e) => {
    e.preventDefault();
    const batchId = `TT-${activeCluster.id}-${Math.floor(100000 + Math.random() * 900000)}`;
    setDepositTicket({
      batchId,
      crop: depositCrop,
      weight: depositWeight,
      cluster: activeCluster.name,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      escrowValuation: Math.round(depositWeight * 28500),
    });
    setIsQRModalOpen(true);
  };

  const handleQuickAction = () => {
    if (user.role === 'user') {
      setDepositTicket({
        batchId: `TT-${activeCluster.id}-${Math.floor(100000 + Math.random() * 900000)}`,
        crop: 'Selada Romaine Super (Grade A+)',
        weight: 15.0,
        cluster: activeCluster.name,
        timestamp: 'Pukul 14:15 WIB',
        escrowValuation: 427500,
      });
      setIsQRModalOpen(true);
    } else {
      setActiveTab('dist-quota');
    }
  };

  const handleClaimQuest = (questId, xpAward) => {
    if (!claimedQuests.includes(questId)) {
      setClaimedQuests([...claimedQuests, questId]);
      setUserXP(userXP + xpAward);
    }
  };

  const handleWithdrawSuccess = (amount) => {
    setWalletBalance((prev) => Math.max(0, prev - amount));
  };

  const handleConfirmLogout = () => {
    logout();
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-moss-800 selection:text-paper font-sans flex flex-col antialiased">
      
      {/* Top App Header & Telemetry */}
      <Header
        user={user}
        activeTab={activeTab}
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
            />
          )}

          {activeTab === 'calculator' && (
            <CalculatorTab
              userXP={userXP}
              setUserXP={setUserXP}
            />
          )}

          {activeTab === 'vision' && (
            <VisionTab
              onSelectTab={setActiveTab}
              setDepositWeight={setDepositWeight}
            />
          )}

          {activeTab === 'lumbung' && (
            <LumbungTab
              activeCluster={activeCluster}
              depositCrop={depositCrop}
              setDepositCrop={setDepositCrop}
              depositWeight={depositWeight}
              setDepositWeight={setDepositWeight}
              depositTicket={depositTicket}
              onGenerateTicket={handleGenerateTicket}
            />
          )}

          {activeTab === 'finance' && (
            <FinanceTab
              walletBalance={walletBalance}
              onOpenWithdrawModal={() => setIsWithdrawModalOpen(true)}
            />
          )}

          {activeTab === 'gamification' && (
            <GamificationTab
              user={user}
              userXP={userXP}
              claimedQuests={claimedQuests}
              onClaimQuest={handleClaimQuest}
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
        activeCluster={activeCluster}
        onSelectCluster={setActiveCluster}
      />

      <QRTicketModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        depositTicket={depositTicket}
      />

    </div>
  );
}
