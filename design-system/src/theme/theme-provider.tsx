import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { brands } from '@/tokens/tokens.generated';

export type BrandId = (typeof brands)[number]['id'];
export type ColorMode = 'light' | 'dark';
export type ModePreference = ColorMode | 'system';

interface ThemeContextValue {
  brand: BrandId;
  mode: ColorMode;
  preference: ModePreference;
  setPreference: (pref: ModePreference) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function systemMode(): ColorMode {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export interface ThemeProviderProps {
  children: ReactNode;
  mode?: ModePreference;
  defaultMode?: ModePreference;
  /**
   * Where to write `data-brand` / `data-theme`.
   * `document` (default) themes the whole page; `wrapper` scopes it to a div
   * (Storybook, docs, or a dark-only appliance panel inside a light page).
   */
  target?: 'document' | 'wrapper';
  className?: string;
}

/**
 * Applies the brand + colour mode by writing `data-brand` / `data-theme`.
 * shadcn/ui components read CSS variables (--primary, --radius…), never React
 * state, so switching mode is a zero-runtime attribute flip.
 */
export function ThemeProvider({
  children,
  mode: modeProp,
  defaultMode = 'system',
  target = 'document',
  className,
}: ThemeProviderProps) {
  const [prefState, setPreference] = useState<ModePreference>(defaultMode);
  const [sys, setSys] = useState<ColorMode>(systemMode);

  const brand: BrandId = brands[0].id;
  const preference = modeProp ?? prefState;
  const mode: ColorMode = preference === 'system' ? sys : preference;

  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => setSys(mq.matches ? 'dark' : 'light');
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (target !== 'document') return;
    const el = document.documentElement;
    el.dataset.brand = brand;
    el.dataset.theme = mode;
  }, [brand, mode, target]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      brand,
      mode,
      preference,
      setPreference,
      toggleMode: () => setPreference(mode === 'dark' ? 'light' : 'dark'),
    }),
    [brand, mode, preference],
  );

  return (
    <ThemeContext.Provider value={value}>
      {target === 'wrapper' ? (
        <div data-brand={brand} data-theme={mode} className={cn('bg-background font-sans text-foreground', className)}>
          {children}
        </div>
      ) : (
        children
      )}
    </ThemeContext.Provider>
  );
}

/** Theme context, or `null` outside a provider (used by the Toaster). */
export function useOptionalTheme(): ThemeContextValue | null {
  return useContext(ThemeContext);
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}
