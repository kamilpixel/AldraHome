import type { Decorator, Preview } from '@storybook/react-vite';
import { useEffect } from 'react';
import { ThemeProvider, type ColorMode } from '../src/theme/theme-provider';
import { TooltipProvider } from '../src/components/ui/tooltip';
import { Toaster } from '../src/components/ui/sonner';
import '../src/styles/storybook.css';

/**
 * Colour mode lives in the toolbar. Every story and docs page re-renders
 * against the chosen [data-theme]. The attributes are also set on <html> so
 * Radix portals (dialogs, menus, tooltips) pick up the same theme.
 */
const withTheme: Decorator = (Story, ctx) => {
  const mode = (ctx.globals.theme ?? 'light') as ColorMode;
  const fullscreen = ctx.parameters.layout === 'fullscreen';

  useEffect(() => {
    const el = document.documentElement;
    el.dataset.brand = 'aldra';
    el.dataset.theme = mode;
  }, [mode]);

  return (
    <ThemeProvider mode={mode} target="wrapper" className={fullscreen ? 'min-h-screen' : 'rounded-xl p-6'}>
      <TooltipProvider>
        <Story />
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  );
};

const preview: Preview = {
  globalTypes: {
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
  initialGlobals: { theme: 'light' },
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
