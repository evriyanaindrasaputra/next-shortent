import * as React from 'react';

export type LayoutRootProps = React.ComponentPropsWithoutRef<'div'>;

export const LayoutRoot = React.forwardRef<HTMLDivElement, LayoutRootProps>(
  ({ style, children, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className='flex flex-col w-full min-h-screen bg-gray-800'
        style={style}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

LayoutRoot.displayName = 'LayoutRoot';
