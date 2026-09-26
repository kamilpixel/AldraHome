import type { Meta, StoryObj } from '@storybook/react-vite';
import { brands, palette, semanticTokenNames } from '@/tokens/tokens.generated';

const meta = {
  title: 'Foundations/Tokens',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Tokens are authored in W3C DTCG JSON (`$value`, `$type`) and built with Style Dictionary into shadcn/ui CSS variables, ' +
          'one block per `[data-brand][data-theme]`.',
      },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj;

const groups: Record<string, string[]> = {
  Surfaces: ['background', 'card', 'popover', 'secondary', 'muted', 'border', 'input'],
  Text: ['foreground', 'muted-foreground', 'subtle-foreground'],
  Brand: ['primary', 'primary-foreground', 'primary-soft', 'primary-soft-foreground', 'accent', 'highlight', 'ring'],
  Status: ['success', 'success-soft', 'warning', 'warning-soft', 'destructive', 'destructive-soft', 'info', 'info-soft'],
  Charts: ['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5'],
};

/** Live semantic colours: they follow the toolbar brand + mode. */
export const SemanticColors: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <p className="max-w-2xl text-muted-foreground">
        These swatches read <code>var(--*)</code> live. Names follow shadcn/ui (<code>--primary</code>, <code>--muted-foreground</code>),
        so any shadcn component or block works unchanged. AldraHome adds <code>primary-soft</code>, <code>highlight</code> and status roles.
      </p>
      {Object.entries(groups).map(([g, names]) => (
        <section key={g}>
          <h2 className="mb-3 text-lg font-semibold">{g}</h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3">
            {names.map((n) => (
              <div key={n} className="overflow-hidden rounded-xl border bg-card">
                <div className="h-16 border-b" style={{ background: `var(--${n})` }} />
                <div className="p-3">
                  <p className="text-sm font-semibold">{n}</p>
                  <code className="text-xs text-muted-foreground">--{n}</code>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
};

export const ShapeAndType: Story = {
  name: 'Shape and type',
  render: () => (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-xl border bg-card p-6">
        <h2 className="mb-1 text-lg font-semibold">Radius</h2>
        <p className="mb-4 text-sm text-muted-foreground">The brand maps shadcn&apos;s radius scale to its own geometry.</p>
        <div className="flex flex-wrap gap-4">
          {[['sm', 'item'], ['md', 'control'], ['lg', 'panel'], ['xl', 'card']].map(([tw, token]) => (
            <div key={tw} className="text-center text-sm">
              <div className="mb-2 h-16 w-24 border-2 border-primary bg-primary-soft" style={{ borderRadius: `var(--radius-${tw})` }} />
              rounded-{tw}
              <br />
              <code className="text-xs text-muted-foreground">brand.radius.{token}</code>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-xl border bg-card p-6">
        <h2 className="mb-4 text-lg font-semibold">Type</h2>
        <p className="font-display text-4xl leading-tight font-semibold">Display 180°</p>
        <p className="mt-2 text-2xl font-semibold">Heading · Fan bake</p>
        <p className="mt-2 text-base">Body · Your oven will be ready in 12 minutes.</p>
        <p className="mt-1 text-sm text-muted-foreground">Caption · Last used yesterday at 19:40</p>
      </div>
    </div>
  ),
};

/** Tier 1 primitives. Components never reference these directly. */
export const Palette: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {Object.entries(palette).map(([hue, steps]) => (
        <div key={hue} className="flex items-center gap-4">
          <p className="w-20 text-sm font-semibold">{hue}</p>
          <div className="flex flex-1 overflow-hidden rounded-md border">
            {Object.entries(steps as Record<string, string>).map(([step, hex]) => (
              <div key={step} title={`palette.${hue}.${step} ${hex}`} className="h-12 flex-1" style={{ background: hex }} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const ReferenceTable: Story = {
  name: 'Reference table',
  render: () => (
    <div className="overflow-auto rounded-xl border bg-card">
      <table className="w-full text-left text-sm">
        <thead className="bg-muted text-muted-foreground">
          <tr>
            <th className="px-3 py-2">Token</th>
            {brands.flatMap((b) => ['light', 'dark'].map((m) => <th key={b.id + m} className="px-3 py-2">{b.name} {m}</th>))}
          </tr>
        </thead>
        <tbody>
          {semanticTokenNames.map((n) => (
            <tr key={n} className="border-t">
              <td className="px-3 py-1.5"><code>--{n}</code></td>
              {brands.flatMap((b) =>
                (['light', 'dark'] as const).map((m) => {
                  const t = (b.modes[m] as Record<string, { value: string; ref: string | null }>)[n];
                  return (
                    <td key={b.id + m} className="px-3 py-1.5" title={t.ref ?? ''}>
                      <span className="inline-flex items-center gap-2">
                        <span className="size-4 rounded border" style={{ background: t.value }} />
                        <code className="text-xs">{t.value}</code>
                      </span>
                    </td>
                  );
                }),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};
