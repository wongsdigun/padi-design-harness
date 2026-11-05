import { Select, SelectInput, SelectContent, SelectItem } from './select';

export function Basic() {
  return (
    <div style={{ maxWidth: '320px' }}>
      <Select defaultValue="jkt">
        <SelectInput label="Kota Pengiriman" placeholder="Pilih kota..." />
        <SelectContent>
          <SelectItem value="jkt" label="DKI Jakarta" />
          <SelectItem value="bdg" label="Bandung" />
          <SelectItem value="sby" label="Surabaya" />
          <SelectItem value="mdn" label="Medan" />
        </SelectContent>
      </Select>
    </div>
  );
}
