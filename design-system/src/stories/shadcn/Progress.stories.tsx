import type { Meta, StoryObj } from '@storybook/react-vite';
import { Progress } from '@/components/ui/progress';

const meta = {
  title: 'shadcn/Progress',
  component: Progress,
  args: { value: 62, 'aria-label': 'Cotton 40° progress' },
  argTypes: { value: { control: { type: 'range', min: 0, max: 100 } } },
  decorators: [(S) => <div className="w-80"><S /></div>],
} satisfies Meta<typeof Progress>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const Labelled: Story = {
  render: () => (
    <div className="flex flex-col gap-5">
      {[['Main wash', 62, '38 min left'], ['Preheating', 45, '45%'], ['Filter life', 90, '90%']].map(([label, v, text]) => (
        <div key={label} className="grid gap-2">
          <div className="flex justify-between text-sm"><span className="font-semibold">{label}</span><span className="text-muted-foreground tabular-nums">{text}</span></div>
          <Progress value={v as number} aria-label={label as string} aria-valuetext={text as string} />
        </div>
      ))}
    </div>
  ),
};
