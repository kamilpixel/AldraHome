import { useTheme } from '@/theme/theme-provider';
import { brands } from '@/tokens/tokens.generated';

/** Wordmark driven entirely by tokens and the active brand's metadata. */
export function BrandMark({ compact }: { compact?: boolean }) {
  const { brand } = useTheme();
  const name = brands.find((b) => b.id === brand)!.product;
  return (
    <a
      href="#/home"
      className="flex items-center gap-2.5 rounded-md px-1 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
      aria-label={`${name} home`}
    >
      <span className="grid size-9 place-items-center rounded-md bg-primary font-display text-lg font-bold text-primary-foreground">{name[0]}</span>
      {!compact && <span className="font-display text-lg font-semibold tracking-tight whitespace-nowrap">{name}</span>}
    </a>
  );
}
