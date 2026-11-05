import { Button } from './button';

export function Solid() {
  return <Button type="solid">Primary Action</Button>;
}

export function Outline() {
  return <Button type="outline">Secondary Action</Button>;
}

export function Destructive() {
  return <Button type="destructive">Hapus Data</Button>;
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Button size="sm">Small (36px)</Button>
      <Button size="md">Medium (44px)</Button>
      <Button size="lg">Large (52px)</Button>
    </div>
  );
}
