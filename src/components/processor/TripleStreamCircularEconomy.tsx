import React, { useState } from 'react';
import {
  Recycle,
  Sparkles,
  ShoppingBag,
  Factory,
  Flame,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Percent
} from 'lucide-react';

export const TripleStreamCircularEconomy: React.FC = () => {
  const [totalPoolVolumeKg, setTotalPoolVolumeKg] = useState<number>(5000);

  // Stream Splits:
  // Stream 1 (Grade A - Fresh Table): 65%
  // Stream 2 (Grade B - Food Processing Puree/Chips): 28%
  // Stream 3 (Grade C - Bio-Gas / Organic Fermented Fertilizer): 7%
  const stream1FreshKg = Math.round(totalPoolVolumeKg * 0.65);
  const stream2ProcessKg = Math.round(totalPoolVolumeKg * 0.28);
  const stream3BioKg = Math.round(totalPoolVolumeKg * 0.07);

  // Pricing:
  const stream1Rate = 24.5; // Fresh retail
  const stream2Rate = 18.5; // Processor floor
  const stream3Rate = 4.5;  // Bio-Gas green fertilizer credit

  const stream1TotalINR = Math.round(stream1FreshKg * stream1Rate);
  const stream2TotalINR = Math.round(stream2ProcessKg * stream2Rate);
  const stream3TotalINR = Math.round(stream3BioKg * stream3Rate);
  const totalMonetizedRevenueINR = stream1TotalINR + stream2TotalINR + stream3TotalINR;

  return (
    <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-100">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            <span>Out-Of-The-Box Innovation #4</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Recycle className="w-5 h-5 text-emerald-600" />
            "Triple-Stream" Zero-Waste Circular Agro-Economy
          </h3>
          <p className="text-xs text-stone-500 max-w-2xl">
            What about crushed or defective produce that even factories reject? Under Mitti2Market, 100% of the harvest is monetized across three intelligent streams—from fresh kitchen tables, to food factories, to organic bio-fertilizer!
          </p>
        </div>

        <div className="px-4 py-2 bg-emerald-800 text-white rounded-2xl text-center shrink-0">
          <div className="text-xl font-black">0.0% Waste</div>
          <div className="text-[10px] text-emerald-200 uppercase font-semibold">100% Harvest Monetized</div>
        </div>
      </div>

      {/* 3 Streams Visual Flow Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Stream 1: Fresh Table */}
        <div className="bg-gradient-to-b from-blue-50 to-white border-2 border-blue-200 rounded-2xl p-5 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 text-[10px] font-black uppercase">
              65% Allocation
            </span>
          </div>

          <div>
            <div className="text-[10px] font-bold text-blue-600 uppercase">Stream 1: Grade A Fresh</div>
            <h4 className="font-extrabold text-slate-900 text-base">Fresh Table Wholesale</h4>
            <p className="text-[11px] text-stone-500 mt-0.5">Blemish-free produce sent to retail chains &amp; Mandis</p>
          </div>

          <div className="p-3 bg-white rounded-xl border border-blue-100 space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-stone-500">Volume:</span>
              <span className="font-bold text-slate-900">{stream1FreshKg.toLocaleString()} kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Rate:</span>
              <span className="font-bold text-blue-700">₹{stream1Rate.toFixed(2)} / kg</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-stone-100 font-bold">
              <span>Payout:</span>
              <span className="text-blue-700">₹{stream1TotalINR.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Stream 2: Food Processing Units */}
        <div className="bg-gradient-to-b from-amber-50 to-white border-2 border-amber-200 rounded-2xl p-5 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Factory className="w-4 h-4" />
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black uppercase">
              28% Allocation
            </span>
          </div>

          <div>
            <div className="text-[10px] font-bold text-amber-700 uppercase">Stream 2: Grade B / Surplus</div>
            <h4 className="font-extrabold text-slate-900 text-base">Agro-Processing Plants</h4>
            <p className="text-[11px] text-stone-500 mt-0.5">Overripe/soft lots converted to Puree, Paste &amp; Flakes</p>
          </div>

          <div className="p-3 bg-white rounded-xl border border-amber-100 space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-stone-500">Volume:</span>
              <span className="font-bold text-slate-900">{stream2ProcessKg.toLocaleString()} kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Rate:</span>
              <span className="font-bold text-amber-700">₹{stream2Rate.toFixed(2)} / kg</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-stone-100 font-bold">
              <span>Payout:</span>
              <span className="text-amber-700">₹{stream2TotalINR.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Stream 3: Bio-Gas & Organic Compost */}
        <div className="bg-gradient-to-b from-emerald-50 to-white border-2 border-emerald-300 rounded-2xl p-5 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Flame className="w-4 h-4 text-emerald-700" />
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-900 text-[10px] font-black uppercase">
              7% Allocation
            </span>
          </div>

          <div>
            <div className="text-[10px] font-bold text-emerald-700 uppercase">Stream 3: Grade C Damaged</div>
            <h4 className="font-extrabold text-slate-900 text-base">Bio-Gas &amp; Organic Slurry</h4>
            <p className="text-[11px] text-stone-500 mt-0.5">Crushed lots converted to fermented bio-fertilizers</p>
          </div>

          <div className="p-3 bg-white rounded-xl border border-emerald-100 space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-stone-500">Volume:</span>
              <span className="font-bold text-slate-900">{stream3BioKg.toLocaleString()} kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Bio-Credit:</span>
              <span className="font-bold text-emerald-700">₹{stream3Rate.toFixed(2)} / kg</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-stone-100 font-bold">
              <span>Payout:</span>
              <span className="text-emerald-700">₹{stream3TotalINR.toLocaleString()}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Summary Footer Bar */}
      <div className="p-4 bg-stone-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-medium">Total Cluster Realized Value from {totalPoolVolumeKg.toLocaleString()} kg Harvest:</span>
          <span className="text-base font-extrabold text-emerald-400 font-mono">₹{totalMonetizedRevenueINR.toLocaleString()}</span>
        </div>
        <div className="text-[11px] text-stone-400 italic">
          Zero dumping • Full circular economy integration with local Gobardhan bio-gas units
        </div>
      </div>

    </div>
  );
};
