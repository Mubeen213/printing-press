import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'main' | 'article';
  id?: string;
}

export function Container({ children, className = '', as: Tag = 'div', id }: ContainerProps) {
  return (
    <Tag id={id} className={`mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </Tag>
  );
}

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  bgColor?: 'default' | 'alt' | 'primary' | 'dark';
  id?: string;
}

const bgClasses = {
  default: 'bg-background',
  alt: 'bg-background-alt',
  primary: 'bg-primary-light',
  dark: 'bg-secondary text-white',
};

export function SectionWrapper({
  children,
  className = '',
  bgColor = 'default',
  id,
}: SectionWrapperProps) {
  return (
    <section id={id} className={`py-16 md:py-20 ${bgClasses[bgColor]} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
