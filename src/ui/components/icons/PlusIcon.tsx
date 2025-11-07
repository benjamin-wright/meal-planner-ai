import React from 'react';
import { Icon, type IconProps } from './Icon';

export const PlusIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <Icon className={className}>
      <path d="M12 5v14m7-7H5" />
    </Icon>
  );
};
