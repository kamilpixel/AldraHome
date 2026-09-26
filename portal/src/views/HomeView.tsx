import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { ArrowRightIcon, DropletIcon, LeafIcon, PlayIcon, PlusIcon, SparklesIcon, TriangleAlertIcon, XIcon, ZapIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { StatTile } from '@/components/appliance/stat-tile';
import { activity, appliances, energyMonth, energyWeek, product } from '../data';

const chartConfig = {
  kitchen: { label: 'Kitchen', color: 'var(--chart-1)' },
  laundry: { label: 'Laundry', color: 'var(--chart-2)' },
} satisfies ChartConfig;

export function HomeView() {
  const [fridgeAlert, setFridgeAlert] = useState(true);
  const [range, setRange] = useState<'week' | 'month'>('week');
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const data = range === 'week' ? energyWeek : energyMonth;
  const total = data.reduce((s, d) => s + d.kitchen + d.laundry, 0).toFixed(1);

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-2">
        <p className="text-sm font-semibold tracking-[.14em] text-muted-foreground uppercase">{greeting}, Kamil</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{product.hello}</h1>
      </section>

      {fridgeAlert && (
        <Alert variant="warning" className="relative pr-12">
          <TriangleAlertIcon />
          <AlertTitle>Fridge door has been open for 3 minutes</AlertTitle>
          <AlertDescription>
            <p>Kitchen · FreshZone 700. The temperature has risen to 6°.</p>
            <Button size="sm" variant="outline" className="mt-2" onClick={() => setFridgeAlert(false)}>
              I&apos;ve closed it
            </Button>
          </AlertDescription>
          <Button variant="ghost" size="icon-sm" aria-label="Dismiss" className="absolute top-2 right-2" onClick={() => setFridgeAlert(false)}>
            <XIcon />
          </Button>
        </Alert>
      )}

      <section aria-label="Summary" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile label="Energy this week" value="18.4" unit="kWh" icon={ZapIcon} delta="−12% vs last week" deltaTone="positive" />
        <StatTile label="Water used" value="312" unit="L" icon={DropletIcon} delta="+8% vs last week" deltaTone="negative" />
        <StatTile label="Running now" value="2" unit="of 4" icon={PlayIcon} delta="Oven, washer" />
        <StatTile label="Eco score" value="86" unit="/100" icon={LeafIcon} delta="Top 20% nearby" deltaTone="positive" />
      </section>

      <section aria-labelledby="appl-h">
        <div className="mb-4 flex items-end justify-between">
          <h2 id="appl-h" className="text-xl font-semibold">
            Your appliances
          </h2>
          <AddApplianceDialog />
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {appliances.map((a) => (
            <li key={a.id}>
              <a
                href={`#/appliance/${a.id}`}
                className="group block h-full rounded-xl outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                <Card className="h-full gap-5 p-5 transition-[transform,box-shadow] duration-200 ease-aldrahome group-hover:-translate-y-0.5 group-hover:shadow-card">
                  <div className="flex items-start gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-md bg-primary-soft text-primary-soft-foreground">
                      <a.icon className="size-6" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate font-semibold">{a.name}</p>
                        <Badge variant={a.variant}>{a.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {a.room} · {a.detail}
                      </p>
                    </div>
                  </div>
                  {a.progress !== undefined && (
                    <div className="grid gap-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold">Progress</span>
                        <span className="text-muted-foreground tabular-nums">{a.remaining}</span>
                      </div>
                      <Progress value={a.progress} aria-label={`${a.name} progress`} aria-valuetext={a.remaining} />
                    </div>
                  )}
                </Card>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardHeader>
            <CardDescription>Energy</CardDescription>
            <CardTitle className="font-display text-lg">
              <h2>
                {total} kWh this {range}
              </h2>
            </CardTitle>
            <CardAction>
              <ToggleGroup
                type="single"
                variant="outline"
                size="sm"
                value={range}
                onValueChange={(v) => v && setRange(v as 'week' | 'month')}
                aria-label="Range"
              >
                <ToggleGroupItem value="week">Week</ToggleGroupItem>
                <ToggleGroupItem value="month">Month</ToggleGroupItem>
              </ToggleGroup>
            </CardAction>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-56 w-full"
              role="img"
              aria-label={`Energy use by ${range === 'week' ? 'day' : 'week'}: ${data.map((d) => `${d.day} ${(d.kitchen + d.laundry).toFixed(1)} kWh`).join(', ')}`}
            >
              <BarChart accessibilityLayer data={data}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="kitchen" stackId="a" fill="var(--color-kitchen)" radius={[0, 0, 4, 4]} />
                <Bar dataKey="laundry" stackId="a" fill="var(--color-laundry)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Today</CardDescription>
            <CardTitle className="font-display text-lg">
              <h2>Activity</h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="flex flex-col gap-4">
              {activity.map((e) => (
                <li key={e.time} className="flex items-start gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground">
                    <e.icon className="size-4" aria-hidden="true" />
                  </span>
                  <div className="text-sm">
                    <p className="font-medium">{e.text}</p>
                    <p className="text-muted-foreground">{e.time}</p>
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>

      <Card className="flex flex-col items-start gap-4 border-transparent bg-primary p-6 text-primary-foreground sm:flex-row sm:items-center sm:p-8">
        <SparklesIcon className="size-8 shrink-0" aria-hidden="true" />
        <div className="flex-1">
          <p className="font-display text-xl font-semibold">Try steam-assisted baking</p>
          <p className="opacity-85">Crustier bread, juicier roasts. Your SteamPro 900 supports 12 steam recipes.</p>
        </div>
        <Button asChild variant="secondary" size="lg">
          <a href="#/appliance/oven">
            Explore recipes <ArrowRightIcon />
          </a>
        </Button>
      </Card>
    </div>
  );
}

function AddApplianceDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [room, setRoom] = useState('kitchen');
  const invalid = name.trim().length > 0 && name.trim().length < 3;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <PlusIcon /> Add
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form
          className="grid gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            if (name.trim().length < 3) return;
            setOpen(false);
            setName('');
            toast.success(`${name.trim()} added`, { description: 'Pairing starts when the appliance is powered on (demo).' });
          }}
        >
          <DialogHeader>
            <DialogTitle>Add an appliance</DialogTitle>
            <DialogDescription>Give it a name and choose the room it lives in.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-2">
            <Label htmlFor="appl-name">Name</Label>
            <Input
              id="appl-name"
              placeholder="e.g. Tumble dryer"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={invalid || undefined}
              aria-describedby={invalid ? 'appl-name-error' : undefined}
              required
            />
            {invalid && (
              <p id="appl-name-error" className="text-sm font-medium text-destructive">
                Use at least 3 characters.
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="appl-room">Room</Label>
            <Select value={room} onValueChange={setRoom}>
              <SelectTrigger id="appl-room" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kitchen">Kitchen</SelectItem>
                <SelectItem value="laundry">Laundry</SelectItem>
                <SelectItem value="utility">Utility room</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Add appliance</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
