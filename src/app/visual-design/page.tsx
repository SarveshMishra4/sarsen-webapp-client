//@ts-nocheck
"use client";

// // src/app/visual-design/page.tsx

// 'use client';

// import { useState } from 'react';

// /* Import UI Components */
// import {
//   Button,
//   Input,
//   Badge,
//   Card,
//   Loader,
// } from '@/ui';

// export default function VisualDesignPage() {
//   const [name, setName] = useState('');

//   return (
//     <div className="min-h-screen p-10 space-y-20 bg-surface">

//       {/* PAGE TITLE */}
//       <header>
//         <h1 className="text-4xl font-bold mb-2">
//           Design System Playground
//         </h1>

//         <p className="text-gray-600">
//           All UI components and variants
//         </p>
//       </header>

//       {/* BUTTON SECTION */}
//       <section className="space-y-6">

//         <h2 className="text-2xl font-semibold">
//           Buttons
//         </h2>

//         <div className="flex flex-wrap gap-4">

//           <Button variant="primary">
//             Primary
//           </Button>

//           <Button variant="secondary">
//             Secondary
//           </Button>

//           <Button variant="danger">
//             Danger
//           </Button>

//           <Button variant="outline">
//             Outline
//           </Button>

//           <Button disabled>
//             Disabled
//           </Button>

//           <Button size="sm">
//             Small
//           </Button>

//           <Button size="lg">
//             Large
//           </Button>

//         </div>
//       </section>

//       {/* INPUT SECTION */}
//       <section className="space-y-6">

//         <h2 className="text-2xl font-semibold">
//           Inputs
//         </h2>

//         <div className="space-y-4 max-w-md">

//           {/* Default */}
//           <Input
//             value={name}
//             onChangeValue={setName}
//             placeholder="Default Input"
//           />

//           {/* Disabled */}
//           <Input
//             value="Disabled"
//             onChangeValue={() => {}}
//             disabled
//           />

//           {/* Error */}
//           <Input
//             value={name}
//             onChangeValue={setName}
//             placeholder="Error Input"
//             error="Invalid input"
//           />

//         </div>
//       </section>

//       {/* BADGE SECTION */}
//       <section className="space-y-6">

//         <h2 className="text-2xl font-semibold">
//           Badges
//         </h2>

//         <div className="flex gap-4 flex-wrap">

//           <Badge variant="primary">
//             Primary
//           </Badge>

//           <Badge variant="secondary">
//             Secondary
//           </Badge>

//           <Badge variant="success">
//             Success
//           </Badge>

//           <Badge variant="warning">
//             Warning
//           </Badge>

//           <Badge variant="danger">
//             Danger
//           </Badge>

//         </div>
//       </section>

//       {/* CARD SECTION */}
//       <section className="space-y-6">

//         <h2 className="text-2xl font-semibold">
//           Cards
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

//           <Card
//             title="Basic Card"
//             description="Simple card layout"
//           />

//           <Card
//             title="Highlighted Card"
//             description="With accent border"
//             variant="highlight"
//           />

//           <Card
//             title="Disabled Card"
//             description="Read only card"
//             disabled
//           />

//         </div>
//       </section>

//       {/* LOADER SECTION */}
//       <section className="space-y-6">

//         <h2 className="text-2xl font-semibold">
//           Loaders
//         </h2>

//         <div className="flex gap-8 items-center">

//           <Loader size="sm" />

//           <Loader size="md" />

//           <Loader size="lg" />

//         </div>
//       </section>

//       {/* TOAST PREVIEW */}
//       <section className="space-y-6">

//         <h2 className="text-2xl font-semibold">
//           Toast Preview
//         </h2>

//         <div className="flex gap-4">

//           <Button
//             variant="primary"
//             onClick={() => alert('Success Toast')}
//           >
//             Success Toast
//           </Button>

//           <Button
//             variant="danger"
//             onClick={() => alert('Error Toast')}
//           >
//             Error Toast
//           </Button>

//         </div>

//       </section>

//     </div>
//   );
// }



//@ts-nocheck
"use client";

import React, { useState, forwardRef } from 'react';

// -----------------------------------------------------------------------------
// Types & Constants
// -----------------------------------------------------------------------------

