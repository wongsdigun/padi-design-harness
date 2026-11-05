import { Spinner } from './spinner';

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  );
}
