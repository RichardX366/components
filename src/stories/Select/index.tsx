import React, { useId, useState } from 'react';

export interface SelectItem {
  label: string;
  value: string;
}

export interface SelectProps {
  value: string | null;
  onChange(value: SelectItem, event: React.ChangeEvent<HTMLSelectElement>): any;
  label?: string;
  placeholder?: string;
  description?: string;
  error?: string;
  required?: boolean;
  data: SelectItem[];
  disabled?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  label,
  placeholder,
  description,
  error,
  required,
  data,
  disabled,
}) => {
  const id = useId();
  const [focused, setFocused] = useState(false);

  return (
    <div>
      <div
        className={`relative rounded-md min-w-[5rem] w-full ${
          error ? 'tooltip tooltip-error tooltip-bottom tooltip-open' : ''
        }`}
        data-tip={error}
      >
        <select
          value={value || (value === null ? 'null' : '')}
          onChange={(e) =>
            onChange(data.find((d) => d.value === e.target.value)!, e)
          }
          id={id}
          className={`select font-normal shadow-md transition-shadow py-3 focus:outline-none rounded-md border-t-0 border peer disabled:text-gray-400 disabled:dark:text-gray-500 w-full min-w-[calc(100%-1rem)] ${
            error
              ? 'border-red-300 dark:border-red-800 focus:border-red-500 shadow-red-500/50 hover:shadow-red-500'
              : 'border-gray-300 dark:border-gray-500 disabled:border-gray-300 disabled:dark:border-gray-500 focus:border-gray-500 focus:dark:border-white shadow-black/10 dark:shadow-white/20 hover:shadow-black/40 hover:dark:shadow-white/70 disabled:hover:shadow-black/10 disabled:hover:dark:shadow-white/20'
          } ${
            value === null
              ? 'text-gray-400 dark:text-gray-500'
              : 'dark:text-gray-200'
          }`}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
        >
          {placeholder && (
            <option value='null' disabled>
              {placeholder}
            </option>
          )}
          {data.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <div
          className={`absolute inset-y-0 pointer-events-none left-0 rounded-l-md border-t  ${
            label ? 'w-2' : 'w-5'
          } ${
            error
              ? 'border-red-300 dark:border-red-800 peer-focus:border-red-500'
              : 'border-gray-300 dark:border-gray-500 peer-focus:border-gray-500 peer-focus:dark:border-white'
          }`}
        />
        <div className='absolute pointer-events-none inset-y-0 left-2 right-0 flex'>
          <label
            htmlFor={id}
            className={`text-sm flex gap-1 relative -top-2.5 px-1 whitespace-nowrap ${
              focused
                ? 'text-black dark:text-white'
                : 'text-gray-500 dark:text-gray-300/80'
            }`}
          >
            {label} {required && <span className='text-red-600'>*</span>}
          </label>
          <div
            className={`rounded-r-md border-t h-full w-full ${
              error
                ? focused
                  ? 'border-red-500'
                  : 'border-red-300 dark:border-red-800'
                : focused
                ? 'border-gray-500 dark:border-white'
                : 'border-gray-300 dark:border-gray-500'
            }`}
          />
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
