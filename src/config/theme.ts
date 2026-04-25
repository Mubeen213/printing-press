/**
 * Theme configuration metadata.
 * The actual CSS custom properties live in globals.css.
 * This file documents the token system and provides
 * runtime-level theme metadata when needed.
 */

export const themeConfig = {
  name: 'default',
  label: 'Printaze Default',
  colors: {
    primary: 'var(--color-primary)',
    primaryHover: 'var(--color-primary-hover)',
    primaryLight: 'var(--color-primary-light)',
    secondary: 'var(--color-secondary)',
    secondaryHover: 'var(--color-secondary-hover)',
    accent: 'var(--color-accent)',
    accentLight: 'var(--color-accent-light)',
    surface: 'var(--color-surface)',
    surfaceAlt: 'var(--color-surface-alt)',
    background: 'var(--color-background)',
    backgroundAlt: 'var(--color-background-alt)',
    text: 'var(--color-text)',
    textSecondary: 'var(--color-text-secondary)',
    muted: 'var(--color-muted)',
    border: 'var(--color-border)',
    borderLight: 'var(--color-border-light)',
    success: 'var(--color-success)',
    warning: 'var(--color-warning)',
    error: 'var(--color-error)',
    whatsapp: 'var(--color-whatsapp)',
    whatsappHover: 'var(--color-whatsapp-hover)',
  },
} as const;

export const availableThemes = ['default', 'festive', 'wedding', 'corporate'] as const;

export type ThemeName = (typeof availableThemes)[number];
