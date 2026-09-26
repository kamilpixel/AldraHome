import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  BellIcon, CheckIcon, CookingPotIcon, DropletIcon, FanIcon, FlameIcon, HouseIcon, LeafIcon, LockIcon, MicrowaveIcon,
  MoonIcon, PauseIcon, PlayIcon, RefrigeratorIcon, SettingsIcon, SnowflakeIcon, SparklesIcon, SquareIcon, SunIcon,
  ThermometerIcon, TimerIcon, TriangleAlertIcon, WashingMachineIcon, WifiIcon, ZapIcon,
} from 'lucide-react';

const icons = {
  HouseIcon, MicrowaveIcon, WashingMachineIcon, RefrigeratorIcon, CookingPotIcon, FanIcon, FlameIcon, DropletIcon, SnowflakeIcon,
  ThermometerIcon, TimerIcon, ZapIcon, LeafIcon, PlayIcon, PauseIcon, SquareIcon, LockIcon, BellIcon, SettingsIcon, WifiIcon,
  SunIcon, MoonIcon, SparklesIcon, CheckIcon, TriangleAlertIcon,
};

const meta = {
  title: 'Foundations/Iconography',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Icons come from lucide-react, the shadcn/ui default. They inherit `currentColor` and are decorative inside labelled controls; ' +
          'icon-only buttons must carry an `aria-label`. This is the curated set used by the Aldra portal.',
      },
    },
  },
} satisfies Meta;
export default meta;

export const Gallery: StoryObj = {
  render: () => (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3">
      {Object.entries(icons).map(([name, Icon]) => (
        <div key={name} className="flex flex-col items-center gap-2 rounded-xl border bg-card p-4">
          <Icon className="size-7" aria-hidden="true" />
          <code className="text-xs text-muted-foreground">{name.replace('Icon', '')}</code>
        </div>
      ))}
    </div>
  ),
};
