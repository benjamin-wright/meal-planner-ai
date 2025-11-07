import React from 'react';
import { Icon } from './Icon';
import type { IconProps } from './Icon';

export const ItemIcon: React.FC<IconProps> = ({ className }) => (
  <Icon className={className}>
    <path d="M3 3h18v18H3z" />
    <path d="M3 9h18" />
    <path d="M9 21V9" />
  </Icon>
);
