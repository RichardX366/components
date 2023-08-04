import React, { useState } from 'react';
import {
  FileInput,
  FileInputMultipleProps,
  FileInputSingleProps,
} from '../FileInput';
import type Compressor from 'compressorjs';
import { error } from '../Notification';
import { formatFileSize, mimeAcceptable } from '../Formatting';

export interface MediaFile {
  blob: Blob;
  url: string;
}

export interface MediaInputSingleProps
  extends Omit<FileInputSingleProps, 'onChange' | 'accept'> {
  onChange(value: MediaFile | null): any;
  allowVideo?: boolean;
  dimensions?: 'round' | { width: number; height: number };
  multiple?: false;
}
export interface MediaInputMultipleProps
  extends Omit<FileInputMultipleProps, 'onChange' | 'accept'> {
  onChange(value: MediaFile[]): any;
  allowVideo?: boolean;
  dimensions?: 'round' | { width: number; height: number };
  multiple: true;
}

const compressImage = (
  file: Blob,
  options?: Compressor.Options,
): Promise<Blob> =>
  new Promise(
    async (res, rej) =>
      new (await import('compressorjs')).default(file, {
        ...options,
        quality: 0.3,
        strict: false,
        resize: 'cover',
        success: res as (file: Blob) => void,
        error: rej,
      }),
  );

const compressGif = async (
  file: Blob,
  size?: { width: number; height: number },
): Promise<Blob> => {
  // @ts-ignore
  const gifsicle = (await import('gifsicle-wasm-browser')).default;
  const url = URL.createObjectURL(file);
  const result = await gifsicle.run({
    input: [
      {
        file: url,
        name: '1.gif',
      },
    ],
    command: [
      `${
        size ? `--resize-touch ${size.width}x${size.height}` : ''
      } --lossy=500 -O3 1.gif -o /out/out.gif`,
    ],
  });
  URL.revokeObjectURL(url);
  return result[0];
};

const compressHeic = async (file: Blob): Promise<Blob> => {
  const result = await (
    await import('heic2any')
  ).default({
    blob: file,
    toType: 'image/jpeg',
    quality: 0.5,
  });
  return result as Blob;
};

/**
 * Note: the maxSize attribute is in bytes per file.
 */
export function MediaInput(props: MediaInputSingleProps): React.ReactElement;
export function MediaInput(props: MediaInputMultipleProps): React.ReactElement;
export function MediaInput(
  props: MediaInputSingleProps | MediaInputMultipleProps,
): React.ReactElement {
  let { onChange, multiple, maxSize, allowVideo, dimensions } = props;

  const accept = allowVideo
    ? ['image/*', 'image/heic', 'video/*']
    : ['image/*', 'image/heic'];

  const [urls, setUrls] = useState<string[]>([]);

  const handleNewValue = async (
    files: File[] | File | null,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!files || (Array.isArray(files) && !files.length)) {
      urls.forEach(URL.revokeObjectURL);
      setUrls([]);
      if (multiple) return onChange([] as any);
      return onChange(null as any);
    }

    if (files instanceof File) files = [files];

    const newFiles = await Promise.all(
      files.map(async (file) => {
        if (!mimeAcceptable(accept, file.type)) {
          event.target.value = '';
          error(
            `${file.name} is not one of the following: ${accept
              .join(', ')
              .replaceAll('/*', '')}.`,
          );
          return;
        }

        let newFile = file as Blob;
        if (file.type === 'image/gif') {
          newFile = await compressGif(
            file,
            dimensions === 'round' ? { width: 512, height: 512 } : dimensions,
          );
        } else if (file.type.includes('image/heic')) {
          newFile = await compressImage(
            await compressHeic(file),
            dimensions === 'round'
              ? {
                  width: 512,
                  height: 512,
                }
              : dimensions,
          );
        } else if (file.type.includes('image')) {
          newFile = await compressImage(
            file,
            dimensions === 'round'
              ? {
                  width: 512,
                  height: 512,
                }
              : dimensions,
          );
        } else {
          newFile = file;
        }

        if (newFile.size > file.size) newFile = file;
        if (maxSize && newFile.size > maxSize) {
          event.target.value = '';
          error(`File size must be less than ${formatFileSize(maxSize)}.`);
          return;
        }
        return newFile;
      }),
    );
    if (newFiles.findIndex((file) => !file) !== -1) return;

    urls.forEach((url) => URL.revokeObjectURL(url));
    const newValue: MediaFile[] = newFiles.map((file) => ({
      blob: file as Blob,
      url: URL.createObjectURL(file as Blob),
    }));
    setUrls(newValue.map(({ url }) => url));

    if (multiple) return onChange(newValue as any);
    return onChange(newValue[0] as any);
  };

  return (
    <FileInput
      {...(props as any)}
      maxSize={undefined}
      onChange={handleNewValue as any}
      accept={accept}
    />
  );
}
