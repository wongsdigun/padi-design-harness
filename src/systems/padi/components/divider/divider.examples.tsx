import { Divider } from './divider';

export function Horizontal() {
  return (
    <div>
      <p>Bagian Atas</p>
      <Divider />
      <p>Bagian Bawah</p>
    </div>
  );
}

export function WithText() {
  return (
    <div>
      <Divider textPosition="center">atau masuk dengan</Divider>
    </div>
  );
}
