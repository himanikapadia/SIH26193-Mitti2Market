import React, { useState } from 'react';
import {
  Truck,
  Sun,
  Droplets,
  DollarSign,
  TrendingDown,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Scale
} from 'lucide-react';

export const PulpOnWheelsSimulator: React.FC = () => {
  const [harvestWeightKg, setHarvestWeightKg] = useState<number>(2000);

  // Math Calculations:
  // Water content in fresh tomatoes: ~90%
  // 1,000 kg yields ~200 kg aseptic paste (28° Brix)
  const pulpOutputKg = Math.round(harvestWeightKg * 0.20);
  const waterRetainedLiters = Math.round(harvestWeightKg * 0.78); // Water retained at village for compost/irrigation

  // Freight calculation:
  // Traditional freight: ₹3.50 per kg transported 150km
  const traditionalFreightCostINR = Math.round(harvestWeightKg * 3.5);
  const pulpFreightCostINR = Math.round(pulpOutputKg * 3.5);
  const freightSavedINR = traditionalFreightCostINR - pulpFreightCostINR;
  const freightSavedPercent = Math.round((freightSavedINR / traditionalFreightCostINR) * 100);

  // Carbon emission saved (kg CO2e approx 0.12 kg CO2 per tonne-km)
  const co2SavedKg = Math.round(((harvestWeightKg - pulpOutputKg) / 1000) * 150 * 0.12);

  return (
    <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-100">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>Out-Of-The-Box Innovation #2</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Sun className="w-5 h-5 text-amber-500" />
            "Pulp-on-Wheels": Decentralized Solar Micro-Processing Van
          </h3>
          <p className="text-xs text-stone-500 max-w-2xl">
            Why transport 90% water across highways? Our mobile solar-powered van processes raw tomatoes into 200kg aseptic paste right at the village cluster—slashing freight weight by 80% and saving local irrigation water!
          </p>
        </div>

        <span className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5 shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          -80% Freight Burden
        </span>
      </div>

      {/* Interactive Harvest Slider */}
      <div className="space-y-3 bg-stone-50 p-5 rounded-2xl border border-stone-200">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
            Harvest Batch Delivered to Village Kiosk:
          </span>
          <span className="text-xl font-extrabold text-amber-800">
            {harvestWeightKg.toLocaleString()} kg ({ (harvestWeightKg / 1000).toFixed(1) } Tonnes)
          </span>
        </div>
        <input
          type="range"
          min="500"
          max="5000"
          step="250"
          value={harvestWeightKg}
          onChange={(e) => setHarvestWeightKg(Number(e.target.value))}
          className="w-full h-2.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
        />
        <div className="flex justify-between text-[10px] text-stone-400 font-mono font-semibold">
          <span>500 kg (Micro-Cluster)</span>
          <span>2,500 kg (Mid-FPO Run)</span>
          <span>5,000 kg (Full Village Pool)</span>
        </div>
      </div>

      {/* Interactive Visual Comparison: Traditional vs. Pulp-on-Wheels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left: Traditional Heavy Transit */}
        <div className="bg-rose-50/60 border border-rose-200 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-200 text-rose-800 text-[10px] font-bold uppercase">
              Traditional Logistics Trap
            </span>
            <span className="text-sm font-bold text-rose-700">90% Water Hauling</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-rose-100">
              <span className="text-stone-600">Total Dispatch Weight:</span>
              <span className="font-extrabold text-slate-900">{harvestWeightKg.toLocaleString()} kg</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-rose-100">
              <span className="text-stone-600">Water Transported Inefficiently:</span>
              <span className="font-bold text-rose-600 font-mono">{(harvestWeightKg * 0.9).toLocaleString()} kg (90%)</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-rose-100">
              <span className="text-stone-600">Highway Transit Freight Bill:</span>
              <span className="font-extrabold text-base text-rose-700">₹{traditionalFreightCostINR.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-600">Heat Degradation Risk:</span>
              <span className="font-bold text-rose-600">22% Spoilage in Uncooled Transit</span>
            </div>
          </div>
        </div>

        {/* Right: Pulp-On-Wheels Route */}
        <div className="bg-emerald-50/70 border-2 border-emerald-300 rounded-2xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-800 text-[10px] font-bold uppercase">
              Pulp-On-Wheels Solar Van
            </span>
            <span className="text-sm font-extrabold text-emerald-700">Aseptic Concentrate</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-100">
              <span className="text-stone-600">Processed Paste Weight:</span>
              <span className="font-extrabold text-emerald-800 font-mono text-sm">{pulpOutputKg.toLocaleString()} kg (Only 20%!)</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-emerald-100">
              <span className="text-stone-600">Irrigation Water Saved for Village:</span>
              <span className="font-bold text-blue-700 font-mono">{waterRetainedLiters.toLocaleString()} Liters</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-emerald-100">
              <span className="text-stone-600">New Optimized Freight Bill:</span>
              <span className="font-extrabold text-base text-emerald-700">₹{pulpFreightCostINR.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-600">Net Logistics Savings:</span>
              <span className="font-extrabold text-base text-emerald-600">Save ₹{freightSavedINR.toLocaleString()} (-{freightSavedPercent}%)</span>
            </div>
          </div>
        </div>

      </div>

      {/* Innovation Summary Callout */}
      <div className="p-4 bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-blue-500/10 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-800 font-semibold">
          <Droplets className="w-5 h-5 text-blue-600 shrink-0" />
          <span>Village retains {waterRetainedLiters.toLocaleString()}L of clean condensation water for organic bio-slurry, while saving {co2SavedKg} kg of CO2 emissions!</span>
        </div>
        <span className="bg-emerald-700 text-white px-3 py-1 rounded-xl text-[11px] font-bold whitespace-nowrap">
          Circular Bio-Economy
        </span>
      </div>

    </div>
  );
};
