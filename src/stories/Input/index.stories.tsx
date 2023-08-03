import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import { Input, InputProps } from '.';
import { useState } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Inputs/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<InputProps>;

export default meta;

export const Default: StoryFn<InputProps> = (args) => {
  const [value, setValue] = useState('');

  return <Input {...args} value={value} onChange={setValue} />;
};

export const EmailWithDetails: StoryFn<InputProps> = (args) => {
  const [value, setValue] = useState('');

  return (
    <Input
      type='email'
      autoComplete='email'
      description='Put in your email (30 characters max)'
      placeholder='johndoe24@gmail.com'
      label='Email'
      required
      maxLength={30}
      {...args}
      value={value}
      onChange={setValue}
    />
  );
};

export const EmailWithError: StoryFn<InputProps> = (args) => {
  const [value, setValue] = useState('');

  return (
    <Input
      type='email'
      autoComplete='email'
      description='Put in your email (30 characters max)'
      placeholder='johndoe24@gmail.com'
      label='Email'
      required
      maxLength={30}
      error='This email is already in use'
      {...args}
      value={value}
      onChange={setValue}
    />
  );
};

export const Disabled: StoryFn<InputProps> = (args) => {
  const [value, setValue] = useState('value');

  return <Input disabled {...args} value={value} onChange={setValue} />;
};
