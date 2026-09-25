import { FoodProcessorDemand, ProduceLifecycleItem } from '../types';

export const INITIAL_PROCESSOR_DEMANDS: FoodProcessorDemand[] = [
  {
    id: 'fpu-1',
    processorName: 'Kissan / Hindustan Unilever Mega Food Park',
    facilityLocation: 'Surat Agro-Industrial Cluster, Plot 42',
    requiredCrop: 'Tomato',
    minProcessingGrade: 'Grade B',
    targetProduct: 'Tomato Puree, Ketchup & Aseptic Paste',
    targetVolumeKg: 5000,
    currentAllocatedKg: 3200,
    offeredProcessingRate: 18.5,
    minBrixScore: 4.8,
    processingCapacityDaily: '50 MT / Day',
    status: 'Fulfilling'
  },
  {
    id: 'fpu-2',
    processorName: 'Balaji Wafers & Agro-Snacks Ltd',
    facilityLocation: 'Valsad Agro-Processing SEZ, Bay 11',
    requiredCrop: 'Potato',
    minProcessingGrade: 'Grade B',
    targetProduct: 'Dehydrated Potato Flakes & Vacuum Chips',
    targetVolumeKg: 4000,
    currentAllocatedKg: 2800,
    offeredProcessingRate: 19.0,
    minBrixScore: 3.2,
    processingCapacityDaily: '40 MT / Day',
    status: 'Fulfilling'
  },
  {
    id: 'fpu-3',
    processorName: 'Gujarat Dehydration & Food Powder Hub',
    facilityLocation: 'Navsari Food Processing Park, Unit 8',
    requiredCrop: 'Onion',
    minProcessingGrade: 'Grade B',
    targetProduct: 'Dehydrated Onion Flakes & Toasted Powder',
    targetVolumeKg: 3000,
    currentAllocatedKg: 1800,
    offeredProcessingRate: 21.0,
    minBrixScore: 5.5,
    processingCapacityDaily: '25 MT / Day',
    status: 'Open'
  }
];

export const INITIAL_PRODUCE_LIFECYCLE: ProduceLifecycleItem[] = [
  {
    id: 'batch-001',
    cropName: 'Tomato',
    batchCode: 'BAT-TOM-701',
    farmerName: 'Ramesh Patel',
    village: 'Bardoli Cluster',
    harvestDate: 'Today 5:30 AM',
    shelfLifeDaysTotal: 6,
    daysRemaining: 5,
    spoilageRisk: 'Low',
    currentStorage: 'FPO Micro-Cold Store (12°C)',
    allocatedStream: 'Fresh Table (Grade A)',
    allocatedVolumeKg: 1200,
    moisturePercent: 88,
    brixScore: 5.2
  },
  {
    id: 'batch-002',
    cropName: 'Tomato (Surplus/Overripe)',
    batchCode: 'BAT-TOM-702',
    farmerName: 'Bhikha Vasava',
    village: 'Kamrej Cluster',
    harvestDate: 'Yesterday 6:00 AM',
    shelfLifeDaysTotal: 5,
    daysRemaining: 1.5,
    spoilageRisk: 'Critical',
    currentStorage: 'Farm-gate Ambient',
    allocatedStream: 'Agro-Processing (Grade B/Surplus)',
    allocatedVolumeKg: 1800,
    moisturePercent: 91,
    brixScore: 4.9
  },
  {
    id: 'batch-003',
    cropName: 'Potato',
    batchCode: 'BAT-POT-403',
    farmerName: 'Mohan Rathod',
    village: 'Mandvi Cluster',
    harvestDate: '3 Days Ago',
    shelfLifeDaysTotal: 45,
    daysRemaining: 38,
    spoilageRisk: 'Low',
    currentStorage: 'FPO Micro-Cold Store (12°C)',
    allocatedStream: 'Agro-Processing (Grade B/Surplus)',
    allocatedVolumeKg: 2500,
    moisturePercent: 78,
    brixScore: 3.4
  },
  {
    id: 'batch-004',
    cropName: 'Onion',
    batchCode: 'BAT-ONI-204',
    farmerName: 'Jayesh Desai',
    village: 'Olpad Cluster',
    harvestDate: '4 Days Ago',
    shelfLifeDaysTotal: 30,
    daysRemaining: 22,
    spoilageRisk: 'Medium',
    currentStorage: 'FPO Micro-Cold Store (12°C)',
    allocatedStream: 'Agro-Processing (Grade B/Surplus)',
    allocatedVolumeKg: 1500,
    moisturePercent: 82,
    brixScore: 5.8
  }
];

export interface ValueAddConversionMetric {
  crop: string;
  rawRatePerKg: number;
  processedProduct: string;
  yieldRatio: number; // e.g., 1000kg tomatoes yields 180kg paste
  processedWholesaleRatePerKg: number;
  farmerRealizationBoostPercent: number;
  spoilageSavedPercent: number;
}

export const VALUE_ADD_METRICS: Record<string, ValueAddConversionMetric> = {
  Tomato: {
    crop: 'Tomato',
    rawRatePerKg: 12.0, // Distress/surplus raw rate
    processedProduct: 'Aseptic Tomato Paste / Puree (28° Brix)',
    yieldRatio: 0.18, // 180 kg paste per 1000 kg raw
    processedWholesaleRatePerKg: 180.0,
    farmerRealizationBoostPercent: 54.2, // Farmer gets ₹18.50 vs ₹12
    spoilageSavedPercent: 100
  },
  Potato: {
    crop: 'Potato',
    rawRatePerKg: 14.0,
    processedProduct: 'Dehydrated Potato Flakes / Starch',
    yieldRatio: 0.22, // 220 kg flakes per 1000 kg raw
    processedWholesaleRatePerKg: 160.0,
    farmerRealizationBoostPercent: 35.7,
    spoilageSavedPercent: 100
  },
  Onion: {
    crop: 'Onion',
    rawRatePerKg: 16.0,
    processedProduct: 'Dehydrated Toasted Onion Flakes & Powder',
    yieldRatio: 0.12, // 120 kg flakes per 1000 kg raw
    processedWholesaleRatePerKg: 280.0,
    farmerRealizationBoostPercent: 31.25,
    spoilageSavedPercent: 100
  }
};
