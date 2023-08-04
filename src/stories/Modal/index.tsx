import React from 'react';
import { useDebouncedValue, useHotkeys } from '@mantine/hooks';

export interface ModalProps {
  stayMounted?: boolean;
  title?: React.ReactNode;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const Modal: React.FC<ModalProps> = ({
  stayMounted,
  title,
  children,
  actions,
  open,
  setOpen,
}) => {
  useHotkeys([['escape', () => setOpen(false)]]);
  const [debouncedOpen] = useDebouncedValue(open, 300);
  const [instantOpen] = useDebouncedValue(open, 0);

  return stayMounted || open || debouncedOpen ? (
    <dialog className='modal' open={instantOpen}>
      <div className='modal-box md:min-w-[32rem] md:max-w-[92%] md:w-auto'>
        {title && <h3 className='font-bold text-2xl mb-6'>{title}</h3>}
        {children}
        {actions && <div className='modal-action'>{actions}</div>}
      </div>
      <div className='modal-backdrop bg-gray-800/20 dark:bg-gray-500/20'>
        <button className='cursor-default' onClick={() => setOpen(false)}>
          close
        </button>
      </div>
    </dialog>
  ) : (
    <></>
  );
};
