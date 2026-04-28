import { type ButtonHTMLAttributes, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  icon?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
}

type ButtonProps =
  | (ButtonBaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & { to?: undefined; href?: undefined; external?: undefined })
  | (ButtonBaseProps & Omit<LinkProps, 'className' | 'type'> & { to: string; href?: undefined; external?: undefined })
  | (ButtonBaseProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'type'> & { href: string; to?: undefined; external?: boolean });

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-hover shadow-button active:scale-[0.98]',
  secondary:
    'bg-secondary text-white hover:bg-secondary-hover shadow-button active:scale-[0.98]',
  outline:
    'border-2 border-primary text-primary hover:bg-primary hover:text-white active:scale-[0.98]',
  ghost:
    'text-text-secondary hover:bg-surface-alt hover:text-text active:scale-[0.98]',
  whatsapp:
    'bg-whatsapp text-white hover:bg-whatsapp-hover shadow-button active:scale-[0.98]',
  danger:
    'bg-error text-white hover:bg-red-700 shadow-button active:scale-[0.98]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-7 py-3.5 text-base gap-2.5',
};

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    children,
    className = '',
    icon,
    iconRight,
    fullWidth = false,
    ...rest
  } = props;

  const classes = [
    'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 cursor-pointer',
    'focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
      {iconRight && <span className="shrink-0">{iconRight}</span>}
    </>
  );

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={classes}>
        {content}
      </Link>
    );
  }

  if ('href' in props && props.href) {
    const externalProps = props.external
      ? { target: '_blank' as const, rel: 'noopener noreferrer' }
      : {};
    return (
      <a href={props.href} className={classes} {...externalProps}>
        {content}
      </a>
    );
  }

  const { to: _to, href: _href, external: _ext, fullWidth: _fw, icon: _i, iconRight: _ir, variant: _v, size: _s, ...buttonProps } = rest as Record<string, unknown>;
  return (
    <button className={classes} {...(buttonProps as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
