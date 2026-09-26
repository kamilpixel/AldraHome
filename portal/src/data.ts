import type { ComponentType, SVGProps } from 'react';
import {
  CheckIcon, DropletIcon, FlameIcon, LeafIcon, MicrowaveIcon, RefrigeratorIcon, SparklesIcon, TimerIcon,
  TriangleAlertIcon, UtensilsCrossedIcon, WashingMachineIcon,
} from 'lucide-react';

export type IconType = ComponentType<SVGProps<SVGSVGElement>>;
export type StatusVariant = 'success' | 'warning' | 'info' | 'secondary';

export const product = { name: 'Aldra Home', hello: 'Everything at home is running smoothly.', mark: 'A' };

export type ApplianceKind = 'oven' | 'washer' | 'fridge' | 'dishwasher';

export interface Appliance {
  id: string;
  kind: ApplianceKind;
  name: string;
  room: string;
  model: string;
  icon: IconType;
  status: string;
  variant: StatusVariant;
  detail: string;
  progress?: number;
  remaining?: string;
}

export const appliances: Appliance[] = [
  { id: 'oven', kind: 'oven', name: 'Pyrolytic oven', room: 'Kitchen', model: 'SteamPro 900', icon: MicrowaveIcon, status: 'Baking', variant: 'success', detail: 'Fan bake · 180°', progress: 58, remaining: '24 min left' },
  { id: 'washer', kind: 'washer', name: 'Washing machine', room: 'Laundry', model: 'PerfectCare 800', icon: WashingMachineIcon, status: 'Running', variant: 'success', detail: 'Cotton 40° · 1200 rpm', progress: 62, remaining: '38 min left' },
  { id: 'fridge', kind: 'fridge', name: 'Fridge freezer', room: 'Kitchen', model: 'FreshZone 700', icon: RefrigeratorIcon, status: 'Door open', variant: 'warning', detail: 'Fridge 4° · Freezer −18°' },
  { id: 'dishwasher', kind: 'dishwasher', name: 'Dishwasher', room: 'Kitchen', model: 'ComfortLift 600', icon: UtensilsCrossedIcon, status: 'Finished', variant: 'info', detail: 'Eco 50° · done at 14:10' },
];

/** Daily kWh split by appliance group (used by the shadcn/ui Chart). */
export const energyWeek = [
  { day: 'Mon', kitchen: 0.9, laundry: 1.5 },
  { day: 'Tue', kitchen: 1.4, laundry: 1.7 },
  { day: 'Wed', kitchen: 0.8, laundry: 1.4 },
  { day: 'Thu', kitchen: 1.1, laundry: 1.7 },
  { day: 'Fri', kitchen: 2.2, laundry: 1.4 },
  { day: 'Sat', kitchen: 1.0, laundry: 1.5 },
  { day: 'Sun', kitchen: 0.6, laundry: 1.2 },
];

export const energyMonth = [
  { day: 'W1', kitchen: 7.9, laundry: 10.2 },
  { day: 'W2', kitchen: 8.6, laundry: 9.4 },
  { day: 'W3', kitchen: 7.2, laundry: 11.1 },
  { day: 'W4', kitchen: 8.0, laundry: 10.4 },
];

export const washPrograms: { id: string; name: string; temp: string; time: string; icon: IconType }[] = [
  { id: 'cotton', name: 'Cotton', temp: '40°', time: '2h 15m', icon: WashingMachineIcon },
  { id: 'eco', name: 'Eco 40–60', temp: '40°', time: '3h 20m', icon: LeafIcon },
  { id: 'quick', name: 'Quick 20', temp: '20°', time: '20m', icon: TimerIcon },
  { id: 'steam', name: 'Steam refresh', temp: 'No heat', time: '25m', icon: DropletIcon },
  { id: 'wool', name: 'Wool & silk', temp: '30°', time: '55m', icon: SparklesIcon },
];

export const activity: { time: string; text: string; icon: IconType }[] = [
  { time: '14:32', text: 'Washing machine started Cotton 40°', icon: WashingMachineIcon },
  { time: '14:10', text: 'Dishwasher finished Eco 50°', icon: CheckIcon },
  { time: '13:55', text: 'Oven preheated to 180°', icon: FlameIcon },
  { time: '11:20', text: 'Fridge filter at 10%, reorder suggested', icon: TriangleAlertIcon },
];

export const notifications = [
  { title: 'Fridge door open', body: 'Kitchen · open for 3 minutes', time: 'Now', unread: true },
  { title: 'Wash started', body: 'Cotton 40° · 1200 rpm', time: '14:32', unread: true },
  { title: 'Dishwasher finished', body: 'Eco 50° · dishes drying with AutoOpen', time: '14:10', unread: false },
];
