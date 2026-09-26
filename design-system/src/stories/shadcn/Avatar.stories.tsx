import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const meta = { title: 'shadcn/Avatar', component: Avatar } satisfies Meta<typeof Avatar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Fallback: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {(['sm', 'default', 'lg'] as const).map((s) => (
        <Avatar key={s} size={s}><AvatarFallback className="bg-primary font-semibold text-primary-foreground">KK</AvatarFallback></Avatar>
      ))}
    </div>
  ),
};
