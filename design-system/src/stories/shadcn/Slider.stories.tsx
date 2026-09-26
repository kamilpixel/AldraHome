import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slider } from '@/components/ui/slider';

const meta = {
  title: 'shadcn/Slider',
  component: Slider,
  args: { defaultValue: [60], max: 100, step: 5, thumbLabels: ['Display brightness'] },
  decorators: [(S) => <div className="w-72"><S /></div>],
  parameters: { docs: { description: { component: 'Linear companion to the AldraHome `Dial`. Use it where space is horizontal (brightness, volume). AldraHome adds `thumbLabels` so each thumb has an accessible name.' } } },
} satisfies Meta<typeof Slider>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
