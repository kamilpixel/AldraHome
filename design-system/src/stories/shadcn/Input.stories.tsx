import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const meta = {
  title: 'shadcn/Input',
  component: Input,
  args: { placeholder: 'e.g. Kitchen oven' },
  decorators: [(S) => <div className="w-80"><S /></div>],
  parameters: { docs: { description: { component: 'shadcn/ui Input + Label. The `--input` border token is audited at 3:1 against the card (WCAG 1.4.11).' } } },
} satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { args: { 'aria-label': 'Appliance name' } };

export const WithLabelAndHint: Story = {
  render: (args) => (
    <div className="grid gap-2">
      <Label htmlFor="name">Appliance name</Label>
      <Input id="name" aria-describedby="name-hint" {...args} />
      <p id="name-hint" className="text-sm text-muted-foreground">Shown on your home screen and in notifications.</p>
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div className="grid gap-2">
      <Label htmlFor="serial">Serial number</Label>
      <Input id="serial" defaultValue="EX-44" aria-invalid aria-describedby="serial-error" />
      <p id="serial-error" className="text-sm font-medium text-destructive">Serial numbers have 12 characters.</p>
    </div>
  ),
};

export const Disabled: Story = { args: { disabled: true, defaultValue: 'EX-4410-2291', 'aria-label': 'Serial number' } };
