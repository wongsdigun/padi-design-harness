'use client';

import * as React from 'react';
import { Button } from '../Button';

export type UploaderFileState = 'progress' | 'success' | 'failed';

export interface UploaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** @default 'Pilih atau seret file disini' */
  title?: React.ReactNode;

  /** @default 'max. 10 MB' */
  description?: React.ReactNode;

  /** 40px leading slot — Figma's cloud icon. */
  icon?: React.ReactNode;

  /** Text on the picker button. @default 'Pilih File' */
  buttonLabel?: string;

  accept?: string;
  multiple?: boolean;
  disabled?: boolean;

  /** Receives the picked or dropped files. */
  onFiles?: (files: FileList) => void;

  /** File rows — render `<UploadedFile>` here. */
  children?: React.ReactNode;
}

export interface UploadedFileProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** File name — Figma's `Title` (14/21). */
  name: React.ReactNode;

  /** File size — Figma's `Desc` (12/18). */
  size: React.ReactNode;

  /** @default 'success' */
  state?: UploaderFileState;

  /** 0-100, only read when `state` is `progress`. */
  progress?: number;

  /** Replaces the default gallery glyph. Use `--tosca-50` for the Figma colour. */
  icon?: React.ReactNode;

  onRemove?: () => void;
  onRetry?: () => void;

  /** @default 'Hapus' */
  removeLabel?: string;

  /** @default 'Coba lagi' */
  retryLabel?: string;

  /** Shown when `state` is `failed`. @default 'Upload gagal' */
  statusLabel?: string;
}

const CloudPlus = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M7 18a4 4 0 0 1-.6-7.95 5.5 5.5 0 0 1 10.7-.9A4.25 4.25 0 0 1 17 18"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M12 11v7M9.5 13.5L12 11l2.5 2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FileGlyph = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="8.5" cy="10" r="1.5" fill="currentColor" />
    <path d="M4 17l5-4.5 4 3.5 3-2.5 4 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Trash = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M4 6h12M8 6V4.5A1.5 1.5 0 0 1 9.5 3h1A1.5 1.5 0 0 1 12 4.5V6m-6 0l.7 9.1A1.5 1.5 0 0 0 8.2 16.5h3.6a1.5 1.5 0 0 0 1.5-1.4L14 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Refresh = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M16 10a6 6 0 1 1-1.8-4.3M16 3v4h-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CloseX = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M5.5 5.5l9 9M14.5 5.5l-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/**
 * Figma `uploader`: the drop area. The file list is presentational — pass
 * `<UploadedFile>` rows as children and drive them from `onFiles`.
 */
export const Uploader = React.forwardRef<HTMLDivElement, UploaderProps>(
  function Uploader(
    {
      title = 'Pilih atau seret file disini',
      description = 'max. 10 MB',
      icon,
      buttonLabel = 'Pilih File',
      accept,
      multiple,
      disabled,
      onFiles,
      className = '',
      children,
      ...props
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={['ds-uploader', className].filter(Boolean).join(' ')}
        data-disabled={disabled ? '' : undefined}
        {...props}
      >
        <label
          className="ds-uploader__dropzone"
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            if (!disabled && event.dataTransfer.files.length) {
              onFiles?.(event.dataTransfer.files);
            }
          }}
        >
          <span className="ds-uploader__icon" aria-hidden="true">
            {icon ?? <CloudPlus />}
          </span>

          <span className="ds-uploader__text">
            <span className="ds-uploader__title">{title}</span>
            {description ? (
              <span className="ds-uploader__description">{description}</span>
            ) : null}
          </span>

          <Button type="outline" size="sm" disabled={disabled} className="ds-uploader__button">
            {buttonLabel}
          </Button>

          <input
            type="file"
            className="ds-uploader__input"
            accept={accept}
            multiple={multiple}
            disabled={disabled}
            onChange={(event) => {
              if (event.target.files?.length) {
                onFiles?.(event.target.files);
              }
              // Allows re-picking the same file.
              event.target.value = '';
            }}
          />
        </label>

        {children}
      </div>
    );
  }
);

export const UploadedFile = React.forwardRef<HTMLDivElement, UploadedFileProps>(
  function UploadedFile(
    {
      name,
      size,
      state = 'success',
      progress = 0,
      icon,
      onRemove,
      onRetry,
      removeLabel = 'Hapus',
      retryLabel = 'Coba lagi',
      statusLabel = 'Upload gagal',
      className = '',
      ...props
    },
    ref
  ) {
    const percent = Math.min(100, Math.max(0, progress));

    return (
      <div
        ref={ref}
        className={['ds-uploader__file', className].filter(Boolean).join(' ')}
        data-state={state}
        {...props}
      >
        <span className="ds-uploader__file-main">
          <span className="ds-uploader__file-icon" aria-hidden="true">
            {icon ?? <FileGlyph />}
          </span>
          <span className="ds-uploader__file-name">{name}</span>
          <span className="ds-uploader__file-size">{size}</span>
        </span>

        {state === 'progress' ? (
          <span className="ds-uploader__file-progress">
            <span
              className="ds-uploader__progress"
              role="progressbar"
              aria-valuenow={percent}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <span className="ds-uploader__progress-fill" style={{ width: `${percent}%` }} />
            </span>
            <span className="ds-uploader__progress-value">{percent}%</span>
          </span>
        ) : null}

        {state === 'failed' ? (
          <span className="ds-uploader__file-status">{statusLabel}</span>
        ) : null}

        {state === 'progress' && onRemove ? (
          <button type="button" className="ds-uploader__file-action" onClick={onRemove} aria-label={removeLabel}>
            <CloseX />
          </button>
        ) : null}

        {state === 'success' && onRemove ? (
          <button type="button" className="ds-uploader__file-action" onClick={onRemove} aria-label={removeLabel}>
            <Trash />
          </button>
        ) : null}

        {state === 'failed' && onRetry ? (
          <button type="button" className="ds-uploader__file-action" onClick={onRetry} aria-label={retryLabel}>
            <Refresh />
          </button>
        ) : null}
      </div>
    );
  }
);
