#!/usr/bin/env node
/* scripts/generate-padi-components.mjs
 * Generates wrapped PaDi DS components in src/systems/padi/components/
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, join } from 'node:path';

const baseDir = resolve(process.cwd(), 'src/systems/padi/components');

const components = [
  {
    slug: 'button',
    name: 'Button',
    desc: 'Official PaDi UMKM Button component for primary, outline, and destructive actions.',
    code: `import { Button as PadiButton } from '@frontend-shared/padi-ds';
import type { ButtonProps, ButtonSize, ButtonType, ButtonMode } from '@frontend-shared/padi-ds';

export function Button(props: ButtonProps) {
  return <PadiButton data-padi-ds="Button" {...props} />;
}

export type { ButtonProps, ButtonSize, ButtonType, ButtonMode };
`,
    examples: `import { Button } from './button';

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
`,
    guidance: `Use buttons for actions that submit data, trigger workflows, or navigate users.
- Use \`solid\` for primary call-to-action buttons.
- Use \`outline\` for secondary actions and filters.
- Use \`destructive\` for irreversible deletion actions.`
  },
  {
    slug: 'badge',
    name: 'Badge',
    desc: 'Visual indicator for numeric counts, status notifications, and labels.',
    code: `import { Badge as PadiBadge } from '@frontend-shared/padi-ds';
import type { BadgeProps, BadgeSize } from '@frontend-shared/padi-ds';

export function Badge(props: BadgeProps) {
  return <PadiBadge data-padi-ds="Badge" {...props} />;
}

export type { BadgeProps, BadgeSize };
`,
    examples: `import { Badge } from './badge';

export function Default() {
  return <Badge count={5} />;
}

export function Dot() {
  return <Badge dot />;
}

export function MaxCount() {
  return <Badge count={120} maxCount={99} />;
}
`,
    guidance: `Use badges to indicate unread messages, item counts, or notification signals on icons or avatars.`
  },
  {
    slug: 'chip',
    name: 'Chip',
    desc: 'Compact interactive element for tags, categories, and selection states.',
    code: `import { Chip as PadiChip } from '@frontend-shared/padi-ds';
import type { ChipProps, ChipSize, ChipType, ChipColor } from '@frontend-shared/padi-ds';

export function Chip(props: ChipProps) {
  return <PadiChip data-padi-ds="Chip" {...props} />;
}

export type { ChipProps, ChipSize, ChipType, ChipColor };
`,
    examples: `import { Chip } from './chip';

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
`,
    guidance: `Use chips to represent user selections, active filters, tags, or discrete entities in compact form.`
  },
  {
    slug: 'chip-filter',
    name: 'ChipFilter',
    desc: 'Filter pill toggle for quick facet filtering in lists and catalogues.',
    code: `import { ChipFilter as PadiChipFilter } from '@frontend-shared/padi-ds';
import type { ChipFilterProps, ChipFilterSize } from '@frontend-shared/padi-ds';

export function ChipFilter(props: ChipFilterProps) {
  return <PadiChipFilter data-padi-ds="ChipFilter" {...props} />;
}

export type { ChipFilterProps, ChipFilterSize };
`,
    examples: `import { useState } from 'react';
import { ChipFilter } from './chip-filter';

export function FilterGroup() {
  const [selected, setSelected] = useState('semua');
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <ChipFilter active={selected === 'semua'} onToggle={() => setSelected('semua')}>Semua</ChipFilter>
      <ChipFilter active={selected === 'bumn'} onToggle={() => setSelected('bumn')}>BUMN</ChipFilter>
      <ChipFilter active={selected === 'umkm'} onToggle={() => setSelected('umkm')}>UMKM</ChipFilter>
    </div>
  );
}
`,
    guidance: `Use chip filters to toggle categorical views or list filtering options with single or multiple select states.`
  },
  {
    slug: 'divider',
    name: 'Divider',
    desc: 'Separates content sections horizontally or vertically with optional text label.',
    code: `import { Divider as PadiDivider } from '@frontend-shared/padi-ds';
import type {
  DividerProps,
  DividerOrientation,
  DividerVariant,
  DividerColor,
  DividerTextPosition,
} from '@frontend-shared/padi-ds';

export function Divider(props: DividerProps) {
  return <PadiDivider data-padi-ds="Divider" {...props} />;
}

export type {
  DividerProps,
  DividerOrientation,
  DividerVariant,
  DividerColor,
  DividerTextPosition,
};
`,
    examples: `import { Divider } from './divider';

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
`,
    guidance: `Use dividers to establish visual boundaries between content sections, list groups, or form blocks.`
  },
  {
    slug: 'checkbox',
    name: 'Checkbox',
    desc: 'Binary or indeterminate selection control for forms and multi-item tables.',
    code: `import { Checkbox as PadiCheckbox } from '@frontend-shared/padi-ds';
import type { CheckboxProps, CheckboxSize } from '@frontend-shared/padi-ds';

export function Checkbox(props: CheckboxProps) {
  return <PadiCheckbox data-padi-ds="Checkbox" {...props} />;
}

export type { CheckboxProps, CheckboxSize };
`,
    examples: `import { useState } from 'react';
import { Checkbox } from './checkbox';

export function States() {
  const [checked, setChecked] = useState(true);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Checkbox checked={checked} onCheckedChange={(val) => setChecked(Boolean(val))} label="Saya menyetujui syarat & ketentuan" />
      <Checkbox disabled label="Pilihan tidak dapat diubah" />
    </div>
  );
}
`,
    guidance: `Use checkboxes when users can select one or more options from a set, or toggle a single standalone setting.`
  },
  {
    slug: 'radio',
    name: 'Radio',
    desc: 'Mutually exclusive selection control within a group of options.',
    code: `import { Radio as PadiRadio, RadioGroup as PadiRadioGroup } from '@frontend-shared/padi-ds';
import type { RadioProps, RadioGroupProps, RadioSize } from '@frontend-shared/padi-ds';

export function Radio(props: RadioProps) {
  return <PadiRadio data-padi-ds="Radio" {...props} />;
}

export function RadioGroup(props: RadioGroupProps) {
  return <PadiRadioGroup data-padi-ds="RadioGroup" {...props} />;
}

export type { RadioProps, RadioGroupProps, RadioSize };
`,
    examples: `import { useState } from 'react';
import { Radio, RadioGroup } from './radio';

export function DefaultGroup() {
  const [val, setVal] = useState('regular');
  return (
    <RadioGroup value={val} onValueChange={(next) => setVal(String(next))}>
      <Radio value="regular" label="Pengiriman Reguler (2-3 hari)" />
      <Radio value="express" label="Pengiriman Kilat (1 hari)" />
      <Radio value="sameday" label="Same Day (Hari ini)" />
    </RadioGroup>
  );
}
`,
    guidance: `Use radio buttons when users must choose exactly one option from a list of two or more mutually exclusive choices.`
  },
  {
    slug: 'switch',
    name: 'Switch',
    desc: 'Instant toggle switch for on/off states and feature toggles.',
    code: `import { Switch as PadiSwitch } from '@frontend-shared/padi-ds';
import type { SwitchProps, SwitchSize } from '@frontend-shared/padi-ds';

export function Switch(props: SwitchProps) {
  return <PadiSwitch data-padi-ds="Switch" {...props} />;
}

export type { SwitchProps, SwitchSize };
`,
    examples: `import { useState } from 'react';
import { Switch } from './switch';

export function Interactive() {
  const [on, setOn] = useState(false);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Switch checked={on} onCheckedChange={setOn} />
      <span>{on ? 'Notifikasi Aktif' : 'Notifikasi Senyap'}</span>
    </div>
  );
}
`,
    guidance: `Use switches for settings that take immediate effect without requiring a form submission step.`
  },
  {
    slug: 'text-field',
    name: 'TextField',
    desc: 'Standard text input with support for labels, helper text, error messages, and icons.',
    code: `import { TextField as PadiTextField } from '@frontend-shared/padi-ds';
import type { TextFieldProps, TextFieldSize } from '@frontend-shared/padi-ds';

export function TextField(props: TextFieldProps) {
  return <PadiTextField data-padi-ds="TextField" {...props} />;
}

export type { TextFieldProps, TextFieldSize };
`,
    examples: `import { TextField } from './text-field';

export function Basic() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '360px' }}>
      <TextField label="Nama Lengkap" placeholder="Masukkan nama sesuai KTP" />
      <TextField label="Email Kantor" placeholder="nama@perusahaan.co.id" description="Digunakan untuk verifikasi PO" />
      <TextField label="Nomor NPWP" error="Format NPWP tidak valid" defaultValue="00.123" />
    </div>
  );
}
`,
    guidance: `Use text fields to capture single-line textual data such as names, numbers, emails, and short codes.`
  },
  {
    slug: 'text-area',
    name: 'TextArea',
    desc: 'Multi-line text input for extended descriptions, notes, and addresses.',
    code: `import { TextArea as PadiTextArea } from '@frontend-shared/padi-ds';
import type { TextAreaProps } from '@frontend-shared/padi-ds';

export function TextArea(props: TextAreaProps) {
  return <PadiTextArea data-padi-ds="TextArea" {...props} />;
}

export type { TextAreaProps };
`,
    examples: `import { TextArea } from './text-area';

export function Basic() {
  return (
    <div style={{ maxWidth: '480px' }}>
      <TextArea label="Alamat Pengiriman" placeholder="Masukkan alamat lengkap beserta kode pos..." rows={4} />
    </div>
  );
}
`,
    guidance: `Use text areas when users need to enter multiple lines of text, comments, terms, or addresses.`
  },
  {
    slug: 'spinner',
    name: 'Spinner',
    desc: 'Animated loading indicator representing active background processing.',
    code: `import { Spinner as PadiSpinner } from '@frontend-shared/padi-ds';
import type { SpinnerProps, SpinnerSize, SpinnerColor } from '@frontend-shared/padi-ds';

export function Spinner(props: SpinnerProps) {
  return <PadiSpinner data-padi-ds="Spinner" {...props} />;
}

export type { SpinnerProps, SpinnerSize, SpinnerColor };
`,
    examples: `import { Spinner } from './spinner';

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  );
}
`,
    guidance: `Use spinners during indeterminate asynchronous actions like API calls, file uploads, or page transitions.`
  },
  {
    slug: 'tooltip',
    name: 'Tooltip',
    desc: 'Contextual helper text appearing on hover or focus, scoped via usePortalContainer.',
    code: `import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import { TooltipInfo as PadiTooltipInfo } from '@frontend-shared/padi-ds';
import type { TooltipProps as PadiTooltipProps, TooltipInfoProps, TooltipSide, TooltipAlign } from '@frontend-shared/padi-ds';
import { usePortalContainer } from '#studio/runtime';

export interface TooltipProps extends PadiTooltipProps {
  container?: HTMLElement | null;
}

export function Tooltip({
  children,
  content,
  side = 'top',
  align = 'center',
  delay,
  closeDelay,
  disabled = false,
  arrow = true,
  ariaLabel,
  className = '',
  container,
}: TooltipProps) {
  const portalContainer = usePortalContainer();
  return (
    <BaseTooltip.Root disabled={disabled}>
      <BaseTooltip.Trigger
        render={children as never}
        delay={delay}
        closeDelay={closeDelay}
        {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}
      />
      <BaseTooltip.Portal container={container ?? portalContainer ?? undefined}>
        <BaseTooltip.Positioner
          className="ds-tooltip-positioner"
          side={side}
          align={align}
          sideOffset={arrow ? 6 : 8}
        >
          <BaseTooltip.Popup
            data-padi-ds="Tooltip"
            className={['ds-tooltip', className].filter(Boolean).join(' ')}
          >
            {arrow ? <BaseTooltip.Arrow className="ds-tooltip__arrow" /> : null}
            {content as never}
          </BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  );
}

export function TooltipInfo(props: TooltipInfoProps) {
  return <PadiTooltipInfo data-padi-ds="TooltipInfo" {...props} />;
}

export type { TooltipInfoProps, TooltipSide, TooltipAlign };
`,
    examples: `import { Tooltip, TooltipInfo } from './tooltip';
import { Button } from '../button';

export function HoverButton() {
  return (
    <div style={{ padding: '24px' }}>
      <Tooltip content="Klik untuk menyetujui transaksi Purchase Order ini">
        <Button type="solid">Setujui PO</Button>
      </Tooltip>
    </div>
  );
}

export function Info() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span>Biaya Layanan</span>
      <TooltipInfo content="Biaya pemrosesan transaksi sebesar 1.5% dikenakan oleh pihak payment gateway." />
    </div>
  );
}
`,
    guidance: `Use tooltips to provide brief explanatory labels or supplemental descriptions for icons and compact controls.`
  },
  {
    slug: 'alert',
    name: 'Alert',
    desc: 'Prominent banner message communicating system feedback, warnings, or instructions.',
    code: `import { Alert as PadiAlert } from '@frontend-shared/padi-ds';
import type { AlertProps, AlertVariant } from '@frontend-shared/padi-ds';

export function Alert(props: AlertProps) {
  return <PadiAlert data-padi-ds="Alert" {...props} />;
}

export type { AlertProps, AlertVariant };
`,
    examples: `import { Alert } from './alert';

export function AllVariants() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Alert variant="info" title="Informasi Rekening" description="Rekening giro Anda sedang diverifikasi oleh tim finance." />
      <Alert variant="success" title="Pembayaran Berhasil" description="PO #98234 telah berhasil dibayarkan via VA Mandiri." />
      <Alert variant="warning" title="Perhatian" description="Batas waktu pelunasan termin 1 tersisa 2 hari lagi." />
      <Alert variant="error" title="Gagal Memproses" description="Koneksi ke server KBLI terputus. Silakan coba sesaat lagi." />
    </div>
  );
}
`,
    guidance: `Use alerts to communicate contextual system feedback at the page or section level.`
  },
  {
    slug: 'snackbar',
    name: 'Snackbar',
    desc: 'Toast notification system for transient feedback messages.',
    code: `import { SnackbarProvider as PadiSnackbarProvider, useSnackbar } from '@frontend-shared/padi-ds';
import type { SnackbarProviderProps, SnackbarPosition, SnackbarType } from '@frontend-shared/padi-ds';

export function SnackbarProvider(props: SnackbarProviderProps) {
  return <PadiSnackbarProvider data-padi-ds="SnackbarProvider" {...props} />;
}

export { useSnackbar };
export type { SnackbarProviderProps, SnackbarPosition, SnackbarType };
`,
    examples: `import { SnackbarProvider, useSnackbar } from './snackbar';
import { Button } from '../button';

function TriggerDemo() {
  const snackbar = useSnackbar();
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Button type="outline" onClick={() => snackbar.add({ type: 'success', title: 'Data berhasil disimpan!' })}>
        Tampilkan Sukses
      </Button>
      <Button type="outline" onClick={() => snackbar.add({ type: 'error', title: 'Gagal mengunggah file' })}>
        Tampilkan Error
      </Button>
    </div>
  );
}

export function Demo() {
  return (
    <SnackbarProvider>
      <TriggerDemo />
    </SnackbarProvider>
  );
}
`,
    guidance: `Use snackbars for brief, low-friction status confirmations that do not disrupt the user's primary workflow.`
  },
  {
    slug: 'modal',
    name: 'Modal',
    desc: 'Dialog overlay window scoped inside usePortalContainer with themed backdrop and actions.',
    code: `import * as React from 'react';
import {
  Modal as PadiModal,
  ModalTrigger as PadiModalTrigger,
  ModalHeader as PadiModalHeader,
  ModalBody as PadiModalBody,
  ModalActions as PadiModalActions,
} from '@frontend-shared/padi-ds';
import type {
  ModalProps,
  ModalTriggerProps,
  ModalHeaderProps,
  ModalBodyProps,
  ModalActionsProps,
  ModalContentProps as PadiModalContentProps,
} from '@frontend-shared/padi-ds';
import { Dialog } from '@base-ui/react/dialog';
import { usePortalContainer } from '#studio/runtime';

export interface ModalContentProps extends PadiModalContentProps {
  container?: HTMLElement | null;
}

export const Modal = function Modal(props: ModalProps) {
  return <PadiModal data-padi-ds="Modal" {...props} />;
};

export const ModalTrigger = PadiModalTrigger;
export const ModalHeader = PadiModalHeader;
export const ModalBody = PadiModalBody;
export const ModalActions = PadiModalActions;

export const ModalContent = React.forwardRef<HTMLDivElement, ModalContentProps>(
  function ModalContent({ mobile = false, className = '', container, children, ...props }, ref) {
    const portalContainer = usePortalContainer();
    const Popup = Dialog.Popup as any;
    return (
      <Dialog.Portal container={container ?? portalContainer ?? undefined}>
        <Dialog.Backdrop className="ds-modal__backdrop" />
        <Dialog.Viewport className="ds-modal__viewport">
          <Popup
            ref={ref}
            data-padi-ds="ModalContent"
            className={['ds-modal', className].filter(Boolean).join(' ')}
            data-mode-mobile={mobile ? '' : undefined}
            {...props}
          >
            {children}
          </Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    );
  }
);

export type {
  ModalProps,
  ModalTriggerProps,
  ModalHeaderProps,
  ModalBodyProps,
  ModalActionsProps,
};
`,
    examples: `import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalActions,
} from './modal';
import { Button } from '../button';

export function Confirmation() {
  return (
    <Modal>
      <ModalTrigger render={<Button type="destructive">Hapus Vendor</Button>} />
      <ModalContent>
        <ModalHeader title="Konfirmasi Penghapusan" />
        <ModalBody>
          <p>Apakah Anda yakin ingin menghapus data vendor ini? Tindakan ini tidak dapat dibatalkan.</p>
        </ModalBody>
        <ModalActions>
          <Button type="outline">Batal</Button>
          <Button type="destructive">Ya, Hapus</Button>
        </ModalActions>
      </ModalContent>
    </Modal>
  );
}
`,
    guidance: `Use modals for focused user decisions, confirmation flows, or detailed sub-tasks that require user attention before continuing.`
  },
  {
    slug: 'tabs',
    name: 'Tabs',
    desc: 'Organizes content into multiple switchable view panes within a single surface.',
    code: `import {
  Tabs as PadiTabs,
  TabsList as PadiTabsList,
  TabsTab as PadiTabsTab,
  TabsPanel as PadiTabsPanel,
} from '@frontend-shared/padi-ds';
import type {
  TabsProps,
  TabsListProps,
  TabsTabProps,
  TabsPanelProps,
  TabsSize,
} from '@frontend-shared/padi-ds';

export function Tabs(props: TabsProps) {
  return <PadiTabs data-padi-ds="Tabs" {...props} />;
}
export function TabsList(props: TabsListProps) {
  return <PadiTabsList data-padi-ds="TabsList" {...props} />;
}
export function TabsTab(props: TabsTabProps) {
  return <PadiTabsTab data-padi-ds="TabsTab" {...props} />;
}
export function TabsPanel(props: TabsPanelProps) {
  return <PadiTabsPanel data-padi-ds="TabsPanel" {...props} />;
}

export type {
  TabsProps,
  TabsListProps,
  TabsTabProps,
  TabsPanelProps,
  TabsSize,
};
`,
    examples: `import { Tabs, TabsList, TabsTab, TabsPanel } from './tabs';

export function Basic() {
  return (
    <Tabs defaultValue="po">
      <TabsList>
        <TabsTab value="po">Purchase Order</TabsTab>
        <TabsTab value="invoice">Faktur Tagihan</TabsTab>
        <TabsTab value="history">Riwayat Log</TabsTab>
      </TabsList>
      <TabsPanel value="po" style={{ padding: '16px 0' }}>
        <p>Konten daftar PO yang sedang aktif dan menunggu persetujuan.</p>
      </TabsPanel>
      <TabsPanel value="invoice" style={{ padding: '16px 0' }}>
        <p>Konten faktur tagihan yang telah diverifikasi bagian keuangan.</p>
      </TabsPanel>
      <TabsPanel value="history" style={{ padding: '16px 0' }}>
        <p>Log audit perubahan status transaksi.</p>
      </TabsPanel>
    </Tabs>
  );
}
`,
    guidance: `Use tabs to partition related information into distinct parallel panels without navigating to a new page.`
  },
  {
    slug: 'select',
    name: 'Select',
    desc: 'Dropdown selection menu with optional search, scoped via usePortalContainer.',
    code: `import {
  Select as PadiSelect,
  SelectTrigger,
  SelectInput,
  SelectContent,
  SelectSearch,
  SelectItem,
} from '@frontend-shared/padi-ds';
import type {
  SelectProps,
  SelectTriggerProps,
  SelectInputProps,
  SelectContentProps,
  SelectSearchProps,
  SelectItemProps,
} from '@frontend-shared/padi-ds';

export function Select(props: SelectProps) {
  return <PadiSelect data-padi-ds="Select" {...props} />;
}

export { SelectTrigger, SelectInput, SelectContent, SelectSearch, SelectItem };
export type {
  SelectProps,
  SelectTriggerProps,
  SelectInputProps,
  SelectContentProps,
  SelectSearchProps,
  SelectItemProps,
};
`,
    examples: `import { Select, SelectInput, SelectContent, SelectItem } from './select';

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
`,
    guidance: `Use select menus when users need to select one or more options from a collapsible list of items.`
  },
  {
    slug: 'radio-card',
    name: 'RadioCard',
    desc: 'Card-styled radio option combining rich content, title, and descriptive metadata.',
    code: `import { RadioCard as PadiRadioCard } from '@frontend-shared/padi-ds';
import type { RadioCardProps } from '@frontend-shared/padi-ds';

export function RadioCard(props: RadioCardProps) {
  return <PadiRadioCard data-padi-ds="RadioCard" {...props} />;
}

export type { RadioCardProps };
`,
    examples: `import { useState } from 'react';
import { RadioCard } from './radio-card';
import { RadioGroup } from '../radio';

export function CardGroup() {
  const [selected, setSelected] = useState('va');
  return (
    <RadioGroup value={selected} onValueChange={(next) => setSelected(String(next))}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', maxWidth: '600px' }}>
        <RadioCard
          value="va"
          label="Virtual Account Mandiri"
          description="Verifikasi otomatis real-time tanpa upload bukti transfer."
        />
        <RadioCard
          value="cc"
          label="Kartu Kredit Corporate"
          description="Persetujuan instan dengan batas kredit korporasi."
        />
      </div>
    </RadioGroup>
  );
}
`,
    guidance: `Use radio cards when presenting selectable options that require richer context, multi-line explanations, or visual emphasis.`
  },
  {
    slug: 'quantity-stepper',
    name: 'QuantityStepper',
    desc: 'Numeric counter control with decrement and increment buttons.',
    code: `import { QuantityStepper as PadiQuantityStepper } from '@frontend-shared/padi-ds';
import type { QuantityStepperProps, QuantityStepperSize } from '@frontend-shared/padi-ds';

export function QuantityStepper(props: QuantityStepperProps) {
  return <PadiQuantityStepper data-padi-ds="QuantityStepper" {...props} />;
}

export type { QuantityStepperProps, QuantityStepperSize };
`,
    examples: `import { useState } from 'react';
import { QuantityStepper } from './quantity-stepper';

export function Interactive() {
  const [qty, setQty] = useState(1);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <span>Jumlah Pesanan:</span>
      <QuantityStepper label="Jumlah" value={qty} onValueChange={(val) => setQty(Number(val) || 1)} min={1} max={50} />
    </div>
  );
}
`,
    guidance: `Use quantity steppers in shopping carts, order forms, or procurement item quantities.`
  },
  {
    slug: 'uploader',
    name: 'Uploader',
    desc: 'File upload zone with drag-and-drop, progress status, and file item lists.',
    code: `import { Uploader as PadiUploader, UploadedFile as PadiUploadedFile } from '@frontend-shared/padi-ds';
import type { UploaderProps, UploadedFileProps, UploaderFileState } from '@frontend-shared/padi-ds';

export function Uploader(props: UploaderProps) {
  return <PadiUploader data-padi-ds="Uploader" {...props} />;
}

export function UploadedFile(props: UploadedFileProps) {
  return <PadiUploadedFile data-padi-ds="UploadedFile" {...props} />;
}

export type { UploaderProps, UploadedFileProps, UploaderFileState };
`,
    examples: `import { Uploader, UploadedFile } from './uploader';

export function Basic() {
  return (
    <div style={{ maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Uploader
        title="Tarik dan lepas dokumen di sini"
        description="Format didukung: PDF, PNG, JPG (Maks. 5MB)"
      />
      <UploadedFile
        name="KBLI_Dokumen_2026.pdf"
        size="2.4 MB"
        state="success"
      />
    </div>
  );
}
`,
    guidance: `Use uploader for document submission, KBLI certificates, tax documents, or product catalogue images.`
  },
  {
    slug: 'pagination',
    name: 'Pagination',
    desc: 'Navigation control across segmented lists and multi-page tables.',
    code: `import { Pagination as PadiPagination } from '@frontend-shared/padi-ds';
import type { PaginationProps } from '@frontend-shared/padi-ds';

export function Pagination(props: PaginationProps) {
  return <PadiPagination data-padi-ds="Pagination" {...props} />;
}

export type { PaginationProps };
`,
    examples: `import { useState } from 'react';
import { Pagination } from './pagination';

export function Interactive() {
  const [page, setPage] = useState(1);
  return (
    <Pagination
      page={page}
      pageCount={10}
      onPageChange={setPage}
    />
  );
}
`,
    guidance: `Use pagination at the bottom of data tables, transaction logs, and search result grids.`
  },
  {
    slug: 'table',
    name: 'Table',
    desc: 'Structured tabular data display with typed columns, row keys, and cell renderers.',
    code: `import { Table as PadiTable } from '@frontend-shared/padi-ds';
import type { TableProps, TableColumn } from '@frontend-shared/padi-ds';

export function Table<T>(props: TableProps<T>) {
  return <PadiTable data-padi-ds="Table" {...props} />;
}

export type { TableProps, TableColumn };
`,
    examples: `import { Table, type TableColumn } from './table';
import { Chip } from '../chip';
import { Button } from '../button';

interface Order {
  id: string;
  poNumber: string;
  vendor: string;
  amount: string;
  status: string;
}

const orders: Order[] = [
  { id: '1', poNumber: 'PO-2026-001', vendor: 'PT Sumber Makmur', amount: 'Rp 45.000.000', status: 'Selesai' },
  { id: '2', poNumber: 'PO-2026-002', vendor: 'CV Jaya Abadi', amount: 'Rp 12.500.000', status: 'Diproses' },
  { id: '3', poNumber: 'PO-2026-003', vendor: 'PT Telkom Akses', amount: 'Rp 88.000.000', status: 'Menunggu' },
];

const columns: TableColumn<Order>[] = [
  { header: 'No. PO', cell: (r) => <strong>{r.poNumber}</strong> },
  { header: 'Nama Vendor', cell: (r) => r.vendor },
  { header: 'Nominal', cell: (r) => r.amount },
  { header: 'Status', cell: (r) => <Chip color={r.status === 'Selesai' ? 'green' : 'tosca'}>{r.status}</Chip> },
  { header: 'Aksi', cell: () => <Button type="outline" size="sm">Rincian</Button> },
];

export function BasicTable() {
  return (
    <div style={{ width: '100%', maxWidth: '800px' }}>
      <Table columns={columns} rows={orders} rowKey={(r) => r.id} caption="Daftar Transaksi PO Q4" />
    </div>
  );
}
`,
    guidance: `Use tables to compare and review structured multi-attribute datasets like POs, invoices, and catalogue rows.`
  },
  {
    slug: 'date-picker',
    name: 'DatePicker',
    desc: 'Calendar date picker supporting single date and date range selections.',
    code: `import { DatePicker as PadiDatePicker } from '@frontend-shared/padi-ds';
import type {
  DatePickerProps,
  DatePickerSingleProps,
  DatePickerRangeProps,
  DatePickerView,
  DateRange,
} from '@frontend-shared/padi-ds';

export function DatePicker(props: DatePickerProps) {
  return <PadiDatePicker data-padi-ds="DatePicker" {...props} />;
}

export type {
  DatePickerProps,
  DatePickerSingleProps,
  DatePickerRangeProps,
  DatePickerView,
  DateRange,
};
`,
    examples: `import { useState } from 'react';
import { DatePicker } from './date-picker';

export function SingleDate() {
  const [date, setDate] = useState<Date | null>(new Date(2026, 9, 24));
  return (
    <div style={{ maxWidth: '320px' }}>
      <DatePicker
        label="Tanggal Pengiriman"
        value={date}
        onValueChange={setDate}
        hint="Pilih tanggal pengiriman yang diharapkan"
      />
    </div>
  );
}
`,
    guidance: `Use date pickers for scheduling, filter ranges (e.g. Q4 dates), transaction filters, and birthdate inputs.`
  }
];

console.log('[generate-padi-components] Generating 23 PaDi DS component folders...');

const indexExports = [];

for (const comp of components) {
  const dir = join(baseDir, comp.slug);
  mkdirSync(dir, { recursive: true });

  // 1. Component .tsx
  const tsxPath = join(dir, `${comp.slug}.tsx`);
  writeFileSync(tsxPath, comp.code, 'utf8');

  // 2. index.ts
  const indexPath = join(dir, 'index.ts');
  writeFileSync(indexPath, `export * from './${comp.slug}';\n`, 'utf8');

  // 3. Component .md
  const mdPath = join(dir, `${comp.slug}.md`);
  const mdContent = `---
title: ${comp.name}
description: ${comp.desc}
---

## When to use

${comp.guidance}
`;
  writeFileSync(mdPath, mdContent, 'utf8');

  // 4. Component .examples.tsx
  const examplesPath = join(dir, `${comp.slug}.examples.tsx`);
  writeFileSync(examplesPath, comp.examples, 'utf8');

  indexExports.push(`export * from './${comp.slug}';`);
  console.log(`  + ${comp.slug} (${comp.name})`);
}

// Write src/systems/padi/components/index.ts
const rootIndexPath = join(baseDir, 'index.ts');
writeFileSync(rootIndexPath, `/* PaDi UMKM Design System Component Library */\n` + indexExports.join('\n') + '\n', 'utf8');

console.log(`[generate-padi-components] Successfully regenerated 23 components and root index.ts!`);
