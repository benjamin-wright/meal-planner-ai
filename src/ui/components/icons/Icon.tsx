import React from 'react';

/**
 * Props for icon components
 */
export interface IconProps {
  className?: string;
}

/**
 * Base icon component that provides consistent SVG wrapper for all icons.
 * This component is internal and should not be exported from the icons module.
 * 
 * @internal
 */
interface BaseIconProps extends IconProps {
  children: React.ReactNode;
}

/**
 * Base SVG wrapper component for all icons.
 * Provides consistent size, viewBox, stroke attributes, and accessibility.
 * 
 * @internal
 */
export const Icon: React.FC<BaseIconProps> = ({ className, children }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);