type ColorScheme = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Custom color tokens matching your globals.css
const colors = {
  deepBlue: {
    start: 'bg-deep-blue-start',
    mid: 'bg-deep-blue-mid',
    end: 'bg-deep-blue-end',
    text: 'text-deep-blue-start',
    border: 'border-deep-blue-start',
    ring: 'ring-deep-blue-start',
  },
  gold: {
    bg: 'bg-accent-gold',
    text: 'text-accent-gold',
    border: 'border-accent-gold',
    light: 'bg-accent-gold/10',
  },
  teal: {
    bg: 'bg-accent-teal',
    text: 'text-accent-teal',
    border: 'border-accent-teal',
  },
  gray: {
    50: 'bg-gray-50',
    100: 'bg-gray-100',
    200: 'bg-gray-200',
    300: 'bg-gray-300',
    400: 'bg-gray-400',
    500: 'bg-gray-500',
    600: 'bg-gray-600',
    700: 'bg-gray-700',
    800: 'bg-gray-800',
    900: 'bg-gray-900',
  }
};

// Animation classes
const animations = {
  fadeIn: 'animate-fade-in',
  slideUp: 'animate-slide-up',
  scaleIn: 'animate-scale-in',
  pulse: 'animate-pulse',
  spin: 'animate-spin',
};

// -----------------------------------------------------------------------------
// Foundations Component (Enhanced Display)
// -----------------------------------------------------------------------------

