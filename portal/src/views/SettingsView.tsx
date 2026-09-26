import { useState } from 'react';
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useTheme, type ModePreference } from '@/theme/theme-provider';

export function SettingsView() {
  const { preference, setPreference } = useTheme();
  const [name, setName] = useState('Kamil');
  const error = name.trim().length < 2 ? 'Please enter at least 2 characters.' : undefined;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-1 text-muted-foreground">Personalise your portal.</p>
      </div>


      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">
              <h2>Appearance</h2>
            </CardTitle>
            <CardDescription>Dark mode also reduces glare for light-sensitive users.</CardDescription>
          </CardHeader>
          <CardContent>
            <ToggleGroup
              type="single"
              variant="outline"
              size="lg"
              value={preference}
              onValueChange={(v) => v && setPreference(v as ModePreference)}
              aria-label="Colour mode"
              className="w-full"
            >
              <ToggleGroupItem value="light" className="flex-1">
                <SunIcon /> Light
              </ToggleGroupItem>
              <ToggleGroupItem value="dark" className="flex-1">
                <MoonIcon /> Dark
              </ToggleGroupItem>
              <ToggleGroupItem value="system" className="flex-1">
                <MonitorIcon /> System
              </ToggleGroupItem>
            </ToggleGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">
              <h2>Profile</h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="flex flex-col gap-5"
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                if (!error) toast.success('Profile saved', { description: `Display name set to ${name.trim()}.` });
              }}
            >
              <div className="grid gap-2">
                <Label htmlFor="display-name">
                  Display name <span aria-hidden="true" className="text-destructive">*</span>
                </Label>
                <Input
                  id="display-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? 'display-name-error' : undefined}
                />
                {error && (
                  <p id="display-name-error" className="text-sm font-medium text-destructive">
                    {error}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="kamil@example.com" aria-describedby="email-hint" />
                <p id="email-hint" className="text-sm text-muted-foreground">
                  Used for service reminders only.
                </p>
              </div>
              <div>
                <Button type="submit" disabled={!!error}>
                  Save changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card className="gap-0 pb-2">
        <CardHeader className="pb-4">
          <CardTitle className="font-display text-lg">
            <h2>Notifications</h2>
          </CardTitle>
        </CardHeader>
        {[
          ['n-cycle', 'Cycle finished', 'When a wash, dry or dish cycle ends.', true],
          ['n-maint', 'Maintenance reminders', 'Descaling, filters and pyrolytic cleaning.', true],
          ['n-tips', 'Energy tips', 'Weekly suggestions to lower consumption.', false],
        ].map(([id, label, desc, on], i) => (
          <div key={id as string}>
            {i > 0 && <Separator />}
            <div className="flex items-center justify-between gap-4 px-6 py-4">
              <div>
                <Label htmlFor={id as string} className="text-[15px] font-semibold">
                  {label as string}
                </Label>
                <p id={`${id}-d`} className="text-sm text-muted-foreground">
                  {desc as string}
                </p>
              </div>
              <Switch id={id as string} defaultChecked={on as boolean} aria-describedby={`${id}-d`} />
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
