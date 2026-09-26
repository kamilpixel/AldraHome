import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '@/components/ui/badge';

const meta = {
  title: 'shadcn/Badge',
  component: Badge,
  args: { children: 'Running', variant: 'success' },
  argTypes: { variant: { control: 'select', options: ['default', 'secondary', 'outline', 'destructive', 'soft', 'success', 'warning', 'info'] } },
  parameters: { docs: { description: { component: 'shadcn/ui Badge plus AldraHome status variants (`success`, `warning`, `info`, `soft`) for appliance states. Always keep the text: never rely on colour alone.' } } },
} satisfies Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Idle</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="soft">New</Badge>
      <Badge variant="success">Running</Badge>
      <Badge variant="warning">Door open</Badge>
      <Badge variant="info">Update available</Badge>
      <Badge variant="destructive">Offline</Badge>
    </div>
  ),
};
