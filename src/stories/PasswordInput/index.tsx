import React, { useState } from 'react';
import { Input, InputProps } from '../Input';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

export type PasswordInputProps = Omit<
  InputProps,
  'type' | 'min' | 'max' | 'step' | 'iconRight'
>;

export const PasswordInput: React.FC<PasswordInputProps> = (
  props: PasswordInputProps,
) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      {...props}
      type={showPassword ? 'text' : 'password'}
      iconRight={
        <label className='swap'>
          <input
            type='checkbox'
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <AiFillEyeInvisible className='swap-on' />
          <AiFillEye className='swap-off' />
        </label>
      }
      iconRightClickable
    />
  );
};
