import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import {
  Sprout,
  PlusCircle,
  CheckCircle2,
  PhoneCall,
  Users,
  Radio,
  Clock,
  HelpCircle,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

export const FarmerDailyHarvestPost: React.FC = () => {
  const { farmers, selectedFarmerId, setActiveTab } = useDemo();
  const farmer = farmers.find((f) => f.id === selectedFarmerId) || farmers[0];

  const [selectedCrop, setSelectedCrop] = useState<string>(farmer.todayCrop || 'Tomato');
  const [harvestQty, setHarvestQty] = useState<number>(farmer.todayAvailableQty || 2000);
  const [expectedRate, setExpectedRate] = useState<number>(farmer.offeredRate || 22.0);
  const [readySlot, setReadySlot] = useState<string>('Tomorrow 04:00 AM – 05:30 AM');
  const [grade, setGrade] = useState<'A' | 'B' | 'DUAL'>('DUAL');
  const [freshPercent, setFreshPercent] = useState<number>(60); // 60% Fresh, 40% Processing
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showAssistedModal, setShowAssistedModal] = useState<boolean>(false);

  // Split Volumes
  const freshKg = grade === 'DUAL' ? Math.round(harvestQty * (freshPercent / 100)) : (grade === 'A' ? harvestQty : 0);
  const processKg = grade === 'DUAL' ? (harvestQty - freshKg) : (grade === 'B' ? harvestQty : 0);
  const freshPayout = freshKg * expectedRate;
  const processPayout = processKg * 18.50; // Guaranteed food processor rate
  const totalPayout = Math.round(freshPayout + processPayout);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-2xl bg-emerald-100 text-emerald-800">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-900">
              Post Harvest &amp; Dual-Stream Allocation
            </h3>
            <p className="text-[11px] text-stone-500">
              Manage produce lifecycle: Allocate between Fresh Table Mandi &amp; Agro-Processing Units
            </p>
          </div>
        </div>
        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
          SIH26193 Produce Flow
        </span>
      </div>

      {isSubmitted && (
        <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-xs text-emerald-950 space-y-1.5 animate-in fade-in">
          <div className="flex items-center gap-2 font-extrabold text-emerald-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Dual-Stream Harvest Registered! (100% Monetized • 0% Dumped)</span>
          </div>
          <div className="text-[11px] text-emerald-800 leading-relaxed grid grid-cols-2 gap-2 pt-1 border-t border-emerald-200">
            <div>
              <span className="font-bold text-blue-900 block">🟢 Fresh Table (Grade A):</span>
              <span>{freshKg.toLocaleString()} kg @ ₹{expectedRate}/kg ➔ City Supermarket</span>
            </div>
            <div>
              <span className="font-bold text-amber-900 block">🟠 Agro-Processing (Grade B):</span>
              <span>{processKg.toLocaleString()} kg @ ₹18.50/kg ➔ Kissan Puree Unit</span>
            </div>
          </div>
        </div>
      )}

      {/* Harvest Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Crop Selector */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Select Crop to Harvest
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer shadow-2xs"
            >
              <option value="Tomato">Tomato (Himsona / Hybrid)</option>
              <option value="Potato">Potato (Chipsona / Jyoti)</option>
              <option value="Onion">Onion (Nasik Red)</option>
            </select>
          </div>

          {/* Harvest Quantity */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Total Harvest Quantity (kg)
            </label>
            <input
              type="number"
              min="50"
              step="50"
              value={harvestQty}
              onChange={(e) => setHarvestQty(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-2xs"
              required
            />
          </div>
        </div>

        {/* Dual-Stream Allocation Mode Selector */}
        <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-slate-900 text-xs">
              Produce Stream &amp; Processing Allocation:
            </span>
            <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
              Zero Waste Route
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setGrade('DUAL')}
              className={`p-2 rounded-xl text-left border text-[11px] font-bold transition cursor-pointer ${
                grade === 'DUAL'
                  ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                  : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
              }`}
            >
              <div>✨ Dual-Stream Split</div>
              <div className="text-[9px] opacity-85 font-normal">Fresh Table + Ketchup FPU</div>
            </button>

            <button
              type="button"
              onClick={() => setGrade('A')}
              className={`p-2 rounded-xl text-left border text-[11px] font-bold transition cursor-pointer ${
                grade === 'A'
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                  : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
              }`}
            >
              <div>🟢 100% Fresh (Grade A)</div>
              <div className="text-[9px] opacity-85 font-normal">Strict Table Retail Only</div>
            </button>

            <button
              type="button"
              onClick={() => setGrade('B')}
              className={`p-2 rounded-xl text-left border text-[11px] font-bold transition cursor-pointer ${
                grade === 'B'
                  ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                  : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
              }`}
            >
              <div>🏭 100% Processing</div>
              <div className="text-[9px] opacity-85 font-normal">Puree/Chips Guarantee</div>
            </button>
          </div>

          {/* Dual Split Slider */}
          {grade === 'DUAL' && (
            <div className="space-y-1.5 pt-2 border-t border-amber-200/80">
              <div className="flex justify-between text-[11px] font-bold text-stone-700">
                <span className="text-emerald-800">Fresh Table: {freshPercent}% ({freshKg} kg)</span>
                <span className="text-amber-800">Food Processor: {100 - freshPercent}% ({processKg} kg)</span>
              </div>
              <input
                type="range"
                min="20"
                max="80"
                step="10"
                value={freshPercent}
                onChange={(e) => setFreshPercent(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
            </div>
          )}
        </div>

        {/* Shelf-Life & Ready Slot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Harvest Readiness Slot
            </label>
            <select
              value={readySlot}
              onChange={(e) => setReadySlot(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer shadow-2xs"
            >
              <option value="Tomorrow 04:00 AM – 05:30 AM">Tomorrow 04:00 AM – 05:30 AM (Peak Freshness)</option>
              <option value="Tomorrow 05:30 AM – 07:00 AM">Tomorrow 05:30 AM – 07:00 AM</option>
              <option value="Tomorrow 04:00 PM – 06:00 PM">Tomorrow 04:00 PM – 06:00 PM</option>
            </select>
          </div>

          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex flex-col justify-center">
            <span className="text-[10px] text-stone-500 font-bold uppercase">Estimated Shelf-Life Decay:</span>
            <div className="text-xs font-bold text-slate-900 mt-0.5">
              Grade A: 5 Days | Grade B: 36h (Safe in Puree)
            </div>
          </div>
        </div>

        {/* Payout Summary */}
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-stone-500 uppercase font-bold">Guaranteed Total Payout</div>
            <div className="text-lg font-extrabold font-mono text-emerald-800">
              ₹{totalPayout.toLocaleString('en-IN')}
            </div>
            <div className="text-[10px] text-stone-400">Fresh @ ₹{expectedRate} + Processing @ ₹18.50</div>
          </div>
          <span className="px-3 py-1.5 bg-emerald-100 text-emerald-900 text-xs font-bold rounded-xl border border-emerald-300">
            100% Sold • Zero Loss
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Publish Harvest Lot to Grid</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {/* 3-Step Interactive Step 2 Transition Button */}
        <div className="pt-2 border-t border-stone-100">
          <button
            type="button"
            onClick={() => setActiveTab('processor')}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-amber-600/20 transition cursor-pointer"
          >
            <span>Proceed to Step 2: Agro-Processing Factory Intake</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Critical Rural Inclusion Explainer: How 2G Keypad Farmers Register Harvest */}
      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-950 font-extrabold text-xs">
            <PhoneCall className="w-3.5 h-3.5 text-amber-700" />
            <span>How 2G / Keypad Phone Farmers Post Daily Harvest</span>
          </div>
          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 border border-amber-300">
            No Internet Needed
          </span>
        </div>

        <p className="text-[11px] text-stone-700 leading-relaxed">
          Over <strong>55% of Indian smallholders have basic 2G phones</strong>. They do NOT need this web portal! They register daily harvest via 3 inclusive assisted channels:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
          <div className="p-2.5 rounded-xl bg-white border border-amber-200 space-y-0.5">
            <div className="font-bold text-amber-950 flex items-center gap-1">
              <Users className="w-3 h-3 text-amber-600" />
              <span>1. Village Digital Sahayak</span>
            </div>
            <p className="text-[10px] text-stone-600 leading-snug">
              Local Krishi Mitra / CSC VLE logs harvest quota at village panchayat kiosk on tablet.
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-amber-200 space-y-0.5">
            <div className="font-bold text-amber-950 flex items-center gap-1">
              <Radio className="w-3 h-3 text-amber-600" />
              <span>2. Toll-Free IVR (1800)</span>
            </div>
            <p className="text-[10px] text-stone-600 leading-snug">
              Farmer dials <strong>1800-MITTI-MKT</strong>; speaks crop &amp; kg in Gujarati/Hindi voice menu.
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-amber-200 space-y-0.5">
            <div className="font-bold text-amber-950 flex items-center gap-1">
              <Layers className="w-3 h-3 text-amber-600" />
              <span>3. Assisted FPO Rep</span>
            </div>
            <p className="text-[10px] text-stone-600 leading-snug">
              Cluster lead logs WhatsApp voice notes or SMS batch submissions for all member farms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
