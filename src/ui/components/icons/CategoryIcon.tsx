import React from 'react';
import { Icon } from './Icon';
import type { IconProps } from './Icon';

export const CategoryIcon: React.FC<IconProps> = ({ className }) => (
  <Icon className={className}>
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </Icon>
);
