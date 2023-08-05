import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import { Select, SelectItem, SelectProps } from '.';
import { useState } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Inputs/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<SelectProps>;

export default meta;

const data = new Array(10).fill(0).map((_, i) => ({
  label: `Option ${i + 1}`,
  value: `${i + 1}`,
}));

export const Default: StoryFn<SelectProps> = (args) => {
  const [value, setValue] = useState<SelectItem | null>(null);

  return (
    <Select
      placeholder='Select an option'
      {...args}
      data={data}
      value={value}
      onChange={setValue}
    />
  );
};

export const WithDetails: StoryFn<SelectProps> = (args) => {
  const [value, setValue] = useState<SelectItem | null>(null);

  return (
    <Select
      description='Pick one'
      placeholder='Select an option'
      label='Select'
      required
      {...args}
      data={data}
      value={value}
      onChange={setValue}
    />
  );
};

export const WithError: StoryFn<SelectProps> = (args) => {
  const [value, setValue] = useState<SelectItem | null>(null);

  return (
    <Select
      description='Pick one'
      placeholder='Select an option'
      label='Select'
      required
      error='You picked wrong'
      {...args}
      data={data}
      value={value}
      onChange={setValue}
    />
  );
};

export const Disabled: StoryFn<SelectProps> = (args) => {
  const [value, setValue] = useState<SelectItem>({
    label: 'Option 1',
    value: '1',
  });

  return (
    <Select disabled {...args} data={data} value={value} onChange={setValue} />
  );
};
