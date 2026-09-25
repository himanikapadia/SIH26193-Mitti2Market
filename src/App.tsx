import React from 'react';
import { DemoProvider, useDemo } from './context/DemoContext';
import { Header } from './components/common/Header';
import { ToastSystem } from './components/common/ToastSystem';
import { AutoDemoGuideHUD } from './components/common/AutoDemoGuideHUD';
import { BuyerPortal } from './components/buyer/BuyerPortal';
import { FarmerModule } from './components/farmer/FarmerModule';
import { AgroProcessorPortal } from './components/processor/AgroProcessorPortal';
import { LogisticsPortal } from './components/logistics/LogisticsPortal';
import { AdminConsole } from './components/admin/AdminConsole';
import { ShieldCheck, Heart, Sparkles } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { activeTab, setActiveTab } = useDemo();

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-slate-800 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Global Header */}
      <Header />

      {/* Persistent Interactive 3-Module Workflow Stepper */}
      <div className="bg-white border-b border-stone-200 py-3 px-4 shadow-2xs sticky top-[57px] z-30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase text-stone-400 tracking-wider">
              3-Step Connected Flow:
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 flex-wrap text-xs">
            {/* Step 1 Button */}
            <button
              onClick={() => setActiveTab('farmer')}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'farmer'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black ${
                activeTab === 'farmer' ? 'bg-white text-emerald-800' : 'bg-stone-300 text-stone-700'
              }`}>
                1
              </span>
              <span>🌾 Step 1: Farmer Harvest &amp; Shelf-Life</span>
            </button>

            <span className="text-stone-300 font-bold hidden sm:inline">➔</span>

            {/* Step 2 Button */}
            <button
              onClick={() => setActiveTab('processor')}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'processor'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black ${
                activeTab === 'processor' ? 'bg-white text-amber-800' : 'bg-stone-300 text-stone-700'
              }`}>
                2
              </span>
              <span>🏭 Step 2: Agro-Processing Factory</span>
            </button>

            <span className="text-stone-300 font-bold hidden sm:inline">➔</span>

            {/* Step 3 Button */}
            <button
              onClick={() => setActiveTab('logistics')}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'logistics'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black ${
                activeTab === 'logistics' ? 'bg-white text-amber-800' : 'bg-stone-300 text-stone-700'
              }`}>
                3
              </span>
              <span>🚚 Step 3: Cold Transport &amp; Payout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Module Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'buyer' && <BuyerPortal />}
        {activeTab === 'farmer' && <FarmerModule />}
        {activeTab === 'processor' && <AgroProcessorPortal />}
        {activeTab === 'logistics' && <LogisticsPortal />}
        {activeTab === 'admin' && <AdminConsole />}
      </main>

      {/* Auto Demo Guided Tour HUD */}
      <AutoDemoGuideHUD />

      {/* Global Toast System */}
      <ToastSystem />

      {/* Hackathon Footer */}
      <footer className="bg-white border-t border-stone-200 mt-16 py-8 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-700 text-white flex items-center justify-center text-xs font-bold shadow-xs">
              🌾
            </div>
            <span className="font-extrabold text-slate-900">Mitti2Market</span>
            <span className="text-stone-400">•</span>
            <span className="text-emerald-800 font-semibold">Small Farms. One Powerful Market.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
              <ShieldCheck className="w-4 h-4" />
              Smart Escrow Guaranteed
            </span>
            <span className="text-stone-300">•</span>
            <span>Smart India Hackathon Prototype</span>
            <span className="text-stone-300">•</span>
            <span className="font-mono text-stone-400">Surat Cluster Demo</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export function App() {
  return (
    <DemoProvider>
      <MainLayout />
    </DemoProvider>
  );
}

export default App;
