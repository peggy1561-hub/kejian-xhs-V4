import * as React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'outline' };

export function Button({ className = '', variant = 'default', type = 'button', ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors disabled:pointer-events-none disabled:opacity-50';
  const variants = { default: 'bg-blue-600 text-white hover:bg-blue-700', outline: 'border border-slate-200 bg-white text-slate-900 hover:bg-slate-50' };
  return <button type={type} className={`${base} ${variants[variant]} ${className}`.trim()} {...props} />;
}
