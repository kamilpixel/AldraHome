import type { ComponentType, ReactNode, SVGProps } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface StatTileProps {
  label: string;
  value: ReactNode;
  unit?: string;
  /** A lucide-react icon component, e.g. `ZapIcon`. */
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  /** e.g. "−12% vs last week". */
  delta?: string;
  deltaTone?: 'positive' | 'negative' | 'neutral';
  className?: string;
}

const deltaTones = { positive: 'text-success', negative: 'text-destructive', neutral: 'text-muted-foreground' };

/** KPI tile composed from the shadcn/ui Card. */
export function StatTile({ label, value, unit, icon: Icon, delta, deltaTone = 'neutral', className }: StatTileProps) {
  return (
    <Card data-slot="stat-tile" className={cn('gap-3 p-5 shadow-none', className)}>
      <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
        {Icon && (
          <span className="grid size-8 place-items-center rounded-md bg-primary-soft text-primary-soft-foreground">
            <Icon className="size-[18px]" aria-hidden="true" />
          </span>
        )}
        {label}
      </div>
      <p className="font-display text-3xl leading-none font-semibold text-foreground tabular-nums">
        {value}
        {unit && <span className="ml-1 text-base font-medium text-muted-foreground">{unit}</span>}
      </p>
      {delta && <p className={cn('text-sm font-semibold', deltaTones[deltaTone])}>{delta}</p>}
    </Card>
  );
}
