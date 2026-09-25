import React, { useState } from 'react';
import {
  Camera,
  Scan,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Zap,
  Activity,
  Layers,
  Thermometer,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface SampleCrop {
  id: string;
  name: string;
  variety: string;
  image: string;
  trueBrix: number;
  trueFirmness: number;
  moisturePercent: number;
  predictedShelfLifeHours: number;
  recommendedGrade: 'Grade A' | 'Grade B' | 'Grade C';
  recommendedStream: string;
  processingDestination: string;
}

const SAMPLE_CROPS: SampleCrop[] = [
  {
    id: 'sample-tom-fresh',
    name: 'Tomato (Himsona)',
    variety: 'Fresh Harvest Grade',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=60',
    trueBrix: 5.4,
    trueFirmness: 86,
    moisturePercent: 88,
    predictedShelfLifeHours: 120, // 5 days
    recommendedGrade: 'Grade A',
    recommendedStream: 'Fresh Table Wholesale',
    processingDestination: 'Surat Fresh Retail & Mandi Hub'
  },
  {
    id: 'sample-tom-overripe',
    name: 'Tomato (Surplus/Overripe)',
    variety: 'Processing Paste Grade',
    image: 'https://images.unsplash.com/photo-1546470427-0d4db154ceb7?w=500&auto=format&fit=crop&q=60',
    trueBrix: 4.9,
    trueFirmness: 54,
    moisturePercent: 92,
    predictedShelfLifeHours: 36, // 1.5 days (Critical if table)
    recommendedGrade: 'Grade B',
    recommendedStream: 'Agro-Processing (Puree & Paste)',
    processingDestination: 'Kissan / HUL Mega Food Processing Park'
  },
  {
    id: 'sample-pot-starch',
    name: 'Potato (Kufri Chipsona)',
    variety: 'High-Starch Processing',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&auto=format&fit=crop&q=60',
    trueBrix: 3.2,
    trueFirmness: 92,
    moisturePercent: 76,
    predictedShelfLifeHours: 720, // 30 days
    recommendedGrade: 'Grade B',
    recommendedStream: 'Agro-Processing (Dehydrated Flakes)',
    processingDestination: 'Balaji Agro-Snacks Processing Unit'
  }
];

export const OpticalBrixScannerModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const [selectedSample, setSelectedSample] = useState<SampleCrop>(SAMPLE_CROPS[1]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [scanResult, setScanResult] = useState<SampleCrop | null>(null);

  if (!isOpen) return null;

  const handleRunScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanResult(null);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setScanResult(selectedSample);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden border border-stone-200 animate-in fade-in zoom-in-95">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Camera className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-300">
                <Sparkles className="w-3 h-3" />
                <span>Out-Of-The-Box Innovation #1</span>
              </div>
              <h2 className="text-base font-bold">Smartphone Multi-Spectral Brix &amp; Shelf-Life Scanner</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 font-bold"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Left: Camera Simulation Viewport */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">Select Produce Sample:</span>
              <span className="text-emerald-700 font-bold text-[11px]">Optical Refractometer Active</span>
            </div>

            {/* Sample Selector Chips */}
            <div className="grid grid-cols-3 gap-2">
              {SAMPLE_CROPS.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => {
                    setSelectedSample(sample);
                    setScanResult(null);
                  }}
                  className={`p-2 rounded-xl text-left border text-[11px] font-bold transition cursor-pointer ${
                    selectedSample.id === sample.id
                      ? 'border-amber-600 bg-amber-50 text-amber-900'
                      : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                  }`}
                >
                  <div className="truncate">{sample.name.split(' ')[0]}</div>
                  <div className="text-[9px] text-stone-400 font-normal truncate">{sample.recommendedGrade}</div>
                </button>
              ))}
            </div>

            {/* Viewport Frame */}
            <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-slate-900 border-2 border-slate-700 shadow-inner flex items-center justify-center">
              <img
                src={selectedSample.image}
                alt={selectedSample.name}
                className="w-full h-full object-cover opacity-85"
              />

              {/* Viewfinder Target Graphic */}
              <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none">
                <div className="flex justify-between text-[10px] font-mono text-emerald-400 font-bold">
                  <span>SPECTRAL_HUE: 642nm</span>
                  <span>FPS: 30 • ISO 200</span>
                </div>

                {/* Center Reticle */}
                <div className="mx-auto w-32 h-32 border-2 border-dashed border-emerald-400/80 rounded-2xl flex items-center justify-center relative">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  {isScanning && (
                    <div className="absolute inset-0 bg-emerald-500/20 backdrop-blur-2xs flex items-center justify-center font-mono font-bold text-white text-xs">
                      Analyzing {scanProgress}%
                    </div>
                  )}
                </div>

                <div className="flex justify-between text-[10px] font-mono text-emerald-400 font-bold">
                  <span>DIFFUSE_LIGHT: 88%</span>
                  <span>AUTOFOCUS: LOCKED</span>
                </div>
              </div>

              {/* Laser Scan Line Animation */}
              {isScanning && (
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-lg shadow-emerald-400 animate-bounce top-1/2" />
              )}
            </div>

            {/* Scan Trigger Button */}
            <button
              onClick={handleRunScan}
              disabled={isScanning}
              className="w-full py-3 bg-gradient-to-r from-emerald-600 to-amber-600 hover:from-emerald-700 hover:to-amber-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Scan className="w-4 h-4" />
              <span>{isScanning ? 'Running Spectral Analysis...' : 'Simulate 5-Second Camera Scan'}</span>
            </button>
          </div>

          {/* Right: AI Inferred Diagnostic Results */}
          <div className="space-y-4">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider text-[10px]">
              Computer Vision Diagnostic Output
            </div>

            {!scanResult && !isScanning && (
              <div className="p-8 border-2 border-dashed border-stone-200 rounded-2xl text-center space-y-2 text-stone-400">
                <Scan className="w-10 h-10 mx-auto text-stone-300" />
                <div className="font-bold text-xs text-stone-600">No Scan Results Yet</div>
                <p className="text-[11px]">Click "Simulate 5-Second Camera Scan" to evaluate pigmentation, Brix solids, and shelf-life.</p>
              </div>
            )}

            {isScanning && (
              <div className="p-8 bg-stone-50 border border-stone-200 rounded-2xl text-center space-y-3">
                <Activity className="w-8 h-8 text-amber-600 animate-spin mx-auto" />
                <div className="font-bold text-xs text-slate-800">Calculating Multi-Spectral Sugar Density...</div>
                <div className="h-1.5 w-full bg-stone-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full transition-all duration-300" style={{ width: `${scanProgress}%` }} />
                </div>
              </div>
            )}

            {scanResult && (
              <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
                {/* Score Cards Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200">
                    <div className="text-[10px] text-amber-700 font-bold uppercase">Brix Sugar Index</div>
                    <div className="text-xl font-extrabold text-amber-900">{scanResult.trueBrix}° Bx</div>
                    <div className="text-[10px] text-amber-600">Optimal processing ≥ 4.8°</div>
                  </div>

                  <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200">
                    <div className="text-[10px] text-emerald-700 font-bold uppercase">Firmness Score</div>
                    <div className="text-xl font-extrabold text-emerald-900">{scanResult.trueFirmness} / 100</div>
                    <div className="text-[10px] text-emerald-600">Skin Elasticity Metric</div>
                  </div>
                </div>

                {/* Predicted Shelf Life Badge */}
                <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-1 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-stone-500 font-bold uppercase">Predicted Shelf-Life Left:</span>
                    <span className="font-bold font-mono text-slate-900">{scanResult.predictedShelfLifeHours} Hours ({ (scanResult.predictedShelfLifeHours / 24).toFixed(1) } Days)</span>
                  </div>
                  <div className="text-[11px] text-stone-600">
                    Moisture Content: <span className="font-bold text-slate-800">{scanResult.moisturePercent}%</span>
                  </div>
                </div>

                {/* Smart Automated Routing Decision Card */}
                <div className="p-4 bg-gradient-to-r from-amber-500/10 to-emerald-500/10 border-2 border-emerald-500/40 rounded-2xl space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="font-extrabold text-slate-900">AI Routing Decision: {scanResult.recommendedGrade}</span>
                  </div>
                  <div className="text-slate-700 leading-snug">
                    <span className="font-bold">Allocated Stream:</span> {scanResult.recommendedStream}
                  </div>
                  <div className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
                    <span>Target:</span> {scanResult.processingDestination}
                  </div>
                </div>

                <div className="text-[10px] text-stone-400 italic text-center">
                  Zero hardware cost: Runs on standard smartphone camera with offline edge ONNX inference.
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
