import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import { Range, RangeProps } from '.';
import { useState } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Inputs/Range',
  component: Range,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<RangeProps>;

export default meta;

export const Default: StoryFn<RangeProps> = (args: any) => {
  const [value, setValue] = useState(50);

  return (
    <Range min={0} max={100} {...args} value={value} onChange={setValue} />
  );
};

export const WithDetails: StoryFn<RangeProps> = (args: any) => {
  const [value, setValue] = useState(50);

  return (
    <Range
      description='Put in your volume'
      label='Volume'
      required
      min={0}
      max={100}
      {...args}
      value={value}
      onChange={setValue}
    />
  );
};

export const WithError: StoryFn<RangeProps> = (args: any) => {
  const [value, setValue] = useState(50);

  return (
    <Range
      error='This is an error'
      description='Put in your volume'
      label='Volume'
      required
      min={0}
      max={100}
      {...args}
      value={value}
      onChange={setValue}
    />
  );
};

export const Disabled: StoryFn<RangeProps> = (args: any) => {
  const [value, setValue] = useState(50);

  return (
    <Range
      description='Put in your volume'
      label='Volume'
      required
      min={0}
      max={100}
      disabled
      {...args}
      value={value}
      onChange={setValue}
    />
  );
};
