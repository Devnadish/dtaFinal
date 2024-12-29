import React from 'react';
import { Icon as IconifyIcon } from '@iconify/react';

interface IconProps {
  icon: string;
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const Icon: React.FC<IconProps> = ({ icon, className, width, height }) => {
  return (
    <IconifyIcon
      icon={icon}
      className={className}
      width={width}
      height={height}
    />
  );
};