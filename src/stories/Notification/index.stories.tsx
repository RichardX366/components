import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import {
  Notifications,
  NotificationProps,
  error,
  success,
  warn,
  info,
} from '.';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Data Display/Notification',
  component: Notifications,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<NotificationProps>;

export default meta;

export const Default: StoryFn<NotificationProps> = (args) => {
  return (
    <div className='flex flex-col'>
      <button
        className='btn btn-error'
        onClick={() =>
          error(
            'Error Error Error Error Error Error Error Error Error Error Error Error Error Error Error Error Error Error Error Error Error Error Error Error Error Error Error',
          )
        }
      >
        Error
      </button>
      <button className='btn btn-success' onClick={() => success('Success')}>
        Success
      </button>
      <button className='btn btn-warning' onClick={() => warn('Warning')}>
        Warning
      </button>
      <button className='btn btn-info' onClick={() => info('Info')}>
        Info
      </button>
      <Notifications {...args} />
    </div>
  );
};
