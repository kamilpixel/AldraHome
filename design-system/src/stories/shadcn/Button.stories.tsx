import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { ArrowRightIcon, Loader2Icon, PlayIcon, PlusIcon, SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const meta = {
  title: 'shadcn/Button',
  component: Button,
  args: { children: 'Start cooking', onClick: fn() },
  argTypes: {
    variant: { control: 'select', options: ['default', 'secondary', 'outline', 'ghost', 'destructive', 'link'] },
    size: { control: 'select', options: ['xs', 'sm', 'default', 'lg', 'xl'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'shadcn/ui Button. Colour and radius come from design tokens (`--primary`, `--radius-md`). AldraHome adds an `xl` size ' +
          '(56px) for appliance touch panels.',
      },
    },
  },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} variant="default">Primary</Button>
      <Button {...args} variant="secondary">Secondary</Button>
      <Button {...args} variant="outline">Outline</Button>
      <Button {...args} variant="ghost">Ghost</Button>
      <Button {...args} variant="destructive">Delete</Button>
      <Button {...args} variant="link">Link</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="default">Default</Button>
      <Button {...args} size="lg">Large</Button>
      <Button {...args} size="xl">XL · appliance</Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args}><PlayIcon /> Start</Button>
      <Button {...args} variant="outline">Continue <ArrowRightIcon /></Button>
      <Button {...args} variant="ghost"><PlusIcon /> Add appliance</Button>
      <Button {...args} variant="outline" size="icon" aria-label="Settings"><SettingsIcon /></Button>
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} disabled><Loader2Icon className="animate-spin" /> Preheating</Button>
      <Button {...args} disabled>Disabled</Button>
    </div>
  ),
};
