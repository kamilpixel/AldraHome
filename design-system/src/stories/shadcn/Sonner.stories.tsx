import type { Meta, StoryObj } from '@storybook/react-vite';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';

const meta = {
  title: 'shadcn/Sonner',
  component: Toaster,
  parameters: { docs: { description: { component: 'Toasts use `--popover` and `--radius`, and follow the AldraHome ThemeProvider mode instead of next-themes.' } } },
} satisfies Meta<typeof Toaster>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Toasts: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button onClick={() => toast('Oven preheated to 180°')}>Default</Button>
      <Button variant="outline" onClick={() => toast.success('Profile saved')}>Success</Button>
      <Button variant="outline" onClick={() => toast.warning('Fridge door open', { description: 'Kitchen · 3 minutes' })}>Warning</Button>
    </div>
  ),
};
