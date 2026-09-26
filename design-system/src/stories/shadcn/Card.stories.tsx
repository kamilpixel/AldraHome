import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowRightIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const meta = { title: 'shadcn/Card', component: Card } satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Appliance: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardDescription>Kitchen</CardDescription>
        <CardTitle className="font-display text-lg">Pyrolytic oven</CardTitle>
        <CardAction><Badge variant="success">Baking</Badge></CardAction>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">Fan bake at 180°. Ready in 24 minutes.</CardContent>
      <CardFooter>
        <Button size="sm">Open controls <ArrowRightIcon /></Button>
      </CardFooter>
    </Card>
  ),
};

export const Brand: Story = {
  render: () => (
    <Card className="w-80 border-transparent bg-primary text-primary-foreground">
      <CardHeader>
        <CardTitle className="font-display text-lg">Try steam-assisted baking</CardTitle>
        <CardDescription className="text-primary-foreground/85">12 steam recipes for your SteamPro 900.</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button size="sm" variant="secondary">Explore recipes</Button>
      </CardFooter>
    </Card>
  ),
};
