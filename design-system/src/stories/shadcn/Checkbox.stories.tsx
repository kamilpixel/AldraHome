import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const meta = { title: 'shadcn/Checkbox', component: Checkbox } satisfies Meta<typeof Checkbox>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="grid gap-3">
      {[['prewash', 'Prewash', true], ['extra', 'Extra rinse', false], ['night', 'Night mode (quiet spin)', false]].map(([id, l, on]) => (
        <div key={id as string} className="flex items-center gap-3">
          <Checkbox id={id as string} defaultChecked={on as boolean} />
          <Label htmlFor={id as string}>{l as string}</Label>
        </div>
      ))}
    </div>
  ),
};
