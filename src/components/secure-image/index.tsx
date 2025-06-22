'use client';

import Image from 'next/image';
import type { ComponentProps, FC, MouseEvent } from 'react';
import clsx from 'clsx';

type SecureImageProps = ComponentProps<'img'> & {
  alt: string;
  height: number;
  src: string;
  width: number;
};

const SecureImage: FC<SecureImageProps> = ({
  className,
  alt,
  height,
  src,
  width,
  ...props
}) => {
  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
  };

  return (
    <Image
      alt={alt}
      height={height}
      src={src}
      width={width}
      draggable="false"
      className={clsx('pointer-events-none select-none', className)}
      onContextMenu={handleContextMenu}
      style={{
        WebkitTouchCallout: 'none',
      }}
      unoptimized
      {...props}
    />
  );
};

export default SecureImage;
