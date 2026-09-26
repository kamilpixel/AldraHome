import type { Meta, StoryObj } from '@storybook/react-vite';
import { DropletIcon, LeafIcon, ZapIcon } from 'lucide-react';
import { StatTile } from '@/components/appliance/stat-tile';

const meta = {
  title: 'Appliance/StatTile',
  component: StatTile,
  args: { label: 'Energy this week', value: '18.4', unit: 'kWh', icon: ZapIcon, delta: '−12% vs last week', deltaTone: 'positive' },
  argTypes: { icon: { control: false } },
  decorators: [(S) => <div className="w-64"><S /></div>],
  parameters: { docs: { description: { component: 'KPI tile composed from the shadcn/ui `Card`. Delta tones use the audited `success` and `destructive` tokens.' } } },
} satisfies Meta<typeof StatTile>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const Negative: Story = { args: { label: 'Water used', value: '312', unit: 'L', icon: DropletIcon, delta: '+8% vs last week', deltaTone: 'negative' } };
export const Row: Story = {
  decorators: [(S) => <div className="w-[40rem]"><S /></div>],
  render: () => (
    <div className="grid grid-cols-3 gap-3">
      <StatTile label="Energy" value="18.4" unit="kWh" icon={ZapIcon} delta="−12%" deltaTone="positive" />
      <StatTile label="Water" value="312" unit="L" icon={DropletIcon} delta="+8%" deltaTone="negative" />
      <StatTile label="Eco score" value="86" unit="/100" icon={LeafIcon} delta="Top 20%" deltaTone="positive" />
    </div>
  ),
};
