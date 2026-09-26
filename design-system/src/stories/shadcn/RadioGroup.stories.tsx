import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const meta = { title: 'shadcn/Radio group', component: RadioGroup } satisfies Meta<typeof RadioGroup>;
export default meta;
type Story = StoryObj<typeof meta>;

const programs = [['cotton', 'Cotton 40°', '2h 15m'], ['eco', 'Eco 40–60', '3h 20m'], ['quick', 'Quick 20', '20m']];

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="cotton" aria-label="Wash program">
      {programs.map(([v, l]) => (
        <div key={v} className="flex items-center gap-3">
          <RadioGroupItem value={v} id={v} />
          <Label htmlFor={v}>{l}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
};

/** Card-style options: the pattern the portal uses for wash programs. */
export const Cards: Story = {
  render: () => (
    <RadioGroup defaultValue="cotton" aria-label="Wash program" className="w-80">
      {programs.map(([v, l, t]) => (
        <Label key={v} htmlFor={`c-${v}`} className="flex items-center gap-3 rounded-lg border p-3 has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary-soft">
          <RadioGroupItem value={v} id={`c-${v}`} />
          <span className="flex-1 font-semibold">{l}</span>
          <span className="text-sm text-muted-foreground">{t}</span>
        </Label>
      ))}
    </RadioGroup>
  ),
};
