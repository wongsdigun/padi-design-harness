import { Chip } from './chip';

export function Default() {
  return <Chip>Kategori UMKM</Chip>;
}

export function Colors() {
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Chip color="tosca">Tosca</Chip>
      <Chip color="green">Aktif</Chip>
      <Chip color="orange">Menunggu</Chip>
      <Chip color="red">Dibatalkan</Chip>
    </div>
  );
}

export function Removable() {
  return <Chip onDelete={() => alert('Dihapus')}>Elektronik</Chip>;
}
