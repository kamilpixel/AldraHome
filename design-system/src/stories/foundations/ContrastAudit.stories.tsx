import type { Meta, StoryObj } from '@storybook/react-vite';
import { brands, contrastAudit } from '@/tokens/tokens.generated';

const meta = {
  title: 'Foundations/Contrast audit',
  parameters: {
    layout: 'padded',
    docs: { description: { component: 'Output of the build-time WCAG audit in `scripts/build-tokens.mjs`. `npm run tokens` exits with an error if any pair drops below AA.' } },
  },
} satisfies Meta;
export default meta;

export const Audit: StoryObj = {
  render: () => {
    const passed = contrastAudit.filter((a) => a.pass).length;
    return (
      <div>
        <p className="mb-4 max-w-2xl text-muted-foreground">
          <strong className="text-foreground">{passed} / {contrastAudit.length}</strong> pairs pass in light and dark mode
          (4.5:1 for text, 3:1 for UI graphics, focus rings and input borders).
        </p>
        <div className="overflow-auto rounded-xl border bg-card">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>{['Brand', 'Mode', 'Foreground', 'Background', 'Sample', 'Ratio', 'Min', 'Result'].map((h) => <th key={h} className="px-3 py-2 font-semibold">{h}</th>)}</tr>
            </thead>
            <tbody>
              {contrastAudit.map((a, i) => {
                const b = brands.find((x) => x.id === a.brand)!;
                const m = b.modes[a.mode as 'light' | 'dark'] as Record<string, { value: string }>;
                return (
                  <tr key={i} className="border-t">
                    <td className="px-3 py-1.5">{b.name}</td>
                    <td className="px-3 py-1.5">{a.mode}</td>
                    <td className="px-3 py-1.5"><code>{a.fg}</code></td>
                    <td className="px-3 py-1.5"><code>{a.bg}</code></td>
                    <td className="px-3 py-1.5">
                      <span className="rounded px-2 py-0.5 text-xl font-bold" style={{ color: m[a.fg].value, background: m[a.bg].value }}>Aa</span>
                    </td>
                    <td className="px-3 py-1.5 font-semibold tabular-nums">{a.ratio.toFixed(2)}</td>
                    <td className="px-3 py-1.5 text-muted-foreground tabular-nums">{a.min}</td>
                    <td className="px-3 py-1.5">{a.pass ? '✅ pass' : '❌ fail'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  },
};
