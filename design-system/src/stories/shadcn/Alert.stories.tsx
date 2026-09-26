import type { Meta, StoryObj } from '@storybook/react-vite';
import { CircleCheckIcon, InfoIcon, OctagonAlertIcon, TriangleAlertIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const meta = {
  title: 'shadcn/Alert',
  component: Alert,
  decorators: [(S) => <div className="w-[28rem]"><S /></div>],
  parameters: { docs: { description: { component: 'shadcn/ui Alert with AldraHome `success`, `warning` and `info` variants backed by the audited `*-soft` tokens.' } } },
} satisfies Meta<typeof Alert>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Alert variant="info"><InfoIcon /><AlertTitle>Firmware 4.2 available</AlertTitle><AlertDescription>Improves steam program accuracy.</AlertDescription></Alert>
      <Alert variant="success"><CircleCheckIcon /><AlertTitle>Wash complete</AlertTitle><AlertDescription>Cotton 40° finished at 14:32.</AlertDescription></Alert>
      <Alert variant="warning"><TriangleAlertIcon /><AlertTitle>Fridge door open</AlertTitle><AlertDescription>Open for more than 2 minutes.</AlertDescription></Alert>
      <Alert variant="destructive"><OctagonAlertIcon /><AlertTitle>Water supply error</AlertTitle><AlertDescription>Check that the tap is open and the hose is not kinked.</AlertDescription></Alert>
      <Alert><InfoIcon /><AlertTitle>Default</AlertTitle><AlertDescription>Neutral information on a card surface.</AlertDescription></Alert>
    </div>
  ),
};
