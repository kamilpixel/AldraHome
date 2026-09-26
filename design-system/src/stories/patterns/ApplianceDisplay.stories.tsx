import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { DropletIcon, FanIcon, FlameIcon, MinusIcon, PauseIcon, PlayIcon, PlusIcon, TimerIcon, WifiIcon } from 'lucide-react';
import { ThemeProvider } from '@/theme/theme-provider';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Dial } from '@/components/appliance/dial';

const meta = {
  title: 'Patterns/Appliance display',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'shadcn/ui primitives and the AldraHome Dial composed for an 800×480 oven control panel. Appliance surfaces run dark-only ' +
          'for glare and energy reasons and use `xl` sizes for wet-hand touch. The same DTCG tokens could feed a Flutter or LVGL build.',
      },
    },
  },
} satisfies Meta;
export default meta;

function OvenPanel() {
  const [temp, setTemp] = useState(180);
  const [mode, setMode] = useState('fan');
  const [running, setRunning] = useState(false);
  const [secs, setSecs] = useState(25 * 60);
  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setSecs((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [running]);
  const mm = String(Math.floor(secs / 60)).padStart(2, '0');
  const ss = String(secs % 60).padStart(2, '0');

  return (
    <div className="grid h-[480px] w-[800px] grid-cols-[1fr_300px] gap-6 bg-background p-6">
      <div className="flex flex-col">
        <div className="mb-4 flex items-center justify-between text-muted-foreground">
          <span className="flex items-center gap-2 text-sm font-semibold"><WifiIcon className="size-[18px]" /> Connected</span>
          <span className="font-display text-lg text-foreground tabular-nums">18:42</span>
        </div>
        <ToggleGroup type="single" variant="outline" size="lg" value={mode} onValueChange={(v) => v && setMode(v)} aria-label="Cooking mode" className="w-full">
          <ToggleGroupItem value="fan" className="h-14 flex-1 text-base"><FanIcon /> Fan</ToggleGroupItem>
          <ToggleGroupItem value="grill" className="h-14 flex-1 text-base"><FlameIcon /> Grill</ToggleGroupItem>
          <ToggleGroupItem value="steam" className="h-14 flex-1 text-base"><DropletIcon /> Steam</ToggleGroupItem>
        </ToggleGroup>
        <div className="mt-6 flex flex-1 items-center gap-6 rounded-xl bg-card p-6">
          <div className="grid size-16 place-items-center rounded-xl bg-primary-soft text-primary-soft-foreground"><TimerIcon className="size-8" /></div>
          <div className="flex-1">
            <p className="text-sm font-semibold tracking-[.14em] text-muted-foreground uppercase">Timer</p>
            <p className="font-display text-6xl font-semibold text-foreground tabular-nums">{mm}:{ss}</p>
          </div>
          <div className="flex flex-col gap-2">
            <Button variant="outline" size="icon-xl" aria-label="Add minute" onClick={() => setSecs((s) => s + 60)}><PlusIcon /></Button>
            <Button variant="outline" size="icon-xl" aria-label="Remove minute" onClick={() => setSecs((s) => Math.max(0, s - 60))}><MinusIcon /></Button>
          </div>
        </div>
        <Button size="xl" className="mt-6 w-full" onClick={() => setRunning((r) => !r)}>
          {running ? <PauseIcon /> : <PlayIcon />} {running ? 'Pause' : 'Start'}
        </Button>
      </div>
      <div className="flex items-center justify-center rounded-xl bg-card">
        <Dial label="Temp" value={temp} onValueChange={setTemp} min={30} max={250} step={5} unit="°" size={240} />
      </div>
    </div>
  );
}

export const OvenPanel800x480: StoryObj = {
  name: 'Oven panel 800×480',
  render: () => (
    <div className="overflow-hidden rounded-[28px] border-[10px] border-neutral-900 shadow-2xl">
      <ThemeProvider mode="dark" target="wrapper">
        <OvenPanel />
      </ThemeProvider>
    </div>
  ),
};
