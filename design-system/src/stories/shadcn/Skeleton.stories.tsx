import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from '@/components/ui/skeleton';

const meta = { title: 'shadcn/Skeleton', component: Skeleton } satisfies Meta<typeof Skeleton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const ApplianceCard: Story = {
  render: () => (
    <div className="flex w-80 items-start gap-4 rounded-xl border bg-card p-5" role="status" aria-busy="true" aria-label="Loading appliance">
      <Skeleton className="size-12 rounded-md" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="mt-3 h-2 w-full" />
      </div>
    </div>
  ),
};
