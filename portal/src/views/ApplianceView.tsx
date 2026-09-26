import { useEffect, useState } from 'react';
import {
  ChevronLeftIcon,
  CircleCheckIcon,
  DropletIcon,
  FanIcon,
  FlameIcon,
  LockIcon,
  MinusIcon,
  OctagonAlertIcon,
  PauseIcon,
  PlayIcon,
  PlusIcon,
  SquareIcon,
} from 'lucide-react';
import { toast } from 'sonner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Dial } from '@/components/appliance/dial';
import { appliances, washPrograms } from '../data';

export function ApplianceView({ id }: { id: string }) {
  const a = appliances.find((x) => x.id === id);
  if (!a) {
    return (
      <Alert variant="destructive">
        <OctagonAlertIcon />
        <AlertTitle>Appliance not found</AlertTitle>
        <AlertDescription>
          <p>
            It may have been removed from your home.{' '}
            <a className="underline" href="#/home">
              Back to home
            </a>
          </p>
        </AlertDescription>
      </Alert>
    );
  }
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-4">
        <Button asChild variant="outline" size="icon-lg">
          <a href="#/home" aria-label="Back to home">
            <ChevronLeftIcon />
          </a>
        </Button>
        <div className="min-w-0 flex-1">
          <p className="text-sm text-muted-foreground">
            {a.room} · {a.model}
          </p>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{a.name}</h1>
        </div>
        <Badge variant={a.variant}>{a.status}</Badge>
      </div>
      {a.kind === 'oven' && <OvenControls />}
      {a.kind === 'washer' && <WasherControls />}
      {a.kind === 'fridge' && <FridgeControls />}
      {a.kind === 'dishwasher' && <DishwasherStatus />}
    </div>
  );
}

function useCountdown(start: number, running: boolean) {
  const [s, setS] = useState(start);
  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setS((v) => Math.max(0, v - 1)), 1000);
    return () => clearInterval(t);
  }, [running]);
  return [s, setS] as const;
}
const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

function SettingRow({ id, label, description, defaultChecked }: { id: string; label: string; description: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 px-6 py-4">
      <div className="min-w-0">
        <Label htmlFor={id} className="text-[15px] font-semibold">
          {label}
        </Label>
        <p id={`${id}-d`} className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      <Switch id={id} defaultChecked={defaultChecked} aria-describedby={`${id}-d`} />
    </div>
  );
}

function OvenControls() {
  const [temp, setTemp] = useState(180);
  const [mode, setMode] = useState('fan');
  const [running, setRunning] = useState(true);
  const [secs, setSecs] = useCountdown(24 * 60, running);

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr]">
      <Card className="items-center justify-center gap-6 py-10">
        <Dial label="Oven" value={temp} onValueChange={setTemp} min={30} max={250} step={5} unit="°" size={260} />
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {temp >= 230 ? 'High heat: great for pizza and bread.' : temp <= 60 ? 'Warming and proving range.' : 'Current cavity 176°, holding.'}
        </p>
      </Card>

      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">Cooking mode</CardTitle>
          </CardHeader>
          <CardContent>
            <ToggleGroup type="single" variant="outline" size="lg" value={mode} onValueChange={(v) => v && setMode(v)} aria-label="Cooking mode" className="w-full">
              <ToggleGroupItem value="fan" className="h-12 flex-1">
                <FanIcon /> Fan
              </ToggleGroupItem>
              <ToggleGroupItem value="grill" className="h-12 flex-1">
                <FlameIcon /> Grill
              </ToggleGroupItem>
              <ToggleGroupItem value="steam" className="h-12 flex-1">
                <DropletIcon /> Steam
              </ToggleGroupItem>
            </ToggleGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">Timer</CardTitle>
            <CardAction>
              <Badge variant={running ? 'success' : 'secondary'}>{running ? 'Counting' : 'Paused'}</Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <p className="flex-1 font-display text-5xl font-semibold tabular-nums" role="timer" aria-label={`${Math.floor(secs / 60)} minutes remaining`}>
                {fmt(secs)}
              </p>
              <Button variant="outline" size="icon-lg" aria-label="Remove 5 minutes" onClick={() => setSecs((s) => Math.max(0, s - 300))}>
                <MinusIcon />
              </Button>
              <Button variant="outline" size="icon-lg" aria-label="Add 5 minutes" onClick={() => setSecs((s) => s + 300)}>
                <PlusIcon />
              </Button>
            </div>
            <Progress value={Math.max(0, Math.round(100 - (secs / (40 * 60)) * 100))} aria-label="Bake progress" />
          </CardContent>
        </Card>

        <Card className="gap-0 py-2">
          <SettingRow id="preheat" label="Preheat alert" description="Notify me when the oven reaches temperature." defaultChecked />
          <Separator />
          <SettingRow id="childlock" label="Child lock" description="Locks the control panel on the appliance." />
        </Card>

        <div className="flex gap-3">
          <Button size="xl" className="flex-1" onClick={() => setRunning((r) => !r)}>
            {running ? <PauseIcon /> : <PlayIcon />} {running ? 'Pause' : 'Resume'}
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="xl" variant="outline">
                <SquareIcon /> Stop
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Stop baking?</DialogTitle>
                <DialogDescription>The oven will switch off and start cooling. {fmt(secs)} left on the timer.</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Keep baking</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setRunning(false);
                      setSecs(0);
                      toast('Oven stopped', { description: 'Cooling fan will run for a few minutes.' });
                    }}
                  >
                    Stop oven
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

