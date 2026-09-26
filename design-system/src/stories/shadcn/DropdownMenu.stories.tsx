import type { Meta, StoryObj } from '@storybook/react-vite';
import { LogOutIcon, PaletteIcon, UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup,
  DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const meta = { title: 'shadcn/Dropdown menu', component: DropdownMenu } satisfies Meta<typeof DropdownMenu>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Account: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild><Button variant="outline">Account</Button></DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Kamil</DropdownMenuLabel>
        <DropdownMenuItem><UserIcon /> Profile</DropdownMenuItem>
        <DropdownMenuItem><PaletteIcon /> Appearance</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs text-muted-foreground">Home</DropdownMenuLabel>
        <DropdownMenuRadioGroup value="flat">
          <DropdownMenuRadioItem value="flat">City flat</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="cabin">Lake cabin</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive"><LogOutIcon /> Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
