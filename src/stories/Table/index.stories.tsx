import type { Meta, StoryFn } from '@storybook/react';

import { Column, Table, TableProps } from '.';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Data Display/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<TableProps>;

export default meta;

const sampleColumns: Column[] = [
  { key: 'n', title: '' },
  'name',
  'job',
  'favoriteColor',
];

const sampleData = [
  { n: 1, name: 'John', job: 'Developer', favoriteColor: 'Blue' },
  { n: 2, name: 'Jane', job: 'Designer', favoriteColor: 'Red' },
  { n: 3, name: 'Susan', job: 'Manager', favoriteColor: 'Green' },
];

export const Default: StoryFn<TableProps> = (args) => {
  return <Table {...args} data={sampleData} columns={sampleColumns} />;
};
