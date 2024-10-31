import React from 'react';

import clsx from 'clsx';
import { ButtonProps } from './Button';
import { Loader } from 'lucide-react';

type ContainedButtonProps = ButtonProps;

const ContainedButton: React.FC<ContainedButtonProps> = ({
  color = 'primary',
  children,
  extraPadding,
  icon,
  endIcon,
  full,
  loading,
  size = 'normal',
  roundedFull,
  disabled,
  centerText,
  shadowDisabled,
  ...props
}) => {
  return (
    <button
      className={clsx(
        'items-center hover:shadow-lg',
        !!icon || !!endIcon ? 'flex' : 'inline-flex',
        !shadowDisabled && 'shadow-md',
        centerText && 'justify-center text-center',
        size === 'small' && 'py-1 text-sm',
        size === 'normal' && 'text-normal py-2',
        size === 'medium' && 'flex items-center justify-center py-3 text-base',
        size === 'large' && 'flex w-full items-center justify-center py-4 text-lg',
        extraPadding && size === 'small' && 'px-4',
        extraPadding && size === 'normal' && 'px-6',
        extraPadding && size === 'medium' && 'px-6',
        extraPadding && size === 'large' && 'px-8',
        !extraPadding && size === 'small' && 'px-2',
        !extraPadding && size === 'normal' && 'px-4',
        !extraPadding && size === 'medium' && 'px-5',
        !extraPadding && size === 'large' && 'px-6',
        color === 'primary' && !disabled && "text-white bg-blue-700",
        color === 'secondary' && "text-white bg-blue-700",
        full && 'h-full w-full',
        roundedFull && 'rounded-full',
        !roundedFull && 'rounded-lg',
        disabled && 'cursor-not-allowed bg-gray-300 text-white',
        loading && 'bg-opacity-75'
      )}
      {...props}
    >
      {icon && <div className="mr-1">{icon}</div>}

      {children}

      {endIcon && !loading && <div className="ml-1">{endIcon}</div>}

      {loading && (
        <div className="ml-1">
          <Loader className="w-6 h-6 animate-spin" />
        </div>
      )}
    </button>
  );
};

export default ContainedButton;
