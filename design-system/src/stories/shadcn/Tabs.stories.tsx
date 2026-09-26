import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const meta = { title: 'shadcn/Tabs', component: Tabs } satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;

const panels = [
  ['kitchen', 'Kitchen', 'Oven, fridge freezer and dishwasher.'],
  ['laundry', 'Laundry', 'Washing machine and tumble dryer.'],
  ['energy', 'Energy', '18.4 kWh this week, 12% less than last week.'],
];

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="kitchen" className="w-96">
      <TabsList>{panels.map(([v, l]) => <TabsTrigger key={v} value={v}>{l}</TabsTrigger>)}</TabsList>
      {panels.map(([v, , body]) => <TabsContent key={v} value={v} className="rounded-xl border bg-card p-4 text-sm">{body}</TabsContent>)}
    </Tabs>
  ),
};

export const Line: Story = {
  render: () => (
    <Tabs defaultValue="kitchen" className="w-96">
      <TabsList variant="line">{panels.map(([v, l]) => <TabsTrigger key={v} value={v}>{l}</TabsTrigger>)}</TabsList>
      {panels.map(([v, , body]) => <TabsContent key={v} value={v} className="pt-2 text-sm">{body}</TabsContent>)}
    </Tabs>
  ),
};
