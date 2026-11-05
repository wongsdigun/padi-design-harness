import { Uploader as PadiUploader, UploadedFile as PadiUploadedFile } from '@frontend-shared/padi-ds';
import type { UploaderProps, UploadedFileProps, UploaderFileState } from '@frontend-shared/padi-ds';

export function Uploader(props: UploaderProps) {
  return <PadiUploader data-padi-ds="Uploader" {...props} />;
}

export function UploadedFile(props: UploadedFileProps) {
  return <PadiUploadedFile data-padi-ds="UploadedFile" {...props} />;
}

export type { UploaderProps, UploadedFileProps, UploaderFileState };
