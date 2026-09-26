import { useCallback, useId, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface DialProps {
  label: string;
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  onValueChange?: (value: number) => void;
  size?: number;
  /** Show −/+ buttons for touch and appliance panels. */
  stepper?: boolean;
  disabled?: boolean;
  className?: string;
}

const START = 135; // degrees, measured clockwise from 3 o'clock
const SWEEP = 270;

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}
function arc(cx: number, cy: number, r: number, from: number, to: number) {
  const [x1, y1] = polar(cx, cy, r, from);
  const [x2, y2] = polar(cx, cy, r, to);
  const large = to - from > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
}

/**
 * Rotary value control: the signature AldraHome appliance component
 * (oven temperature, fridge setpoint, spin speed). shadcn/ui has no
 * equivalent, so it is built in the same style: token classes only,
 * `data-slot`, and the WAI-ARIA slider pattern (arrows ±step,
 * PageUp/PageDown ±10 steps, Home/End).
 */
export function Dial({
  label,
  value,
  defaultValue = 180,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onValueChange,
  size = 220,
  stepper = true,
  disabled,
  className,
}: DialProps) {
  const [internal, setInternal] = useState(defaultValue);
  const v = value ?? internal;
  const svgRef = useRef<SVGSVGElement>(null);
  const labelId = useId();

  const commit = useCallback(
    (next: number) => {
      const snapped = Math.round(Math.min(max, Math.max(min, next)) / step) * step;
      if (value === undefined) setInternal(snapped);
      onValueChange?.(snapped);
    },
    [max, min, step, value, onValueChange],
  );

  const onKey = (e: KeyboardEvent) => {
    const map: Record<string, number> = {
      ArrowRight: v + step,
      ArrowUp: v + step,
      ArrowLeft: v - step,
      ArrowDown: v - step,
      PageUp: v + step * 10,
      PageDown: v - step * 10,
      Home: min,
      End: max,
    };
    if (!(e.key in map)) return;
    e.preventDefault();
    commit(map[e.key]);
  };

  const fromPointer = (e: PointerEvent) => {
    const r = svgRef.current!.getBoundingClientRect();
    const ang = (Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180) / Math.PI;
    let rel = (ang - START + 360) % 360;
    if (rel > SWEEP) rel = rel - SWEEP < (360 - SWEEP) / 2 ? SWEEP : 0;
    commit(min + (rel / SWEEP) * (max - min));
  };

  const pct = (v - min) / (max - min);
  const c = 100;
  const r = 84;
  const end = START + SWEEP * pct;
  const [kx, ky] = polar(c, c, r, end);

  return (
    <div data-slot="dial" className={cn('inline-flex flex-col items-center gap-3', disabled && 'pointer-events-none opacity-50', className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          ref={svgRef}
          viewBox="0 0 200 200"
          width={size}
          height={size}
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-labelledby={labelId}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={v}
          aria-valuetext={`${v}${unit}`}
          aria-disabled={disabled || undefined}
          onKeyDown={onKey}
          onPointerDown={(e) => {
            (e.target as Element).setPointerCapture?.(e.pointerId);
            fromPointer(e);
          }}
          onPointerMove={(e) => {
            if (e.buttons === 1) fromPointer(e);
          }}
          className="cursor-grab touch-none rounded-full outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 active:cursor-grabbing"
        >
          <path d={arc(c, c, r, START, START + SWEEP)} fill="none" strokeWidth="12" strokeLinecap="round" className="stroke-muted" />
          {pct > 0.001 && (
            <path d={arc(c, c, r, START, end)} fill="none" strokeWidth="12" strokeLinecap="round" className="stroke-primary" />
          )}
          {Array.from({ length: 28 }, (_, i) => {
            const a = START + (SWEEP / 27) * i;
            const [x1, y1] = polar(c, c, 66, a);
            const [x2, y2] = polar(c, c, i % 3 === 0 ? 58 : 62, a);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="1.5" className="stroke-input" opacity=".6" />;
          })}
          <circle cx={kx} cy={ky} r="11" className="fill-card stroke-primary" strokeWidth="4" />
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span id={labelId} className="text-xs font-semibold tracking-[.14em] text-muted-foreground uppercase">
            {label}
          </span>
          <span className="font-display text-5xl leading-none font-semibold text-foreground tabular-nums" aria-hidden="true">
            {v}
            <span className="ml-0.5 align-top text-xl text-muted-foreground">{unit}</span>
          </span>
        </div>
      </div>
      {stepper && (
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon-lg" aria-label={`Decrease ${label}`} onClick={() => commit(v - step)} disabled={disabled || v <= min}>
            <MinusIcon />
          </Button>
          <Button variant="outline" size="icon-lg" aria-label={`Increase ${label}`} onClick={() => commit(v + step)} disabled={disabled || v >= max}>
            <PlusIcon />
          </Button>
        </div>
      )}
    </div>
  );
}
