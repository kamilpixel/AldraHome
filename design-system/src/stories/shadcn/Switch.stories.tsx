import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const meta = { title: 'shadcn/Switch', component: Switch, args: { 'aria-label': 'Eco mode' } } satisfies Meta<typeof Switch>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const SettingsList: Story = {
  render: () => (
    <div className="w-96 divide-y rounded-xl border bg-card">
      {[
        ['lock', 'Child lock', 'Disables the control panel.', false],
        ['notif', 'Notifications', 'When a cycle finishes.', true],
        ['remote', 'Remote start', 'Requires the door to be closed.', true],
      ].map(([id, label, desc, on]) => (
        <div key={id as string} className="flex items-center justify-between gap-4 p-4">
          <div>
            <Label htmlFor={id as string} className="text-[15px] font-semibold">{label as string}</Label>
            <p id={`${id}-d`} className="text-sm text-muted-foreground">{desc as string}</p>
          </div>
          <Switch id={id as string} defaultChecked={on as boolean} aria-describedby={`${id}-d`} />
        </div>
      ))}
    </div>
  ),
};
