import type { Meta, StoryFn } from '@storybook/react';

import { Modal, ModalProps } from '.';
import { useState } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Containers/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<ModalProps>;

export default meta;

export const Default: StoryFn<ModalProps> = (args) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className='btn btn-info' onClick={() => setOpen(true)}>
        Open Modal
      </button>
      <Modal {...args} open={open} setOpen={setOpen}>
        <p className='text-lg'>Hello!</p>
      </Modal>
    </>
  );
};

export const TitleAndActions: StoryFn<ModalProps> = (args) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className='btn btn-info' onClick={() => setOpen(true)}>
        Open Modal
      </button>
      <Modal
        title='Title'
        actions={
          <button className='btn btn-outline btn-info normal-case'>Hi</button>
        }
        {...args}
        open={open}
        setOpen={setOpen}
      >
        <p className='text-lg'>Hello!</p>
      </Modal>
    </>
  );
};
