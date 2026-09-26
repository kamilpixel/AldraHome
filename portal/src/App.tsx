import { useEffect, useState } from 'react';
import { BellIcon, HouseIcon, LogOutIcon, MicrowaveIcon, MoonIcon, SettingsIcon, SunIcon, WashingMachineIcon, WifiIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useTheme } from '@/theme/theme-provider';
import { cn } from '@/lib/utils';
import { brands } from '@/tokens/tokens.generated';
import { notifications, type IconType } from './data';
import { HomeView } from './views/HomeView';
import { ApplianceView } from './views/ApplianceView';
import { SettingsView } from './views/SettingsView';
import { BrandMark } from './components/BrandMark';

export type Route = { view: 'home' } | { view: 'appliance'; id: string } | { view: 'settings' };

function parse(hash: string): Route {
  const [, view, id] = hash.replace(/^#/, '').split('/');
  if (view === 'appliance' && id) return { view: 'appliance', id };
  if (view === 'settings') return { view: 'settings' };
  return { view: 'home' };
}

export const href = (r: Route) => (r.view === 'appliance' ? `#/appliance/${r.id}` : `#/${r.view}`);

const nav: { label: string; icon: IconType; route: Route }[] = [
  { label: 'Home', icon: HouseIcon, route: { view: 'home' } },
  { label: 'Oven', icon: MicrowaveIcon, route: { view: 'appliance', id: 'oven' } },
  { label: 'Washer', icon: WashingMachineIcon, route: { view: 'appliance', id: 'washer' } },
  { label: 'Settings', icon: SettingsIcon, route: { view: 'settings' } },
];

const focusRing = 'outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50';

export function App() {
  const [route, setRoute] = useState<Route>(() => parse(location.hash));
  const { brand, mode, toggleMode } = useTheme();
  const unread = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    const on = () => {
      setRoute(parse(location.hash));
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);

  useEffect(() => {
    document.title = brands.find((b) => b.id === brand)!.product;
  }, [brand]);

  const isActive = (r: Route) => href(r) === href(route);

  return (
    <div className="min-h-dvh bg-background text-foreground md:grid md:grid-cols-[248px_1fr]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-card focus:px-4 focus:py-2"
      >
        Skip to content
      </a>

      {/* Sidebar: desktop */}
      <aside className="sticky top-0 hidden h-dvh flex-col border-r border-sidebar-border bg-sidebar px-4 py-6 text-sidebar-foreground md:flex">
        <BrandMark />
        <nav aria-label="Primary" className="mt-8 flex flex-col gap-1">
          {nav.map((n) => (
            <a
              key={n.label}
              href={href(n.route)}
              aria-current={isActive(n.route) ? 'page' : undefined}
              className={cn(
                'flex h-11 items-center gap-3 rounded-md px-3 text-[15px] font-semibold transition-colors [&_svg]:size-5',
                focusRing,
                isActive(n.route)
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              <n.icon aria-hidden="true" /> {n.label}
            </a>
          ))}
        </nav>
        <div className="mt-auto rounded-xl bg-muted p-4 text-sm">
          <p className="font-semibold">Prototype</p>
          <p className="mt-1 text-muted-foreground">Fictional brand, built with React and shadcn/ui.</p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-col pb-24 md:pb-0">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b bg-background/85 px-4 backdrop-blur sm:px-8">
          <div className="md:hidden">
            <BrandMark compact />
          </div>
          <p className="hidden items-center gap-1.5 text-sm text-muted-foreground md:flex">
            <WifiIcon className="size-4 text-success" aria-hidden="true" />4 appliances connected
          </p>
          <div className="ml-auto flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon-lg" onClick={toggleMode} aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
                  {mode === 'dark' ? <SunIcon /> : <MoonIcon />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{mode === 'dark' ? 'Light mode' : 'Dark mode'}</TooltipContent>
            </Tooltip>

            <Sheet>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon-lg" className="relative" aria-label={`Notifications, ${unread} unread`}>
                      <BellIcon />
                      <span aria-hidden="true" className="absolute top-2 right-2 size-2 rounded-full bg-highlight ring-2 ring-background" />
                    </Button>
                  </SheetTrigger>
                </TooltipTrigger>
                <TooltipContent>Notifications</TooltipContent>
              </Tooltip>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Notifications</SheetTitle>
                  <SheetDescription>{unread} unread</SheetDescription>
                </SheetHeader>
                <ul className="flex flex-col gap-2 px-4">
                  {notifications.map((n) => (
                    <li key={n.title} className="flex gap-3 rounded-lg bg-muted p-3">
                      <span aria-hidden="true" className={cn('mt-1.5 size-2 shrink-0 rounded-full', n.unread ? 'bg-primary' : 'bg-transparent')} />
                      <div className="min-w-0 flex-1 text-sm">
                        <p className="font-semibold">{n.title}</p>
                        <p className="text-muted-foreground">{n.body}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{n.time}</span>
                    </li>
                  ))}
                </ul>
              </SheetContent>
            </Sheet>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button type="button" aria-label="Account menu" className={cn('ml-1 rounded-full', focusRing)}>
                  <Avatar size="lg">
                    <AvatarFallback className="bg-primary text-sm font-bold text-primary-foreground">KK</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60">
                <DropdownMenuLabel>
                  Kamil
                  <span className="block text-xs font-normal text-muted-foreground">kamil@example.com</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a href="#/settings">
                    <SettingsIcon /> Settings
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => toast('Signed out (demo)', { description: 'Nothing happened, this is a prototype.' })}>
                  <LogOutIcon /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-8 sm:py-10">
          {route.view === 'home' && <HomeView />}
          {route.view === 'appliance' && <ApplianceView id={route.id} />}
          {route.view === 'settings' && <SettingsView />}
        </main>
      </div>

      {/* Bottom nav: mobile */}
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t bg-card pb-[env(safe-area-inset-bottom)] md:hidden"
      >
        {nav.map((n) => (
          <a
            key={n.label}
            href={href(n.route)}
            aria-current={isActive(n.route) ? 'page' : undefined}
            className={cn(
              'flex h-16 flex-col items-center justify-center gap-1 text-xs font-semibold [&_svg]:size-[22px]',
              focusRing,
              isActive(n.route) ? 'text-primary' : 'text-muted-foreground',
            )}
          >
            <n.icon aria-hidden="true" />
            {n.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
