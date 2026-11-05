import { Badge } from './badge';

export function Default() {
  return <Badge count={5} />;
}

export function Dot() {
  return <Badge dot />;
}

export function MaxCount() {
  return <Badge count={120} maxCount={99} />;
}
