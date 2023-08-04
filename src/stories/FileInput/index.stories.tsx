import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import { FileInput, FileInputSingleProps, FileInputMultipleProps } from '.';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Inputs/File Input',
  component: FileInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<FileInputSingleProps | FileInputMultipleProps>;

export default meta;

export const Single: StoryFn<FileInputSingleProps> = (args) => {
  return <FileInput {...args} onChange={console.log} />;
};

export const Multiple: StoryFn<FileInputMultipleProps> = (args) => {
  return <FileInput {...args} multiple onChange={console.log} />;
};

export const SingleWithDetails: StoryFn<FileInputSingleProps> = (args) => {
  return (
    <FileInput
      description='This only accepts images with a max size of 500 KB.'
      label='File'
      required
      maxSize={500e3}
      accept={['image/*']}
      {...args}
      onChange={console.log}
    />
  );
};

export const SingleWithError: StoryFn<FileInputSingleProps> = (args) => {
  return (
    <FileInput
      description='This only accepts images with a max size of 500 KB.'
      label='File'
      required
      maxSize={500e3}
      accept={['image/*']}
      error='Your file sucks.'
      {...args}
      onChange={console.log}
    />
  );
};

export const SingleAndDisabled: StoryFn<FileInputSingleProps> = (args) => {
  return <FileInput disabled {...args} onChange={console.log} />;
};
