import type { Meta, StoryObj } from '@storybook/react-vite';
import { DropletIcon, FanIcon, FlameIcon } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const meta = {
  title: 'shadcn/Toggle group',
  component: ToggleGroup,
  parameters: { docs: { description: { component: 'Used as a segmented control for cooking modes and ranges. Radix handles roving focus: Tab into the group, arrows move between options.' } } },
} satisfies Meta<typeof ToggleGroup>;
export default meta;
type Story = StoryObj<typeof meta>;

export const CookingMode: Story = {
  args: { type: 'single' },
  render: () => (
    <ToggleGroup type="single" variant="outline" defaultValue="fan" aria-label="Cooking mode">
      <ToggleGroupItem value="fan"><FanIcon /> Fan</ToggleGroupItem>
      <ToggleGroupItem value="grill"><FlameIcon /> Grill</ToggleGroupItem>
      <ToggleGroupItem value="steam"><DropletIcon /> Steam</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Spaced: Story = {
  args: { type: 'single' },
  render: () => (
    <ToggleGroup type="single" spacing={2} defaultValue="week" aria-label="Range">
      <ToggleGroupItem value="day">Day</ToggleGroupItem>
      <ToggleGroupItem value="week">Week</ToggleGroupItem>
      <ToggleGroupItem value="month">Month</ToggleGroupItem>
    </ToggleGroup>
  ),
};
