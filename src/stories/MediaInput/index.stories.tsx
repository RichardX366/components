import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import { MediaInput, MediaInputSingleProps, MediaInputMultipleProps } from '.';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Inputs/Media Input',
  component: MediaInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<MediaInputSingleProps | MediaInputMultipleProps>;

export default meta;

export const Single: StoryFn<MediaInputSingleProps> = (args) => {
  return <MediaInput {...args} onChange={console.log} />;
};

export const Multiple: StoryFn<MediaInputMultipleProps> = (args) => {
  return <MediaInput {...args} multiple onChange={console.log} />;
};

export const SingleWithDetails: StoryFn<MediaInputSingleProps> = (args) => {
  return (
    <MediaInput
      description='This only accepts images and videos which compress to a max size of 500 KB.'
      label='Media'
      required
      allowVideo
      maxSize={500e3}
      {...args}
      onChange={console.log}
    />
  );
};

export const SingleWithRound: StoryFn<MediaInputSingleProps> = (args) => {
  return (
    <MediaInput
      description='This only accepts images which compress to a max size of 500 KB. It makes them round too.'
      label='Media'
      required
      maxSize={500e3}
      dimensions='round'
      {...args}
      onChange={console.log}
    />
  );
};

export const SingleWithError: StoryFn<MediaInputSingleProps> = (args) => {
  return (
    <MediaInput
      description='This only accepts images which compress to a max size of 500 KB.'
      label='Media'
      required
      maxSize={500e3}
      error='Your media sucks.'
      {...args}
      onChange={console.log}
    />
  );
};

export const SingleAndDisabled: StoryFn<MediaInputSingleProps> = (args) => {
  return <MediaInput disabled {...args} onChange={console.log} />;
};
