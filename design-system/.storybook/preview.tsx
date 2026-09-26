import type { Decorator, Preview } from '@storybook/react-vite';
import { useEffect } from 'react';
import { ThemeProvider, type BrandId, type ColorMode } from '../src/theme/theme-provider';
import { brands } from '../src/tokens/tokens.generated';
import { TooltipProvider } from '../src/components/ui/tooltip';
import { Toaster } from '../src/components/ui/sonner';
import '../src/styles/storybook.css';

/**
 * Brand and colour mode live in the toolbar. Every story and docs page re-renders
 * against the chosen [data-brand][data-theme]. The attributes are also set on <html> so
 * Radix portals (dialogs, menus, tooltips) pick up the same theme.
 */
const withTheme: Decorator = (Story, ctx) => {
  const brand = (ctx.globals.brand ?? brands[0].id) as BrandId;
  const mode = (ctx.globals.theme ?? 'light') as ColorMode;
  const fullscreen = ctx.parameters.layout === 'fullscreen';

  useEffect(() => {
    const el = document.documentElement;
    el.dataset.brand = brand;
    el.dataset.theme = mode;
  }, [brand, mode]);

  return (
    <ThemeProvider brand={brand} mode={mode} target="wrapper" className={fullscreen ? 'min-h-screen' : 'rounded-xl p-6'}>
      <TooltipProvider>
        <Story />
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  );
};

const preview: Preview = {
  globalTypes: {
    brand: {
      description: 'Brand',
      toolbar: {
        title: 'Brand',
        icon: 'paintbrush',
        items: brands.map((b) => ({ value: b.id, title: b.name, right: b.tagline })),
        dynamicTitle: true,
      },
    },
    theme: {
      description: 'Colour mode',
      toolbar: {
        title: 'Mode',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { brand: brands[0].id, theme: 'light' },
  decorators: [withTheme],
  parameters: {
    layout: 'centered',
    controls: { expanded: true, matchers: { color: /(background|color)$/i } },
    backgrounds: { disable: true },
    a11y: { test: 'error' },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Foundations',
          ['Tokens', 'Contrast audit', 'Iconography'],
          'shadcn',
          'Appliance',
          'Patterns',
        ],
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
