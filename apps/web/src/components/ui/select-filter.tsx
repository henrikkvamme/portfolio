import type * as React from 'react';
import { cn } from '@/lib/utils';

interface SelectFilterProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  placeholder?: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}

export function SelectFilter({
  className,
  placeholder = 'Select an option',
  options,
  ...props
}: SelectFilterProps) {
  return (
    <select
      className={cn(
        "w-full appearance-none rounded-lg border border-white/20 bg-[length:12px_8px] bg-[position:calc(100%-12px)_center] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMUw2IDZMMTEgMSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=')] bg-black/40 bg-no-repeat py-2 pr-8 pl-3 text-sm text-white backdrop-blur-sm transition-all duration-200 hover:border-blue-400/70 hover:bg-black/60 hover:shadow-blue-400/20 hover:shadow-lg focus:border-blue-400/50 focus:outline-none focus:ring-1 focus:ring-blue-400/50 sm:w-auto",
        className
      )}
      {...props}
    >
      <option value="all">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
