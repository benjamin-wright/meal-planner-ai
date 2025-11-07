import React from 'react';
import { Icon } from './Icon';
import type { IconProps } from './Icon';

export const ChevronRightIcon: React.FC<IconProps> = ({ className }) => (
  <Icon className={className}>
    <polyline points="9 18 15 12 9 6" />
  </Icon>
);
