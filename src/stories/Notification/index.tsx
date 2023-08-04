import React from 'react';
import { createState, useHookstate, none } from '@hookstate/core';
import { nanoid } from 'nanoid';
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineInfoCircle,
} from 'react-icons/ai';
import { BsExclamationTriangle } from 'react-icons/bs';

interface Notification {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  id: string;
  startedTimeout: boolean;
  duration: number;
}

const notificationTypeToClass = {
  success: 'alert-success',
  error: 'alert-error',
  warning: 'alert-warning',
  info: 'alert-info',
};

const notificationTypeToIcon = {
  success: AiOutlineCheckCircle,
  error: AiOutlineCloseCircle,
  warning: BsExclamationTriangle,
  info: AiOutlineInfoCircle,
};

const globalNotifications = createState<Notification[]>([]);

export interface NotificationProps {
  className?: string;
}

export const Notifications: React.FC<NotificationProps> = ({
  className = '',
}) => {
  const notifications = useHookstate(globalNotifications);
  notifications.forEach((notification) => {
    const { duration, startedTimeout, id } = notification.value;
    if (!startedTimeout) {
      setTimeout(() => close(id), duration);
      notification.startedTimeout.set(true);
    }
  });

  const close = (id: string) => {
    const div = document.getElementById(id);
    if (!div || div.style.animation) return;
    div.style.height = `${div.offsetHeight}px`;
    div.style.animation = 'close .3s linear forwards';
    setTimeout(
      () => notifications.find((n) => n.value.id === id)?.set(none),
      300,
    );
  };

  return (
    <div className={`toast toast-top toast-end whitespace-normal ${className}`}>
      {notifications.value.map(({ message, id, type }) => {
        const Icon = notificationTypeToIcon[type];
        return (
          <div
            key={id}
            id={id}
            className={`alert overflow-hidden select-none flex md:w-96 cursor-pointer ${notificationTypeToClass[type]} shadow-md dark:shadow-white/20`}
            onClick={() => close(id)}
          >
            <div className='w-5 h-5'>
              <Icon className='w-5 h-5' />
            </div>
            <span className='break-words'>{message}</span>
          </div>
        );
      })}
    </div>
  );
};

export const error = (message: any, duration = 5000) => {
  console.trace(message);
  globalNotifications.merge([
    {
      type: 'error',
      message:
        (typeof message === 'string' ? message : message?.message) ||
        message?.toString() ||
        'An error occurred',
      id: nanoid(),
      startedTimeout: false,
      duration,
    },
  ]);
};

export const success = (message: string, duration = 5000) =>
  globalNotifications.merge([
    {
      type: 'success',
      message,
      id: nanoid(),
      startedTimeout: false,
      duration,
    },
  ]);

export const warn = (message: string, duration = 5000) =>
  globalNotifications.merge([
    {
      type: 'warning',
      message,
      id: nanoid(),
      startedTimeout: false,
      duration,
    },
  ]);

export const info = (message: string, duration = 5000) =>
  globalNotifications.merge([
    {
      type: 'info',
      message,
      id: nanoid(),
      startedTimeout: false,
      duration,
    },
  ]);
