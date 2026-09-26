// AldraHome design system (fictional brand), built on shadcn/ui

// Theme
export { ThemeProvider, useTheme, useOptionalTheme } from './theme/theme-provider';
export type { BrandId, ColorMode, ModePreference, ThemeProviderProps } from './theme/theme-provider';

// shadcn/ui primitives (new-york v4, Radix UI)
export * from './components/ui/alert';
export * from './components/ui/avatar';
export * from './components/ui/badge';
export * from './components/ui/button';
export * from './components/ui/card';
export * from './components/ui/chart';
export * from './components/ui/checkbox';
export * from './components/ui/dialog';
export * from './components/ui/dropdown-menu';
export * from './components/ui/input';
export * from './components/ui/label';
export * from './components/ui/progress';
export * from './components/ui/radio-group';
export * from './components/ui/select';
export * from './components/ui/separator';
export * from './components/ui/sheet';
export * from './components/ui/skeleton';
export * from './components/ui/slider';
export * from './components/ui/sonner';
export * from './components/ui/switch';
export * from './components/ui/tabs';
export * from './components/ui/toggle-group';
export * from './components/ui/toggle';
export * from './components/ui/tooltip';
export { toast } from 'sonner';

// AldraHome appliance components
export * from './components/appliance/dial';
export * from './components/appliance/stat-tile';

// Utilities + generated tokens
export { cn } from './lib/utils';
export { brands, semanticTokenNames, palette, contrastAudit } from './tokens/tokens.generated';
