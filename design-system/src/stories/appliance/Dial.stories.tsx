import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Dial } from '@/components/appliance/dial';

const meta = {
  title: 'Appliance/Dial',
  component: Dial,
  args: { label: 'Oven', defaultValue: 180, min: 30, max: 250, step: 5, unit: '°', onValueChange: fn() },
  parameters: {
    docs: {
      description: {
        component:
          'Custom AldraHome component (shadcn/ui has no rotary control). Shared by web, mobile and appliance displays. Drag the knob, click the track, or use the keyboard ' +
          '(←/→ ±step, PageUp/PageDown ±10 steps, Home/End). Exposes `role="slider"` with `aria-valuetext` including the unit.',
      },
    },
  },
} satisfies Meta<typeof Dial>;
export default meta;
type Story = StoryObj<typeof meta>;

export const OvenTemperature: Story = {};
export const FridgeSetpoint: Story = { args: { label: 'Fridge', min: 1, max: 8, step: 1, defaultValue: 4, size: 180 } };
export const SpinSpeed: Story = { args: { label: 'Spin', min: 400, max: 1600, step: 200, defaultValue: 1200, unit: '', size: 200 } };
export const WithoutStepper: Story = { args: { stepper: false } };
export const Disabled: Story = { args: { disabled: true } };
