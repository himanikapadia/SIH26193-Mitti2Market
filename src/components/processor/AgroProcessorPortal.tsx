import React, { useState } from 'react';
import {
  Factory,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Clock,
  ThermometerSnowflake,
  ShieldCheck,
  QrCode,
  ArrowRight,
  Boxes,
  Layers,
  Leaf,
  CheckCircle2,
  Sliders,
  FileText,
  Building2,
  RefreshCw,
  Scale
} from 'lucide-react';
import {
  INITIAL_PROCESSOR_DEMANDS,
  INITIAL_PRODUCE_LIFECYCLE,
  VALUE_ADD_METRICS,
  ValueAddConversionMetric
} from '../../data/processorData';
import { FoodProcessorDemand, ProduceLifecycleItem } from '../../types';

export const AgroProcessorPortal: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'lifecycle' | 'processors' | 'calculator'>('processors');
  const [processorDemands, setProcessorDemands] = useState<FoodProcessorDemand[]>(INITIAL_PROCESSOR_DEMANDS);
  const [lifecycleItems, setLifecycleItems] = useState<ProduceLifecycleItem[]>(INITIAL_PRODUCE_LIFECYCLE);
  const [selectedCropCalc, setSelectedCropCalc] = useState<string>('Tomato');
  const [calcQuantityKg, setCalcQuantityKg] = useState<number>(2500);
  const [selectedBatchQR, setSelectedBatchQR] = useState<ProduceLifecycleItem | null>(null);

  // Quick Stats
  const totalProduceManagedKg = lifecycleItems.reduce((acc, i) => acc + i.allocatedVolumeKg, 0);
  const processedAllocatedKg = lifecycleItems
    .filter((i) => i.allocatedStream.includes('Agro-Processing'))
    .reduce((acc, i) => acc + i.allocatedVolumeKg, 0);
  const freshAllocatedKg = lifecycleItems
    .filter((i) => i.allocatedStream.includes('Fresh Table'))
    .reduce((acc, i) => acc + i.allocatedVolumeKg, 0);
  const spoilageAvertedPercent = Math.round((processedAllocatedKg / totalProduceManagedKg) * 100);

  // Trigger auto-allocation to processing for critical shelf-life batch
  const handleAutoReallocateToProcessing = (batchId: string) => {
    setLifecycleItems((prev) =>
      prev.map((item) => {
        if (item.id === batchId) {
          return {
            ...item,
            spoilageRisk: 'Low',
            allocatedStream: 'Agro-Processing (Grade B/Surplus)',
            currentStorage: 'FPO Micro-Cold Store (12°C)'
          };
        }
        return item;
      })
    );
  };

  const currentMetric = VALUE_ADD_METRICS[selectedCropCalc] || VALUE_ADD_METRICS.Tomato;
  const rawValueINR = calcQuantityKg * currentMetric.rawRatePerKg;
  const processedOutputKg = Math.round(calcQuantityKg * currentMetric.yieldRatio);
  const processedValueINR = processedOutputKg * currentMetric.processedWholesaleRatePerKg;
  const valueMultiplierPercent = Math.round(((processedValueINR - rawValueINR) / rawValueINR) * 100);
  const farmerEarningsBoostINR = Math.round(calcQuantityKg * (currentMetric.rawRatePerKg * (currentMetric.farmerRealizationBoostPercent / 100)));

  return (
    <div className="space-y-6">
      {/* SIH26193 Top Problem Statement Announcement Banner */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-emerald-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-amber-200 uppercase tracking-widest">
              <Factory className="w-3.5 h-3.5" />
              <span>SIH26193 • Manage &amp; Process Agriculture Produce</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Produce Lifecycle Management &amp; Agro-Processing Hub
            </h1>
            <p className="text-sm sm:text-base text-amber-100 font-medium leading-relaxed">
              Enhancing Indian Agriculture by managing farm shelf-life, preventing post-harvest distress dumping, and routing Grade B &amp; surplus produce directly to Food Processing Units (FPUs) for high-margin value addition.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="grid grid-cols-2 gap-3 w-full lg:w-auto shrink-0">
            <div className="bg-black/25 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center">
              <div className="text-2xl font-black text-amber-300">{totalProduceManagedKg.toLocaleString()} kg</div>
              <div className="text-[11px] text-stone-300 font-semibold uppercase tracking-wider">Total Managed</div>
            </div>
            <div className="bg-black/25 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center">
              <div className="text-2xl font-black text-emerald-400">0% Dumped</div>
              <div className="text-[11px] text-stone-300 font-semibold uppercase tracking-wider">Zero Spoilage Waste</div>
            </div>
          </div>
        </div>

        {/* 3 Main View Switcher Tabs */}
        <div className="mt-8 flex flex-wrap gap-2 border-t border-white/15 pt-6">
          <button
            onClick={() => setActiveSubTab('processors')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeSubTab === 'processors'
                ? 'bg-white text-slate-900 shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <Factory className="w-4 h-4 text-amber-600" />
            <span>Food Processing Units (FPUs)</span>
            <span className="px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black">
              {processorDemands.length} Plants
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('lifecycle')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeSubTab === 'lifecycle'
                ? 'bg-white text-slate-900 shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <Clock className="w-4 h-4 text-emerald-600" />
            <span>Produce Shelf-Life &amp; Storage Tracker</span>
            <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-black">
              {lifecycleItems.length} Batches
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('calculator')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeSubTab === 'calculator'
                ? 'bg-white text-slate-900 shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-purple-600" />
            <span>Value-Addition Yield Calculator</span>
            <span className="px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-900 text-[10px] font-black">
              +224% Value
            </span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUB-TAB 1: FOOD PROCESSOR UNITS (FPUs)                                  */}
      {/* ========================================================================= */}
      {activeSubTab === 'processors' && (
        <div className="space-y-6">
          {/* Header Explanation */}
          <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-700" />
                Active Agro-Processing Demand Contracts
              </h2>
              <p className="text-xs text-stone-500">
                Institutional food processing plants sourcing Grade B &amp; surplus produce at guaranteed floor prices for puree, flakes, and dehydrated foods.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-amber-600" />
                Dual-Stream Offtake Active
              </span>
            </div>
          </div>

          {/* Processor Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {processorDemands.map((fpu) => {
              const fillPercent = Math.round((fpu.currentAllocatedKg / fpu.targetVolumeKg) * 100);
              return (
                <div
                  key={fpu.id}
                  className="bg-white border-2 border-stone-200 hover:border-amber-400 rounded-3xl p-6 shadow-xs hover:shadow-lg transition space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-lg">
                        🏭
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider">
                        {fpu.status}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-base text-slate-900 leading-snug">{fpu.processorName}</h3>
                      <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                        <span>📍</span> {fpu.facilityLocation}
                      </p>
                    </div>

                    {/* Target Product Badge */}
                    <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-1.5">
                      <div className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">
                        Processing Product Target
                      </div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>{fpu.targetProduct}</span>
                      </div>
                      {fpu.minBrixScore && (
                        <div className="text-[11px] text-amber-700 font-semibold">
                          Min Quality: {fpu.minBrixScore}° Brix Sugar/Solids Ratio
                        </div>
                      )}
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold text-stone-600">
                        <span>Pooled: {fpu.currentAllocatedKg.toLocaleString()} kg</span>
                        <span>Target: {fpu.targetVolumeKg.toLocaleString()} kg ({fillPercent}%)</span>
                      </div>
                      <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-emerald-600 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(fillPercent, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-stone-400 uppercase font-semibold">Guaranteed Payout</div>
                      <div className="text-base font-extrabold text-emerald-700">₹{fpu.offeredProcessingRate.toFixed(2)} / kg</div>
                    </div>
                    <span className="text-[11px] font-mono text-stone-500 bg-stone-100 px-2 py-1 rounded-lg">
                      Cap: {fpu.processingCapacityDaily}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dual-Stream Allocation Explanation Banner */}
          <div className="bg-gradient-to-r from-emerald-50 to-amber-50 border border-emerald-200 rounded-2xl p-6">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <Boxes className="w-5 h-5 text-emerald-700" />
              How Mitti2Market Eliminates 100% Post-Harvest Dumping in Bharat
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs text-stone-700">
              <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-xs space-y-1.5">
                <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Stream 1: Grade A Fresh Produce (Table Wholesalers)
                </span>
                <p className="text-stone-600 leading-relaxed">
                  Prime harvest with high shelf-life is dispatched immediately to bulk retail chains and APMC terminals at premium fresh market prices (₹22.00–₹24.50/kg).
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-xs space-y-1.5">
                <span className="font-bold text-amber-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  Stream 2: Grade B &amp; Surplus Produce (Food Processors)
                </span>
                <p className="text-stone-600 leading-relaxed">
                  Soft, overripe, or visual-blemish produce is automatically diverted to Food Processing Units for paste, puree, chips, or dehydration at ₹18.50/kg—guaranteeing farmers never dump harvest on highways!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 2: PRODUCE LIFECYCLE & SHELF-LIFE MANAGEMENT                     */}
      {/* ========================================================================= */}
      {activeSubTab === 'lifecycle' && (
        <div className="space-y-6">
          {/* Storage Environment Telemetry Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <ThermometerSnowflake className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-stone-400 font-semibold uppercase">Micro-Cold Storage</div>
                <div className="text-base font-bold text-slate-900">12.4°C | 86% RH</div>
                <div className="text-[10px] text-emerald-600 font-medium">Controlled Atmosphere (CA)</div>
              </div>
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-stone-400 font-semibold uppercase">Fresh Table Allocation</div>
                <div className="text-base font-bold text-emerald-700">{freshAllocatedKg.toLocaleString()} kg (Grade A)</div>
                <div className="text-[10px] text-stone-500 font-medium">Dispatched within 24 Hours</div>
              </div>
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Factory className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-stone-400 font-semibold uppercase">Processing Allocation</div>
                <div className="text-base font-bold text-amber-700">{processedAllocatedKg.toLocaleString()} kg (Grade B)</div>
                <div className="text-[10px] text-amber-600 font-medium">100% Spoilage Averted</div>
              </div>
            </div>
          </div>

          {/* Produce Batches Table */}
          <div className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-xs">
            <div className="p-5 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">Active Harvest Batches &amp; Spoilage Risk Radar</h3>
                <p className="text-xs text-stone-500">Live monitoring of shelf-life, moisture content, and automated smart routing</p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 bg-stone-100 rounded-full text-stone-600">
                Auto-Refreshed Every 15 Mins
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3.5 px-4">Batch &amp; Crop</th>
                    <th className="py-3.5 px-4">Farmer &amp; Origin</th>
                    <th className="py-3.5 px-4">Shelf-Life Remaining</th>
                    <th className="py-3.5 px-4">Spoilage Risk</th>
                    <th className="py-3.5 px-4">Storage Mode</th>
                    <th className="py-3.5 px-4">Allocated Stream</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {lifecycleItems.map((item) => {
                    const isCritical = item.spoilageRisk === 'Critical' || item.spoilageRisk === 'High';
                    const isFresh = item.allocatedStream.includes('Fresh');
                    return (
                      <tr key={item.id} className="hover:bg-stone-50/80 transition">
                        {/* Batch & Crop */}
                        <td className="py-4 px-4">
                          <div className="font-extrabold text-slate-900 text-xs">{item.cropName}</div>
                          <div className="font-mono text-[10px] text-stone-400">{item.batchCode}</div>
                          <div className="text-[10px] text-stone-500 font-semibold">{item.allocatedVolumeKg} kg</div>
                        </td>

                        {/* Farmer & Origin */}
                        <td className="py-4 px-4">
                          <div className="font-bold text-slate-800">{item.farmerName}</div>
                          <div className="text-stone-400 text-[11px]">{item.village}</div>
                          <div className="text-[10px] text-stone-500">Harvest: {item.harvestDate}</div>
                        </td>

                        {/* Shelf Life */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1.5 font-bold text-slate-900">
                            <Clock className={`w-3.5 h-3.5 ${isCritical ? 'text-rose-600 animate-pulse' : 'text-emerald-600'}`} />
                            <span>{item.daysRemaining} days left</span>
                          </div>
                          <div className="text-[10px] text-stone-400">Total: {item.shelfLifeDaysTotal} days</div>
                          {item.brixScore && (
                            <div className="text-[10px] text-amber-700 font-semibold mt-0.5">Brix: {item.brixScore}°</div>
                          )}
                        </td>

                        {/* Spoilage Risk Badge */}
                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              item.spoilageRisk === 'Critical'
                                ? 'bg-rose-100 text-rose-800 animate-pulse border border-rose-300'
                                : item.spoilageRisk === 'High'
                                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                : item.spoilageRisk === 'Medium'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {isCritical && <AlertTriangle className="w-3 h-3 text-rose-600" />}
                            {item.spoilageRisk} Risk
                          </span>
                        </td>

                        {/* Storage */}
                        <td className="py-4 px-4 font-medium text-stone-600">
                          {item.currentStorage}
                        </td>

                        {/* Allocated Stream */}
                        <td className="py-4 px-4">
                          <span
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold block w-fit ${
                              isFresh
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : 'bg-amber-50 text-amber-800 border border-amber-200'
                            }`}
                          >
                            {item.allocatedStream}
                          </span>
                        </td>

                        {/* Action Buttons */}
                        <td className="py-4 px-4 text-right space-x-2">
                          {item.spoilageRisk === 'Critical' && item.allocatedStream.includes('Ambient') && (
                            <button
                              onClick={() => handleAutoReallocateToProcessing(item.id)}
                              className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-[10px] font-bold transition shadow-xs"
                              title="Divert immediately to Food Processing Unit to save from rotting"
                            >
                              Auto-Divert to Puree
                            </button>
                          )}

                          <button
                            onClick={() => setSelectedBatchQR(item)}
                            className="px-2 py-1 bg-stone-100 hover:bg-stone-200 text-slate-700 rounded-lg text-[10px] font-bold transition inline-flex items-center gap-1"
                          >
                            <QrCode className="w-3 h-3 text-slate-600" />
                            <span>QR Trace</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 3: VALUE-ADDITION YIELD & PROFIT CALCULATOR                      */}
      {/* ========================================================================= */}
      {activeSubTab === 'calculator' && (
        <div className="space-y-6">
          <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-100">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                  Agro-Processing Value Addition &amp; Waste Elimination Calculator
                </h3>
                <p className="text-xs text-stone-500">
                  Simulate economic multiplier when perishable farm produce is processed into shelf-stable food products
                </p>
              </div>

              {/* Crop Selector Buttons */}
              <div className="flex gap-2">
                {['Tomato', 'Potato', 'Onion'].map((crop) => (
                  <button
                    key={crop}
                    onClick={() => setSelectedCropCalc(crop)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                      selectedCropCalc === crop
                        ? 'bg-purple-700 text-white shadow-md'
                        : 'bg-stone-100 hover:bg-stone-200 text-slate-700'
                    }`}
                  >
                    {crop === 'Tomato' ? '🍅' : crop === 'Potato' ? '🥔' : '🧅'} {crop}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Slider */}
            <div className="py-6 border-b border-stone-100 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Surplus / Grade B Harvest Quantity:
                </span>
                <span className="text-xl font-extrabold text-purple-700">
                  {calcQuantityKg.toLocaleString()} kg ({ (calcQuantityKg / 1000).toFixed(1) } Metric Tonnes)
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="250"
                value={calcQuantityKg}
                onChange={(e) => setCalcQuantityKg(Number(e.target.value))}
                className="w-full h-2.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-purple-700"
              />
              <div className="flex justify-between text-[10px] text-stone-400 font-mono font-semibold">
                <span>500 kg (Micro-Cluster)</span>
                <span>5,000 kg (Truckload)</span>
                <span>10,000 kg (FPO Aggregation)</span>
              </div>
            </div>

            {/* Comparison Cards: Raw Distress vs. Processed Value */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              {/* Option A: Raw Middlemen Distress Dumping */}
              <div className="bg-rose-50/70 border-2 border-rose-200 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-rose-200 text-rose-900 text-[10px] font-black uppercase">
                    Traditional Supply-Push Trap
                  </span>
                  <span className="text-xl">⚠️</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Raw Produce Distress Sale</h4>
                  <p className="text-xs text-rose-700 mt-0.5">Sold at Mandi spot crash price or dumped on highway</p>
                </div>
                <div className="space-y-2 pt-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-stone-600">Raw Selling Rate:</span>
                    <span className="font-mono font-bold text-slate-800">₹{currentMetric.rawRatePerKg.toFixed(2)} / kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Expected Spoilage Losses:</span>
                    <span className="font-mono font-bold text-rose-600">28% (Rotting in Transit)</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-rose-200">
                    <span className="font-bold text-slate-900">Total Farmer Cash Realized:</span>
                    <span className="font-extrabold text-base text-rose-700">₹{rawValueINR.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Option B: Mitti2Market Food Processing Route */}
              <div className="bg-emerald-50/70 border-2 border-emerald-300 rounded-2xl p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-200 text-emerald-900 text-[10px] font-black uppercase">
                    Mitti2Market Agro-Processing Route
                  </span>
                  <span className="text-xl">🏭</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Converted to Shelf-Stable Food Product</h4>
                  <p className="text-xs text-emerald-800 font-medium mt-0.5">
                    Target: {currentMetric.processedProduct}
                  </p>
                </div>
                <div className="space-y-2 pt-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-stone-600">Processed Output Yield:</span>
                    <span className="font-mono font-bold text-emerald-800">{processedOutputKg.toLocaleString()} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Processed Wholesale Value:</span>
                    <span className="font-mono font-bold text-emerald-700">₹{processedValueINR.toLocaleString()} (@ ₹{currentMetric.processedWholesaleRatePerKg}/kg)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Farmer Extra Net Income:</span>
                    <span className="font-mono font-bold text-emerald-600">+₹{farmerEarningsBoostINR.toLocaleString()} (+{currentMetric.farmerRealizationBoostPercent}%)</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-emerald-200">
                    <span className="font-bold text-slate-900">Economic Value Multiplier:</span>
                    <span className="font-extrabold text-base text-emerald-700">+{valueMultiplierPercent}% Value Jump</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Summary Callout */}
            <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-2xl flex items-center justify-between text-xs text-purple-900 font-semibold">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                Processing {calcQuantityKg.toLocaleString()} kg saves 100% of the produce from decay and generates 8 regional micro-processing labor days.
              </span>
              <span className="bg-purple-700 text-white px-3 py-1 rounded-xl text-[11px] font-bold">
                Zero Spoilage Waste
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: BATCH TRACEABILITY QR CODE                                        */}
      {/* ========================================================================= */}
      {selectedBatchQR && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-emerald-700" />
                <h3 className="font-extrabold text-slate-900 text-base">Farm-to-Fork Traceability</h3>
              </div>
              <button
                onClick={() => setSelectedBatchQR(null)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 font-bold"
              >
                ✕
              </button>
            </div>

            {/* Mock QR Code Graphic */}
            <div className="bg-stone-50 border-2 border-dashed border-stone-300 rounded-2xl p-6 flex flex-col items-center justify-center space-y-3 text-center">
              <div className="w-36 h-36 bg-white p-2 rounded-xl shadow-xs border border-stone-200 flex items-center justify-center">
                {/* SVG QR Code Pattern */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900 fill-current">
                  <rect x="0" y="0" width="30" height="30" rx="3" />
                  <rect x="5" y="5" width="20" height="20" fill="#fff" />
                  <rect x="10" y="10" width="10" height="10" />
                  <rect x="70" y="0" width="30" height="30" rx="3" />
                  <rect x="75" y="5" width="20" height="20" fill="#fff" />
                  <rect x="80" y="10" width="10" height="10" />
                  <rect x="0" y="70" width="30" height="30" rx="3" />
                  <rect x="5" y="75" width="20" height="20" fill="#fff" />
                  <rect x="10" y="80" width="10" height="10" />
                  <rect x="40" y="10" width="10" height="20" />
                  <rect x="15" y="40" width="20" height="10" />
                  <rect x="45" y="45" width="15" height="15" />
                  <rect x="70" y="40" width="20" height="10" />
                  <rect x="40" y="70" width="15" height="20" />
                  <rect x="70" y="70" width="20" height="20" />
                </svg>
              </div>
              <div className="font-mono text-xs font-bold text-slate-900">{selectedBatchQR.batchCode}</div>
              <div className="text-[10px] text-stone-500">Scan to verify farm origin &amp; cold-chain temperature integrity</div>
            </div>

            {/* Batch Details */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Crop / Variety:</span>
                <span className="font-bold text-slate-900">{selectedBatchQR.cropName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Farmer:</span>
                <span className="font-bold text-slate-900">{selectedBatchQR.farmerName} ({selectedBatchQR.village})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Harvest Date:</span>
                <span className="font-bold text-slate-900">{selectedBatchQR.harvestDate}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Allocated Stream:</span>
                <span className="font-bold text-amber-700">{selectedBatchQR.allocatedStream}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-stone-500">Storage Environment:</span>
                <span className="font-bold text-emerald-700">{selectedBatchQR.currentStorage}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedBatchQR(null)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition"
            >
              Close Batch Record
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
