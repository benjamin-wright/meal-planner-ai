import React from 'react';
import { Icon, type IconProps } from './Icon';

export const AlertIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <Icon className={className}>
      <path d="M12 9v4m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
    </Icon>
  );
};
