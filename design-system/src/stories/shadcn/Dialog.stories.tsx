import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const meta = {
  title: 'shadcn/Dialog',
  component: Dialog,
  parameters: { docs: { description: { component: 'Radix portals render into <body>, so the brand is also set on <html>. The dialog follows the toolbar brand + mode.' } } },
} satisfies Meta<typeof Dialog>;
export default meta;
type Story = StoryObj<typeof meta>;

export const StopCycle: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild><Button variant="destructive">Stop cycle</Button></DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Stop the wash cycle?</DialogTitle>
          <DialogDescription>The drum will drain and unlock. Cotton 40° has 38 minutes left.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild><Button variant="outline">Keep washing</Button></DialogClose>
          <DialogClose asChild><Button variant="destructive">Stop and drain</Button></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