function WasherControls() {
  const [program, setProgram] = useState('cotton');
  const [spin, setSpin] = useState(1200);
  const [running, setRunning] = useState(true);
  const [secs] = useCountdown(38 * 60, running);
  const pct = Math.round(100 - (secs / (100 * 60)) * 100);
  const current = washPrograms.find((p) => p.id === program)!;

  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
      <Card>
        <CardHeader>
          <CardDescription>Choose a cycle</CardDescription>
          <CardTitle className="font-display text-lg">Programs</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <RadioGroup value={program} onValueChange={setProgram} aria-label="Wash program" className="grid gap-2 sm:grid-cols-2">
            {washPrograms.map((p) => (
              <Label
                key={p.id}
                htmlFor={`prog-${p.id}`}
                className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary-soft has-data-[state=checked]:text-primary-soft-foreground"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-md bg-muted text-muted-foreground">
                  <p.icon className="size-5" aria-hidden="true" />
                </span>
                <span className="flex-1">
                  <span className="block font-semibold">{p.name}</span>
                  <span className="text-sm font-normal">
                    {p.temp} · {p.time}
                  </span>
                </span>
                <RadioGroupItem value={p.id} id={`prog-${p.id}`} />
              </Label>
            ))}
          </RadioGroup>
          <fieldset className="grid gap-3">
            <legend className="mb-3 text-sm font-semibold">Options</legend>
            {[
              ['prewash', 'Prewash', false],
              ['rinse', 'Extra rinse', true],
              ['night', 'Night mode (quiet spin)', false],
            ].map(([oid, label, on]) => (
              <div key={oid as string} className="flex items-center gap-3">
                <Checkbox id={oid as string} defaultChecked={on as boolean} />
                <Label htmlFor={oid as string}>{label as string}</Label>
              </div>
            ))}
          </fieldset>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">Current cycle</CardTitle>
            <CardAction>
              <Badge variant={running ? 'success' : 'secondary'}>{running ? 'Main wash' : 'Paused'}</Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <p className="font-display text-5xl font-semibold tabular-nums">{fmt(secs)}</p>
            <div className="grid gap-2">
              <div className="flex justify-between text-sm">
                <span className="font-semibold">
                  {current.name} {current.temp}
                </span>
                <span className="text-muted-foreground tabular-nums">{Math.ceil(secs / 60)} min left</span>
              </div>
              <Progress value={pct} aria-label="Cycle progress" aria-valuetext={`${Math.ceil(secs / 60)} minutes left`} />
            </div>
          </CardContent>
        </Card>
        <Card className="items-center">
          <Dial label="Spin" value={spin} onValueChange={setSpin} min={400} max={1600} step={200} size={200} />
        </Card>
        <div className="flex gap-3">
          <Button size="xl" className="flex-1" onClick={() => setRunning((r) => !r)}>
            {running ? <PauseIcon /> : <PlayIcon />} {running ? 'Pause' : 'Resume'}
          </Button>
          <Button size="xl" variant="outline" onClick={() => toast('Door unlocks when the drum stops', { description: 'Usually within 2 minutes.' })}>
            <LockIcon /> Door
          </Button>
        </div>
      </div>
    </div>
  );
}

function FridgeControls() {
  const [fridge, setFridge] = useState(4);
  const [freezer, setFreezer] = useState(-18);
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="items-center py-8">
          <Dial label="Fridge" value={fridge} onValueChange={setFridge} min={1} max={8} unit="°" size={220} />
        </Card>
        <Card className="items-center py-8">
          <Dial label="Freezer" value={freezer} onValueChange={setFreezer} min={-24} max={-14} unit="°" size={220} />
        </Card>
      </div>
      <Card className="gap-0 py-2">
        <SettingRow id="fastfreeze" label="Fast freeze" description="Drops the freezer to −24° for 24 hours after a big shop." />
        <Separator />
        <SettingRow id="holiday" label="Holiday mode" description="Keeps the fridge at 15° to save energy while you are away." />
      </Card>
    </div>
  );
}

function DishwasherStatus() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Alert variant="success">
        <CircleCheckIcon />
        <AlertTitle>Eco 50° finished at 14:10</AlertTitle>
        <AlertDescription>Dishes are clean and drying with AutoOpen.</AlertDescription>
      </Alert>
      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">Supplies</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          {[
            ['Rinse aid', 35],
            ['Salt', 80],
          ].map(([label, v]) => (
            <div key={label} className="grid gap-2">
              <div className="flex justify-between text-sm">
                <span className="font-semibold">{label}</span>
                <span className="text-muted-foreground tabular-nums">{v}%</span>
              </div>
              <Progress value={v as number} aria-label={label as string} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
