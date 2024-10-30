import React from 'react';

import clsx from 'clsx';
import { ButtonProps } from './Button';
import { Loader } from 'lucide-react';

type OutlinedButtonProps = ButtonProps;

const OutlinedButton: React.FC<OutlinedButtonProps> = ({
  color = 'primary',
  icon,
  endIcon,
  full,
  roundedFull,
  children,
  size = 'normal',
  extraPadding,
  loading,
  ...props
}) => {
  return (
    <button
      className={clsx(
        'flex items-center justify-center text-sm font-medium shadow-md hover:shadow-lg lg:text-base  ',
        color === 'special' ? 'border' : 'border-2',
        size === 'small' && color !== 'special' && 'py-0 shadow-none',
        size === 'normal' && color !== 'special' && 'py-2',
        size === 'large' && color !== 'special' && 'py-4',

        !!icon || !!endIcon ? 'flex' : 'inline-flex',

        extraPadding && color !== 'special' && size === 'small' && 'px-4',
        extraPadding && color !== 'special' && size === 'normal' && 'px-6',
        extraPadding && color !== 'special' && size === 'large' && 'px-8',
        !extraPadding && color !== 'special' && size === 'small' && 'px-2',
        !extraPadding && color !== 'special' && size === 'normal' && 'px-4',
        !extraPadding && color !== 'special' && size === 'large' && 'px-6',


        color === 'primary' && `text-blue-500 border-blue-500`,
        color === 'secondary' && `text-orange-400 border-orange-400`,

        full && 'h-full w-full',
        roundedFull && 'rounded-full',
        !roundedFull && 'rounded-md'
      )}
      {...props}
    >
      {!!icon && <div className="mr-1">{icon}</div>}

      <div className={clsx(color === 'special' && 'flex h-full w-full items-center rounded bg-white py-2 px-4')}>
        {children}
      </div>

      {loading && (
        <div className="ml-1">
           <Loader className="w-6 h-6 animate-spin" />
        </div>
      )}
    </button>
  );
};

export default OutlinedButton;
