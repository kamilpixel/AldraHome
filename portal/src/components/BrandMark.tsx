import { product as c } from '../data';

/** Wordmark driven entirely by tokens. */
export function BrandMark({ compact }: { compact?: boolean }) {
  return (
    <a
      href="#/home"
      className="flex items-center gap-2.5 rounded-md px-1 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
      aria-label={`${c.name} home`}
    >
      <span className="grid size-9 place-items-center rounded-md bg-primary font-display text-lg font-bold text-primary-foreground">{c.mark}</span>
      {!compact && <span className="font-display text-lg font-semibold tracking-tight whitespace-nowrap">{c.name}</span>}
    </a>
  );
}
