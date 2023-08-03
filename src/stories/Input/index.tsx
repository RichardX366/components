import React, { useId, useState } from 'react';
import { AiOutlineLink, AiOutlineSearch, AiFillPhone } from 'react-icons/ai';
import { GrMail } from 'react-icons/gr';

export interface InputProps {
  value: string;
  onChange(value: string): any;
  label?: string;
  placeholder?: string;
  description?: string;
  error?: string;
  type?:
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'month'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';
  min?: number | string;
  max?: number | string;
  step?: number;
  disabled?: boolean;
  autoComplete?:
    | 'off'
    | 'on'
    | 'name'
    | 'honorific-prefix'
    | 'given-name'
    | 'additional-name'
    | 'family-name'
    | 'honorific-suffix'
    | 'nickname'
    | 'email'
    | 'username'
    | 'new-password'
    | 'current-password'
    | 'one-time-code'
    | 'organization-title'
    | 'organization'
    | 'street-address'
    | 'address-line1'
    | 'address-line2'
    | 'address-line3'
    | 'address-level4'
    | 'address-level3'
    | 'address-level2'
    | 'address-level1'
    | 'country'
    | 'country-name'
    | 'postal-code'
    | 'cc-name'
    | 'cc-given-name'
    | 'cc-additional-name'
    | 'cc-family-name'
    | 'cc-number'
    | 'cc-exp'
    | 'cc-exp-month'
    | 'cc-exp-year'
    | 'cc-csc'
    | 'transaction-currency'
    | 'transaction-amount'
    | 'language'
    | 'bday'
    | 'bday-day'
    | 'bday-month'
    | 'bday-year'
    | 'sex'
    | 'url'
    | 'photo';
  maxLength?: number;
  required?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  iconLeftClickable?: boolean;
  iconRightClickable?: boolean;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  label,
  placeholder,
  description,
  error,
  type = 'text',
  min,
  max,
  step,
  disabled,
  autoComplete,
  maxLength,
  required,
  iconLeft,
  iconRight,
  iconLeftClickable,
  iconRightClickable,
}: InputProps) => {
  const id = useId();
  const [focused, setFocused] = useState(false);

  if (type === 'email' && !iconRight) iconRight = <GrMail />;
  if (type === 'search' && !iconRight) iconRight = <AiOutlineSearch />;
  if (type === 'tel' && !iconRight) iconRight = <AiFillPhone />;
  if (type === 'url' && !iconRight) iconRight = <AiOutlineLink />;

  return (
    <div>
      <div
        className={`relative shadow-md rounded-md min-w-[5rem] w-full ${
          error
            ? 'tooltip tooltip-error tooltip-bottom tooltip-open shadow-red-500/50'
            : 'dark:shadow-white/50'
        }`}
        data-tip={error}
      >
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          id={id}
          className={`input py-2 dark:placeholder:text-gray-500 focus:outline-none rounded-md bg-transparent border-t-0 border-2 peer disabled:text-gray-400 disabled:dark:text-gray-500 dark:text-gray-200 w-full disabled:bg-transparent ${
            error
              ? 'border-red-300 dark:border-red-800 focus:border-red-500'
              : 'border-gray-200 dark:border-gray-500 disabled:border-gray-200 disabled:dark:border-gray-500 focus:border-gray-500 focus:dark:border-white'
          } ${iconLeft ? 'pl-11' : ''} ${iconRight ? 'pr-11' : ''}`}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          type={type}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          autoComplete={autoComplete}
          maxLength={maxLength}
          required={required}
        />
        <div
          className={`absolute -z-10 inset-y-0 left-0 rounded-l-md border-t-2  ${
            label ? 'w-2' : 'w-5'
          } ${
            error
              ? 'border-red-300 dark:border-red-800 peer-focus:border-red-500'
              : 'dark:border-gray-500 peer-focus:border-gray-500 peer-focus:dark:border-white'
          }`}
        />
        <div className='absolute -z-10 inset-y-0 left-2 right-0 flex'>
          <label
            htmlFor={id}
            className={`text-sm flex gap-1 relative -top-2.5 px-1 font-medium ${
              focused
                ? 'text-black dark:text-white'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {label} {required && <span className='text-red-600'>*</span>}
          </label>
          <div
            className={`rounded-r-md border-t-2 h-full w-full ${
              error
                ? focused
                  ? 'border-red-500'
                  : 'border-red-300 dark:border-red-800'
                : focused
                ? 'border-gray-500 dark:border-white'
                : 'dark:border-gray-500'
            }`}
          />
        </div>
        <div
          className={`absolute inset-y-4 left-4 text-gray-500 dark:text-gray-400 ${
            iconLeftClickable ? 'cursor-pointer' : 'pointer-events-none'
          }`}
        >
          {iconLeft}
        </div>
        <div
          className={`absolute inset-y-4 right-4 text-gray-500 dark:text-gray-400 ${
            iconRightClickable ? 'cursor-pointer' : 'pointer-events-none'
          }`}
        >
          {iconRight}
        </div>
      </div>
      {description && (
        <p className='text-sm pt-2 text-gray-500 dark:text-gray-400 select-none'>
          {description}
        </p>
      )}
    </div>
  );
};
