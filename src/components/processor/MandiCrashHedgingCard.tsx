import React, { useState } from 'react';
import {
  ShieldAlert,
  TrendingDown,
  Lock,
  Sparkles,
  CheckCircle2,
  AlertOctagon,
  ArrowRight,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

export const MandiCrashHedgingCard: React.FC = () => {
  const [isHedgeActive, setIsHedgeActive] = useState<boolean>(true);
  const [simulatedMandiSpotRate, setSimulatedMandiSpotRate] = useState<number>(7.5); // ₹7.50 / kg crash price
  const lockedProcessorFloorRate = 18.5; // ₹18.50 / kg guaranteed
  const harvestLotKg = 2500; // 2.5 tonnes lot

  const unhedgedRevenueINR = Math.round(harvestLotKg * simulatedMandiSpotRate);
  const hedgedRevenueINR = Math.round(harvestLotKg * lockedProcessorFloorRate);
  const protectedIncomeINR = hedgedRevenueINR - unhedgedRevenueINR;

  return (
    <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-100">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-100 text-rose-900 text-[10px] font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-rose-600" />
            <span>Out-Of-The-Box Innovation #3</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            Predictive Mandi Crash Hedging Engine
          </h3>
          <p className="text-xs text-stone-500 max-w-2xl">
            Why wait until prices hit rock bottom? Our AI predicts APMC mandi supply gluts 48 hours in advance, auto-hedging smallholder lots into guaranteed food processor contracts 24 hours BEFORE harvest.
          </p>
        </div>

        {/* Hedge Toggle Button */}
        <button
          onClick={() => setIsHedgeActive(!isHedgeActive)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs ${
            isHedgeActive
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
              : 'bg-stone-800 hover:bg-stone-900 text-stone-200'
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          <span>{isHedgeActive ? 'Hedging Contract: LOCKED' : 'Simulate Unhedged Mandi Shock'}</span>
        </button>
      </div>

      {/* Live AI Alert Banner */}
      <div className="p-4 bg-rose-50 border-2 border-rose-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <AlertOctagon className="w-5 h-5 text-rose-600 shrink-0 animate-pulse" />
          <div>
            <div className="font-extrabold text-rose-950">
              ⚠️ Simulated Agmarknet Alert: Surat Mandi Crash Predicted in 36 Hours
            </div>
            <div className="text-rose-700 text-[11px] mt-0.5">
              Projected arrival surge: +140 MT over-supply. Spot table rates collapsing from ₹24.00 ➔ ₹{simulatedMandiSpotRate.toFixed(2)}/kg.
            </div>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-rose-200 text-rose-900 font-extrabold text-[10px] uppercase tracking-wider shrink-0">
          Glut Warning Triggered
        </span>
      </div>

      {/* Financial Protection Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Scenario 1: Without Hedging (Distress Crash) */}
        <div className={`p-6 rounded-2xl border transition-all ${
          !isHedgeActive
            ? 'bg-rose-50 border-2 border-rose-400 shadow-md'
            : 'bg-stone-50 border-stone-200 opacity-75'
        }`}>
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <span className="text-xs font-bold uppercase text-stone-600">Scenario A: Unprotected Spot Mandi</span>
            <span className="text-xs font-mono font-bold text-rose-600">Crash Rate: ₹{simulatedMandiSpotRate.toFixed(2)}/kg</span>
          </div>

          <div className="space-y-3 pt-4 text-xs">
            <div className="flex justify-between">
              <span className="text-stone-600">2.5 Tonnes Harvest Yield:</span>
              <span className="font-bold text-slate-800">{harvestLotKg.toLocaleString()} kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-600">Farmer Net Cash Realized:</span>
              <span className="font-extrabold text-base text-rose-700 font-mono">₹{unhedgedRevenueINR.toLocaleString()}</span>
            </div>
            <div className="text-[11px] text-rose-700 leading-snug">
              Result: Farmer fails to recover labor costs, often forced to dump produce on roads.
            </div>
          </div>
        </div>

        {/* Scenario 2: With Mitti2Market Pre-Harvest Hedging */}
        <div className={`p-6 rounded-2xl border-2 transition-all ${
          isHedgeActive
            ? 'bg-emerald-50 border-emerald-400 shadow-lg'
            : 'bg-stone-50 border-stone-200 opacity-75'
        }`}>
          <div className="flex items-center justify-between pb-3 border-b border-emerald-200">
            <span className="text-xs font-bold uppercase text-emerald-800 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Scenario B: Mitti2Market Pre-Harvest Hedge
            </span>
            <span className="text-xs font-mono font-bold text-emerald-700">Guaranteed: ₹{lockedProcessorFloorRate.toFixed(2)}/kg</span>
          </div>

          <div className="space-y-3 pt-4 text-xs">
            <div className="flex justify-between">
              <span className="text-stone-600">Contract Partner:</span>
              <span className="font-bold text-slate-900">Kissan Tomato Puree Unit #4</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-600">Guaranteed Farmer Payout:</span>
              <span className="font-extrabold text-base text-emerald-700 font-mono">₹{hedgedRevenueINR.toLocaleString()}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-emerald-200">
              <span className="font-bold text-slate-900">Net Crash Protection:</span>
              <span className="font-extrabold text-emerald-700 text-sm">
                +₹{protectedIncomeINR.toLocaleString()} Protected (+{Math.round((protectedIncomeINR / unhedgedRevenueINR) * 100)}%)
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
