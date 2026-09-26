import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';

const meta = {
  title: 'shadcn/Chart',
  component: ChartContainer,
  parameters: { docs: { description: { component: 'shadcn/ui Chart (Recharts). Series colours are `var(--chart-n)` tokens, so charts re-colour per brand and mode. `--chart-1` and `--chart-2` are audited at 3:1 against the card.' } } },
} satisfies Meta<typeof ChartContainer>;
export default meta;
type Story = StoryObj;

const data = [
  { day: 'Mon', oven: 0.9, laundry: 1.5 }, { day: 'Tue', oven: 1.4, laundry: 1.7 }, { day: 'Wed', oven: 0.8, laundry: 1.4 },
  { day: 'Thu', oven: 1.1, laundry: 1.7 }, { day: 'Fri', oven: 2.2, laundry: 1.4 }, { day: 'Sat', oven: 1.0, laundry: 1.5 }, { day: 'Sun', oven: 0.6, laundry: 1.2 },
];
const config = {
  oven: { label: 'Oven', color: 'var(--chart-1)' },
  laundry: { label: 'Laundry', color: 'var(--chart-2)' },
} satisfies ChartConfig;

export const EnergyByAppliance: Story = {
  render: () => (
    <ChartContainer config={config} className="h-64 w-[32rem]" role="img" aria-label="Energy use per day by appliance, kWh">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="oven" stackId="a" fill="var(--color-oven)" radius={[0, 0, 4, 4]} />
        <Bar dataKey="laundry" stackId="a" fill="var(--color-laundry)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  ),
};
