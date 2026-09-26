import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const meta = { title: 'shadcn/Select', component: Select } satisfies Meta<typeof Select>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Room: Story = {
  render: () => (
    <div className="grid w-64 gap-2">
      <Label htmlFor="room">Room</Label>
      <Select defaultValue="kitchen">
        <SelectTrigger id="room" className="w-full"><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value="kitchen">Kitchen</SelectItem>
          <SelectItem value="laundry">Laundry</SelectItem>
          <SelectItem value="utility">Utility room</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};