const Foundations = () => {
  const colorSwatches = [
    { name: 'Deep Blue Start', class: 'bg-deep-blue-start' },
    { name: 'Deep Blue Mid', class: 'bg-deep-blue-mid' },
    { name: 'Deep Blue End', class: 'bg-deep-blue-end' },
    { name: 'Accent Gold', class: 'bg-accent-gold' },
    { name: 'Accent Teal', class: 'bg-accent-teal' },
    { name: 'Success', class: 'bg-green-500' },
    { name: 'Warning', class: 'bg-yellow-500' },
    { name: 'Error', class: 'bg-red-500' },
    { name: 'Info', class: 'bg-blue-500' },
  ];

  const typography = [
    { name: 'Display', class: 'text-5xl font-bold font-ropa-sans' },
    { name: 'H1', class: 'text-4xl font-bold font-ropa-sans' },
    { name: 'H2', class: 'text-3xl font-bold font-ropa-sans' },
    { name: 'H3', class: 'text-2xl font-bold font-ropa-sans' },
    { name: 'H4', class: 'text-xl font-semibold font-ropa-sans' },
    { name: 'Body Large', class: 'text-lg font-ropa-sans' },
    { name: 'Body', class: 'text-base font-ropa-sans' },
    { name: 'Small', class: 'text-sm font-ropa-sans' },
    { name: 'Caption', class: 'text-xs font-ropa-sans text-gray-500' },
  ];

  const spacing = [0, 1, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80];
  const radii = [
    { name: 'None', class: 'rounded-none' },
    { name: 'Small', class: 'rounded' },
    { name: 'Medium', class: 'rounded-md' },
    { name: 'Large', class: 'rounded-lg' },
    { name: 'Full', class: 'rounded-full' },
  ];
  const shadows = [
    { name: 'None', class: 'shadow-none' },
    { name: 'Sm', class: 'shadow-sm' },
    { name: 'Md', class: 'shadow-md' },
    { name: 'Lg', class: 'shadow-lg' },
    { name: 'Xl', class: 'shadow-xl' },
    { name: '2xl', class: 'shadow-2xl' },
  ];

  return (
    <section className="space-y-8 font-ropa-sans bg-start">
      <h2 className="text-2xl font-bold border-b pb-2">Foundations</h2>

      {/* Colors */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {colorSwatches.map((c) => (
            <div key={c.name} className="space-y-1">
              <div className={`h-16 w-full rounded-md border ${c.class}`} />
              <p className="text-sm font-medium">{c.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Typography (Ropa Sans)</h3>
        <div className="space-y-2">
          {typography.map((t) => (
            <div key={t.name} className={t.class}>{t.name}</div>
          ))}
        </div>
      </div>

      {/* Spacing */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Spacing Scale (px)</h3>
        <div className="flex flex-wrap gap-4 items-end">
          {spacing.map((size) => (
            <div key={size} className="flex flex-col items-center">
              <div className="w-4 bg-deep-blue-start" style={{ height: size }} />
              <span className="text-xs mt-1">{size}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Border Radius */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Border Radius</h3>
        <div className="flex flex-wrap gap-4">
          {radii.map((r) => (
            <div key={r.name} className={`px-4 py-2 bg-gray-100 ${r.class}`}>{r.name}</div>
          ))}
        </div>
      </div>

      {/* Shadows */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Shadows</h3>
        <div className="flex flex-wrap gap-4">
          {shadows.map((s) => (
            <div key={s.name} className={`px-4 py-2 bg-white ${s.class}`}>{s.name}</div>
          ))}
        </div>
      </div>

      {/* Motion */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Motion</h3>
        <div className="flex flex-wrap gap-4">
          <div className="px-4 py-2 bg-gray-100 animate-fade-in">Fade In</div>
          <div className="px-4 py-2 bg-gray-100 animate-slide-up">Slide Up</div>
          <div className="px-4 py-2 bg-gray-100 animate-scale-in">Scale In</div>
          <div className="px-4 py-2 bg-gray-100 animate-pulse">Pulse</div>
          <div className="px-4 py-2 bg-gray-100 animate-spin">Spin</div>
        </div>
      </div>
    </section>
  );
};

// -----------------------------------------------------------------------------
// Primitives
// -----------------------------------------------------------------------------

// Button
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning';
  size?: Size;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  disabled,
  className = '',
  ...props
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-ropa-sans';
  
  const variantClasses = {
    primary: 'bg-deep-blue-start text-white hover:bg-deep-blue-mid focus:ring-deep-blue-start',
    secondary: 'bg-accent-teal text-white hover:bg-teal-600 focus:ring-accent-teal',
    outline: 'border border-deep-blue-start text-deep-blue-start bg-transparent hover:bg-deep-blue-start/10 focus:ring-deep-blue-start',
    ghost: 'text-deep-blue-start bg-transparent hover:bg-deep-blue-start/10 focus:ring-deep-blue-start',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-600',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500',
  };

  const sizeClasses = {
    xs: 'px-2 py-1 text-xs gap-1',
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-base gap-2',
    lg: 'px-6 py-3 text-lg gap-2',
    xl: 'px-8 py-4 text-xl gap-3',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      ref={ref}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {!loading && icon && iconPosition === 'left' && <span className="inline-flex">{icon}</span>}
      {children}
      {!loading && icon && iconPosition === 'right' && <span className="inline-flex">{icon}</span>}
    </button>
  );
});

Button.displayName = 'Button';

// Input
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  state?: 'default' | 'error' | 'success' | 'warning';
  helperText?: string;
  label?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  state = 'default',
  helperText,
  label,
  icon,
  iconPosition = 'left',
  className = '',
  id,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  const baseClasses = 'block w-full rounded-md border shadow-sm focus:outline-none focus:ring-2 font-ropa-sans transition-colors';
  
  const stateClasses = {
    default: 'border-gray-300 focus:border-deep-blue-start focus:ring-deep-blue-start',
    error: 'border-red-500 focus:border-red-500 focus:ring-red-500',
    success: 'border-green-500 focus:border-green-500 focus:ring-green-500',
    warning: 'border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500',
  };

  const iconPadding = icon
    ? iconPosition === 'left'
      ? 'pl-10'
      : 'pr-10'
    : '';

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`${baseClasses} ${stateClasses[state]} ${iconPadding} ${className}`}
          {...props}
        />
        {icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
      </div>
      {helperText && (
        <p className={`mt-1 text-sm ${state === 'error' ? 'text-red-600' : state === 'success' ? 'text-green-600' : state === 'warning' ? 'text-yellow-600' : 'text-gray-500'}`}>
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

// Badge
interface BadgeProps {
  variant?: 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'gold' | 'teal';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ variant = 'neutral', size = 'md', children, className = '' }) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full font-ropa-sans';
  
  const variantClasses = {
    neutral: 'bg-gray-100 text-gray-800',
    primary: 'bg-deep-blue-start/10 text-deep-blue-start',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    gold: 'bg-accent-gold/10 text-accent-gold border border-accent-gold/30',
    teal: 'bg-accent-teal/10 text-accent-teal',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
      {children}
    </span>
  );
};

// Loader
interface LoaderProps {
  type?: 'spinner' | 'dots' | 'progress' | 'skeleton';
  size?: Size;
  color?: string;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ type = 'spinner', size = 'md', color = 'text-deep-blue-start', className = '' }) => {
  const sizeMap = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10',
  };

  if (type === 'spinner') {
    return (
      <svg className={`animate-spin ${sizeMap[size]} ${color} ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    );
  }

  if (type === 'dots') {
    return (
      <div className={`flex space-x-1 ${className}`}>
        <div className={`${sizeMap[size]} ${color} rounded-full animate-bounce`} style={{ animationDelay: '0ms' }}></div>
        <div className={`${sizeMap[size]} ${color} rounded-full animate-bounce`} style={{ animationDelay: '150ms' }}></div>
        <div className={`${sizeMap[size]} ${color} rounded-full animate-bounce`} style={{ animationDelay: '300ms' }}></div>
      </div>
    );
  }

  if (type === 'progress') {
    return (
      <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
        <div className={`bg-deep-blue-start h-2 rounded-full animate-pulse`} style={{ width: '60%' }}></div>
      </div>
    );
  }

  if (type === 'skeleton') {
    return (
      <div className={`animate-pulse bg-gray-200 rounded ${className}`} style={{ height: size === 'sm' ? '20px' : size === 'md' ? '40px' : '60px' }} />
    );
  }

  return null;
};

// Toast
interface ToastProps {
  variant?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  onClose?: () => void;
  className?: string;
}

const Toast: React.FC<ToastProps> = ({ variant = 'info', title, message, onClose, className = '' }) => {
  const variantClasses = {
    success: 'bg-green-50 border-l-4 border-green-500 text-green-700',
    error: 'bg-red-50 border-l-4 border-red-500 text-red-700',
    warning: 'bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700',
    info: 'bg-blue-50 border-l-4 border-blue-500 text-blue-700',
  };

  const iconMap = {
    success: '✓',
    error: '✗',
    warning: '⚠',
    info: 'ℹ',
  };

  return (
    <div className={`p-4 rounded shadow-lg flex items-start gap-3 font-ropa-sans ${variantClasses[variant]} ${className}`}>
      <span className="text-lg font-bold">{iconMap[variant]}</span>
      <div className="flex-1">
        {title && <h4 className="font-semibold">{title}</h4>}
        <p className="text-sm">{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ×
        </button>
      )}
    </div>
  );
};

// Icon (using Material Symbols)
interface IconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = 24, color = 'currentColor', className = '' }) => {
  return (
    <span
      className={`material-symbols-outlined font-ropa-sans ${className}`}
      style={{ fontSize: size, color }}
    >
      {name}
    </span>
  );
};

// -----------------------------------------------------------------------------
// Patterns
// -----------------------------------------------------------------------------

// Card
interface CardProps {
  variant?: 'default' | 'bordered' | 'elevated' | 'interactive' | 'gradient' | 'pattern';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ variant = 'default', padding = 'md', children, className = '', onClick }) => {
  const baseClasses = 'rounded-lg font-ropa-sans transition-all duration-200';
  
  const variantClasses = {
    default: 'bg-white shadow-sm',
    bordered: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-lg',
    interactive: 'bg-white shadow-sm hover:shadow-md cursor-pointer',
    gradient: 'deep-blue-gradient text-white',
    pattern: 'geometric-pattern bg-deep-blue-start text-white',
  };

  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-7',
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
};

// Modal
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, size = 'md', children, footer }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-6xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fade-in font-ropa-sans">
      <div className={`bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} animate-scale-in`}>
        <div className="flex justify-between items-center p-6 border-b">
          {title && <h3 className="text-xl font-semibold">{title}</h3>}
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <Icon name="close" size={24} />
          </button>
        </div>
        <div className="p-6">{children}</div>
        {footer && <div className="p-6 border-t">{footer}</div>}
      </div>
    </div>
  );
};

// Table
interface TableProps {
  headers: string[];
  rows: (string | React.ReactNode)[][];
  className?: string;
}

const Table: React.FC<TableProps> = ({ headers, rows, className = '' }) => {
  return (
    <div className={`overflow-x-auto font-ropa-sans ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50">
              {row.map((cell, j) => (
                <td key={j} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Tabs
interface Tab {
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  defaultIndex?: number;
  onChange?: (index: number) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, defaultIndex = 0, onChange }) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const handleClick = (index: number) => {
    if (tabs[index].disabled) return;
    setActiveIndex(index);
    onChange?.(index);
  };

  return (
    <div className="font-ropa-sans">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px space-x-8">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              disabled={tab.disabled}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm
                ${activeIndex === index
                  ? 'border-deep-blue-start text-deep-blue-start'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
                ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="py-4">
        {tabs[activeIndex].content}
      </div>
    </div>
  );
};

// Breadcrumb
interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, separator = '/' }) => {
  return (
    <nav className="flex font-ropa-sans text-sm text-gray-600">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="mx-2 text-gray-400">{separator}</span>}
            {item.href ? (
              <a href={item.href} className="hover:text-deep-blue-start">
                {item.label}
              </a>
            ) : (
              <span className="text-gray-900">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

// Pagination
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className = '',
}) => {
  const range = (start: number, end: number) => Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const generatePages = () => {
    const totalNumbers = siblingCount * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages <= totalBlocks) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 2;

    if (!showLeftDots && showRightDots) {
      const leftRange = range(1, 3 + 2 * siblingCount);
      return [...leftRange, '...', totalPages];
    }

    if (showLeftDots && !showRightDots) {
      const rightRange = range(totalPages - (3 + 2 * siblingCount) + 1, totalPages);
      return [1, '...', ...rightRange];
    }

    if (showLeftDots && showRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [1, '...', ...middleRange, '...', totalPages];
    }
  };

  const pages = generatePages();

  return (
    <nav className={`flex items-center space-x-2 font-ropa-sans ${className}`}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
      >
        Previous
      </button>
      {pages?.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
          className={`
            px-3 py-1 rounded border
            ${page === currentPage ? 'bg-deep-blue-start text-white border-deep-blue-start' : 'hover:bg-gray-100'}
            ${page === '...' ? 'cursor-default' : ''}
          `}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
      >
        Next
      </button>
    </nav>
  );
};

// Form Field
interface FormFieldProps {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, error, hint, required, children, className = '' }) => {
  const id = React.useId();

  return (
    <div className={`space-y-1 font-ropa-sans ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {React.cloneElement(children as React.ReactElement, { id, 'aria-describedby': error ? `${id}-error` : hint ? `${id}-hint` : undefined })}
      {hint && !error && <p id={`${id}-hint`} className="text-sm text-gray-500">{hint}</p>}
      {error && <p id={`${id}-error`} className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

// KPI Card
interface KPICardProps {
  title: string;
  value: string | number;
  trend?: number;
  icon?: React.ReactNode;
  className?: string;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, trend, icon, className = '' }) => {
  return (
    <Card variant="elevated" className={className}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {trend !== undefined && (
            <p className={`text-xs mt-1 ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend > 0 ? '+' : ''}{trend}% from last period
            </p>
          )}
        </div>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
    </Card>
  );
};

// Quote Block
interface QuoteBlockProps {
  quote: string;
  author: string;
  role?: string;
  className?: string;
}

const QuoteBlock: React.FC<QuoteBlockProps> = ({ quote, author, role, className = '' }) => {
  return (
    <div className={`p-6 bg-gray-50 border-l-4 border-accent-gold italic ${className}`}>
      <p className="text-lg text-gray-700">"{quote}"</p>
      <cite className="text-sm text-gray-600 mt-2 block not-italic">
        — {author}{role && `, ${role}`}
      </cite>
    </div>
  );
};

// Dropdown Menu (simplified)
interface DropdownItem {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
}

const Dropdown: React.FC<DropdownProps> = ({ trigger, items, align = 'left' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block font-ropa-sans" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div className={`absolute mt-2 w-48 bg-white rounded-md shadow-lg border z-10 ${align === 'right' ? 'right-0' : 'left-0'}`}>
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.onClick?.();
                setIsOpen(false);
              }}
              disabled={item.disabled}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {item.icon && <span className="text-gray-400">{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Tooltip
interface TooltipProps {
  children: React.ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const Tooltip: React.FC<TooltipProps> = ({ children, content, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  };

  return (
    <div className="relative inline-block" onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
      {children}
      {isVisible && (
        <div className={`absolute z-50 px-2 py-1 text-xs text-white bg-gray-900 rounded whitespace-nowrap ${positionClasses[position]}`}>
          {content}
          <div className={`absolute w-2 h-2 bg-gray-900 transform rotate-45 ${
            position === 'top' ? 'top-full left-1/2 -translate-x-1/2 -mt-1' :
            position === 'bottom' ? 'bottom-full left-1/2 -translate-x-1/2 -mb-1' :
            position === 'left' ? 'left-full top-1/2 -translate-y-1/2 -ml-1' :
            'right-full top-1/2 -translate-y-1/2 -mr-1'
          }`} />
        </div>
      )}
    </div>
  );
};

// Progress
interface ProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  showLabel?: boolean;
  className?: string;
}

const Progress: React.FC<ProgressProps> = ({ value, max = 100, size = 'md', color = 'bg-deep-blue-start', showLabel = false, className = '' }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-4',
  };

  return (
    <div className={`w-full ${className}`}>
      <div className={`w-full bg-gray-200 rounded-full ${sizeClasses[size]}`}>
        <div
          className={`${color} rounded-full transition-all duration-300 ${sizeClasses[size]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && <p className="text-sm text-gray-600 mt-1">{percentage.toFixed(0)}%</p>}
    </div>
  );
};

// Alert
interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

const Alert: React.FC<AlertProps> = ({ variant = 'info', title, children, onClose, className = '' }) => {
  const variantClasses = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800',
  };

  const iconMap = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌',
  };

  return (
    <div className={`p-4 border rounded-lg flex items-start gap-3 ${variantClasses[variant]} ${className}`}>
      <span className="text-lg">{iconMap[variant]}</span>
      <div className="flex-1">
        {title && <h4 className="font-semibold">{title}</h4>}
        <div className="text-sm">{children}</div>
      </div>
      {onClose && (
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ×
        </button>
      )}
    </div>
  );
};

// Data Table (more advanced)
interface Column {
  key: string;
  header: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  className?: string;
}

const DataTable: React.FC<DataTableProps> = ({ columns, data, className = '' }) => {
  return (
    <div className={`overflow-x-auto font-ropa-sans ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
// -----------------------------------------------------------------------------
// Main Page
// -----------------------------------------------------------------------------

const DesignSystemPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [paginationPage, setPaginationPage] = useState(1);
  const [inputValue, setInputValue] = useState('');

  // Sample data for tables
  const tableData = [
    { name: 'John Doe', role: 'Admin', status: 'Active' },
    { name: 'Jane Smith', role: 'Editor', status: 'Inactive' },
    { name: 'Bob Johnson', role: 'Viewer', status: 'Active' },
  ];

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'role', header: 'Role' },
    {
      key: 'status',
      header: 'Status',
      render: (value: string) => (
        <Badge variant={value === 'Active' ? 'success' : 'neutral'}>{value}</Badge>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-start font-ropa-sans">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-deep-blue-start">Sarsen Design System</h1>
          <p className="text-gray-600">A comprehensive UI library for strategy consulting</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 space-y-16">
        <Foundations />

        {/* Primitives Section */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold border-b pb-2">Primitives</h2>

          {/* Buttons */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Buttons</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="success">Success</Button>
              <Button variant="warning">Warning</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
              <Button icon={<Icon name="star" />} iconPosition="left">Icon Left</Button>
              <Button icon={<Icon name="arrow_forward" />} iconPosition="right">Icon Right</Button>
              <Button fullWidth>Full Width</Button>
            </div>
          </div>

          {/* Inputs */}
          <div className="space-y-4 max-w-md">
            <h3 className="text-lg font-semibold">Inputs</h3>
            <Input placeholder="Default input" />
            <Input state="error" placeholder="Error state" helperText="This field is required" />
            <Input state="success" placeholder="Success state" helperText="Username available" />
            <Input state="warning" placeholder="Warning state" helperText="Password is weak" />
            <Input label="With Label" placeholder="Enter text" />
            <Input label="With Icon" icon={<Icon name="search" />} placeholder="Search..." />
            <Input disabled value="Disabled" />
          </div>

          {/* Badges */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Badges</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="neutral">Neutral</Badge>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="gold">Gold</Badge>
              <Badge variant="teal">Teal</Badge>
              <Badge size="sm">Small</Badge>
              <Badge size="lg">Large</Badge>
            </div>
          </div>

          {/* Loaders */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Loaders</h3>
            <div className="flex flex-wrap gap-6 items-center">
              <Loader type="spinner" />
              <Loader type="dots" />
              <div className="w-32"><Loader type="progress" /></div>
              <div className="w-32"><Loader type="skeleton" /></div>
              <Loader type="spinner" size="sm" />
              <Loader type="spinner" size="lg" />
            </div>
          </div>

          {/* Toasts */}
          <div className="space-y-4 max-w-md">
            <h3 className="text-lg font-semibold">Toasts</h3>
            <Toast variant="success" title="Success" message="Operation completed successfully" />
            <Toast variant="error" message="Something went wrong" />
            <Toast variant="warning" message="Please check your input" />
            <Toast variant="info" message="New update available" />
          </div>

          {/* Icons */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Icons (Material Symbols)</h3>
            <div className="flex flex-wrap gap-4 text-3xl">
              <Icon name="home" />
              <Icon name="favorite" />
              <Icon name="settings" />
              <Icon name="person" />
              <Icon name="search" />
              <Icon name="menu" />
              <Icon name="close" />
              <Icon name="check" />
              <Icon name="warning" />
              <Icon name="info" />
            </div>
          </div>
        </section>

        {/* Patterns Section */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold border-b pb-2">Patterns</h2>

          {/* Cards */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card variant="default">Default card with some content</Card>
              <Card variant="bordered">Bordered card</Card>
              <Card variant="elevated">Elevated card with shadow</Card>
              <Card variant="interactive" onClick={() => alert('Card clicked')}>Interactive card (click me)</Card>
              <Card variant="gradient">Gradient card</Card>
              <Card variant="pattern">Pattern card</Card>
            </div>
          </div>

          {/* Modal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Modal</h3>
            <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
            <Modal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              title="Example Modal"
              footer={<Button onClick={() => setModalOpen(false)}>Close</Button>}
            >
              <p>This is a modal dialog. It uses fade-in and scale-in animations.</p>
            </Modal>
          </div>

          {/* Tables */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Tables</h3>
            <Table
              headers={['Name', 'Role', 'Status']}
              rows={tableData.map(row => [row.name, row.role, row.status])}
            />
            <h4 className="font-medium mt-4">Data Table with custom rendering</h4>
            <DataTable columns={columns} data={tableData} />
          </div>

          {/* Navigation Components */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Navigation</h3>
            <Breadcrumb
              items={[
                { label: 'Home', href: '#' },
                { label: 'Products', href: '#' },
                { label: 'Details' },
              ]}
            />
            <Tabs
              tabs={[
                { label: 'Tab 1', content: <p>Content for tab 1</p> },
                { label: 'Tab 2', content: <p>Content for tab 2</p> },
                { label: 'Disabled', content: <p>Disabled tab</p>, disabled: true },
              ]}
            />
            <Pagination
              currentPage={paginationPage}
              totalPages={10}
              onPageChange={setPaginationPage}
            />
          </div>

          {/* Forms */}
          <div className="space-y-4 max-w-md">
            <h3 className="text-lg font-semibold">Form Fields</h3>
            <FormField label="Email" required hint="We'll never share your email.">
              <Input type="email" placeholder="Enter email" />
            </FormField>
            <FormField label="Password" error="Password is required">
              <Input type="password" />
            </FormField>
            <Button>Submit</Button>
          </div>

          {/* Dashboard Widgets */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Dashboard Widgets</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <KPICard title="Revenue" value="$124,500" trend={12.3} icon={<Icon name="trending_up" />} />
              <KPICard title="Users" value="1,234" trend={-2.1} icon={<Icon name="people" />} />
              <KPICard title="Conversion" value="3.2%" trend={0.8} icon={<Icon name="percent" />} />
            </div>
          </div>

          {/* Content Blocks */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Content Blocks</h3>
            <QuoteBlock
              quote="Design is not just what it looks like and feels like. Design is how it works."
              author="Steve Jobs"
              role="CEO, Apple"
            />
          </div>

          {/* Dropdown & Tooltip */}
          <div className="space-y-4 flex gap-4 items-center">
            <h3 className="text-lg font-semibold">Dropdown & Tooltip</h3>
            <Dropdown
              trigger={<Button variant="outline">Menu</Button>}
              items={[
                { label: 'Profile', onClick: () => alert('Profile'), icon: <Icon name="person" /> },
                { label: 'Settings', onClick: () => alert('Settings'), icon: <Icon name="settings" /> },
                { label: 'Logout', onClick: () => alert('Logout'), disabled: true, icon: <Icon name="logout" /> },
              ]}
            />
            <Tooltip content="This is a tooltip">
              <span className="text-gray-600 cursor-help">Hover me</span>
            </Tooltip>
          </div>

          {/* Progress */}
          <div className="space-y-4 max-w-md">
            <h3 className="text-lg font-semibold">Progress</h3>
            <Progress value={75} showLabel />
            <Progress value={45} size="lg" color="bg-accent-gold" />
          </div>

          {/* Alerts */}
          <div className="space-y-4 max-w-md">
            <h3 className="text-lg font-semibold">Alerts</h3>
            <Alert variant="info" title="Information">This is an informational alert.</Alert>
            <Alert variant="success">Operation completed successfully.</Alert>
            <Alert variant="warning">Please check your settings.</Alert>
            <Alert variant="error" onClose={() => alert('Closed')}>An error occurred.</Alert>
          </div>
        </section>

        {/* Layout Templates Preview */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold border-b pb-2">Layout Templates</h2>
          <p>Example dashboard layout using components:</p>
          <div className="border rounded-lg overflow-hidden">
            <div className="flex h-96">
              <div className="w-64 deep-blue-gradient p-4 text-white">
                <h4 className="font-bold mb-4">Sidebar</h4>
                <ul className="space-y-2">
                  <li>Dashboard</li>
                  <li>Analytics</li>
                  <li>Reports</li>
                  <li>Settings</li>
                </ul>
              </div>
              <div className="flex-1 p-4 bg-gray-50">
                <div className="h-12 bg-white shadow-sm mb-4 flex items-center px-4 rounded">Header with search</div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <KPICard title="Page Views" value="45.2K" trend={5.2} />
                  <KPICard title="Bounce Rate" value="32.1%" trend={-1.3} />
                  <KPICard title="Session Duration" value="2m 34s" trend={0.5} />
                </div>
                <Card variant="bordered">
                  <h4 className="font-semibold mb-2">Recent Activity</h4>
                  <Table
                    headers={['User', 'Action', 'Time']}
                    rows={[
                      ['John', 'Login', '2 min ago'],
                      ['Jane', 'Export', '15 min ago'],
                    ]}
                  />
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Governance */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold border-b pb-2">Design Governance</h2>
          <div className="bg-gray-100 p-4 rounded font-mono text-sm">
            <p>--color-deep-blue-start: #001F3F;</p>
            <p>--color-deep-blue-mid: #002B5C;</p>
            <p>--color-deep-blue-end: #003B75;</p>
            <p>--color-accent-gold: #D4AF37;</p>
            <p>--color-accent-teal: #008080;</p>
            <p>--animate-fade-in: fadeIn 0.6s ease-out;</p>
            <p>--animate-slide-up: slideUp 0.8s ease-out;</p>
            <p>--animate-scale-in: scaleIn 0.5s ease-out;</p>
          </div>
          <p className="text-lg font-semibold">Core Rule: If something is used more than twice → it must become part of the design system. If something has no token → it should not exist.</p>
        </section>

        {/* Footer */}
        <footer className="border-t pt-6 text-center text-gray-600">
          <p>Sarsen Design System v1.0 — Built for strategy consulting excellence</p>
        </footer>
      </main>
    </div>
  );
};

export default DesignSystemPage;