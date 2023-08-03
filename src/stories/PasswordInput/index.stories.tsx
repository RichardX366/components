import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import { PasswordInput, PasswordInputProps } from '.';
import { useState } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Inputs/Password Input',
  component: PasswordInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<PasswordInputProps>;

export default meta;

export const Default: StoryFn<PasswordInputProps> = (args) => {
  const [value, setValue] = useState('');
  return <PasswordInput {...args} value={value} onChange={setValue} />;
};

export const WithDetails: StoryFn<PasswordInputProps> = (args) => {
  const [value, setValue] = useState('');

  return (
    <PasswordInput
      autoComplete='current-password'
      description='Put in your current password (30 characters max)'
      placeholder='Password123'
      label='Password'
      required
      maxLength={30}
      {...args}
      value={value}
      onChange={setValue}
    />
  );
};

export const WithError: StoryFn<PasswordInputProps> = (args) => {
  const [value, setValue] = useState('');

  return (
    <PasswordInput
      autoComplete='current-password'
      description='Put in your current password (30 characters max)'
      placeholder='Password123'
      label='Password'
      required
      maxLength={30}
      error='Incorrect password'
      {...args}
      value={value}
      onChange={setValue}
    />
  );
};
