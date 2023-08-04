import React from 'react';
import { Input, InputProps } from '../Input';
import { FiUpload } from 'react-icons/fi';
import { error } from '../Notification';
import { formatFileSize, mimeAcceptable } from '../Formatting';

interface FileInputPropsBase
  extends Omit<
    InputProps,
    | 'type'
    | 'autoComplete'
    | 'maxLength'
    | 'min'
    | 'max'
    | 'step'
    | 'value'
    | 'onChange'
    | 'multiple'
    | 'placeholder'
  > {
  maxSize?: number; // in bytes
}

export interface FileInputSingleProps extends FileInputPropsBase {
  onChange(value: File | null, event: React.ChangeEvent<HTMLInputElement>): any;
  multiple?: false;
}
export interface FileInputMultipleProps extends FileInputPropsBase {
  onChange(value: File[], event: React.ChangeEvent<HTMLInputElement>): any;
  multiple: true;
}

/**
 * Note: the maxSize attribute is in bytes per file.
 */
export function FileInput(props: FileInputSingleProps): React.ReactElement;
export function FileInput(props: FileInputMultipleProps): React.ReactElement;
export function FileInput(
  props: FileInputSingleProps | FileInputMultipleProps,
): React.ReactElement {
  let { onChange, iconRight, multiple, maxSize, accept } = props;

  if (!iconRight) iconRight = <FiUpload />;

  const handleNewValue = (
    fileList: FileList | null,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!fileList || !fileList.length) {
      if (multiple) return onChange([] as any, event);
      return onChange(null as any, event);
    }

    const files = Array.from(fileList);

    if (maxSize && files.find(({ size }) => size > (maxSize as number))) {
      event.target.value = '';
      return error(`File size must be less than ${formatFileSize(maxSize)}.`);
    }

    if (accept && accept.length) {
      const offendingFiles = files
        .filter(({ type }) => !mimeAcceptable(accept as string[], type))
        .map(({ name }) => name);
      if (offendingFiles.length) {
        event.target.value = '';
        return error(
          `${offendingFiles.join(', ')} ${
            offendingFiles.length === 1 ? 'is' : 'are'
          } not one of the following: ${accept
            .join(', ')
            .replaceAll('/*', '')}.`,
        );
      }
    }

    if (multiple) return onChange(files as any, event);
    return onChange(files[0] as any, event);
  };

  return (
    <Input
      {...props}
      value={undefined as any}
      onChange={handleNewValue as any}
      type={'file' as any}
      iconRight={iconRight}
      placeholder='No file chosen'
    />
  );
}
