import React, { useId } from 'react';

export interface RangeProps {
  value: number;
  onChange(value: number, event: React.ChangeEvent<HTMLInputElement>): any;
  label?: string;
  description?: string;
  error?: string;
  min: number;
  max: number;
  step?: number;
  disabled?: boolean;
  required?: boolean;
}

export const Range: React.FC<RangeProps> = ({
  value,
  onChange,
  label,
  description,
  error,
  min,
  max,
  step,
  disabled,
  required,
}) => {
  const id = useId();

  return (
    <div
      className={
        error
          ? 'tooltip tooltip-error tooltip-bottom tooltip-open text-left'
          : ''
      }
      data-tip={error}
    >
      <label htmlFor={id} className='label p-0 gap-1 justify-start'>
        {label} {required && <span className='text-red-500'>*</span>}
      </label>
      <p className='text-sm pb-2'>{description}</p>
      <input
        id={id}
        type='range'
        min={min}
        max={max}
        step={step}
        required={required}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(+e.target.value, e)}
        className={`range ${error ? 'range-error' : ''}`}
      />
    </div>
  );
};
