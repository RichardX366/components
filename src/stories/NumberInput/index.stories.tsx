import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import { NumberInput, NumberInputProps } from '.';
import { useState } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Inputs/Number Input',
  component: NumberInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<NumberInputProps>;

export default meta;

export const Default: StoryFn<NumberInputProps> = (args) => {
  const [value, setValue] = useState<number | null>(null);
  return <NumberInput {...args} value={value} onChange={setValue} />;
};

export const MoneyWithDetails: StoryFn<NumberInputProps> = (args) => {
  const [value, setValue] = useState<number | null>(null);
  return (
    <NumberInput
      type='money'
      description='Donate this amount of money'
      placeholder='999.99'
      label='Money'
      required
      min={0}
      max={1000}
      {...args}
      value={value}
      onChange={setValue}
    />
  );
};

export const MoneyWithError: StoryFn<NumberInputProps> = (args) => {
  const [value, setValue] = useState<number | null>(null);
  return (
    <NumberInput
      type='money'
      description='Donate this amount of money'
      placeholder='999.99'
      label='Money'
      required
      min={0}
      max={1000}
      error='You do not have this much money'
      {...args}
      value={value}
      onChange={setValue}
    />
  );
};
