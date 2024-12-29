import { ComponentPropsWithoutRef, ElementType, FC, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TypographyProps<T extends ElementType> {
  children: ReactNode;
  as?: T;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  className?: string;
  locale?: string;
  props?: ComponentPropsWithoutRef<T>;
}

const Text = <T extends ElementType = 'p'>({
  children,
  as,
  variant = 'p',
  className,
  locale = 'en',
  ...props
}: TypographyProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>) => {
  const getFontFamily = () => {
    return locale === 'ar' ? 'tajawalLight' : 'Geist';
  };

  const variants = {
    h1: 'text-4xl font-bold',
    h2: 'text-3xl font-bold',
    h3: 'text-2xl font-bold',
    h4: 'text-xl font-bold',
    h5: 'text-lg font-bold',
    h6: 'text-base font-bold',
    p: 'text-base',
    span: 'text-base',
  };

  const Component = as || variant;
  const fontFamily = getFontFamily();

  return (
    <Component 
      className={cn(
        variants[variant],
        `font-${fontFamily}`,
        className
      )}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Text;