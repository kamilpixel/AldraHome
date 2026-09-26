import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const meta = { title: 'shadcn/Sheet', component: Sheet } satisfies Meta<typeof Sheet>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Notifications: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild><Button variant="outline">Open notifications</Button></SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>2 unread</SheetDescription>
        </SheetHeader>
        <ul className="grid gap-3 px-4 text-sm">
          <li className="rounded-md bg-muted p-3">Washing machine started Cotton 40°</li>
          <li className="rounded-md bg-muted p-3">Fridge filter at 10%, reorder suggested</li>
        </ul>
      </SheetContent>
    </Sheet>
  ),
};
