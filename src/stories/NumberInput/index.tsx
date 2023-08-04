import React, { useState } from 'react';
import { Input, InputProps } from '../Input';
import { BiDollar } from 'react-icons/bi';

export interface NumberInputProps
  extends Omit<
    InputProps,
    'type' | 'autoComplete' | 'maxLength' | 'min' | 'max' | 'value' | 'onChange'
  > {
  type?: 'number' | 'money';
  maxDecimalPlaces?: number;
  min?: number;
  max?: number;
  value: number | null;
  onChange(value: number | null): any;
}

export const NumberInput: React.FC<NumberInputProps> = (
  props: NumberInputProps,
) => {
  let {
    value,
    onChange,
    type = 'number',
    maxDecimalPlaces,
    min,
    max,
    iconLeft,
  } = props;
  const [stringValue, setStringValue] = useState(value?.toString() || '');

  if (value === null) {
    if (stringValue !== '') setStringValue('');
  } else if (+stringValue !== value) setStringValue(value.toString());
  if (type === 'money' && maxDecimalPlaces === undefined) maxDecimalPlaces = 2;
  if (type === 'money' && !iconLeft) iconLeft = <BiDollar />;

  const handleNewValue = (newValue: string) => {
    if (min !== undefined && +newValue < min) return;
    if (max !== undefined && +newValue > max) return;
    if (
      maxDecimalPlaces !== undefined &&
      maxDecimalPlaces > -1 &&
      Math.floor(maxDecimalPlaces) === maxDecimalPlaces &&
      ((+newValue).toString().split('.')[1] || '').length > maxDecimalPlaces
    ) {
      return;
    }

    setStringValue(newValue);
    onChange(newValue === '' ? null : +newValue);
  };

  return (
    <Input
      {...props}
      value={stringValue}
      onChange={handleNewValue}
      type={'number' as any}
      iconLeft={iconLeft}
    />
  );
};
