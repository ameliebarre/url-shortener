import type { InputHTMLAttributes, ReactNode } from 'react';

const inputClasses =
  'w-full rounded-lg border-2 border-transparent bg-gray-50 py-2.5 pl-10 pr-3 text-sm text-ink placeholder:text-gray-400 outline-none transition-colors focus:border-ink';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  icon: ReactNode;
  endAdornment?: ReactNode;
}

export function FormField({
  id,
  label,
  icon,
  endAdornment,
  className,
  ...inputProps
}: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      <div className="relative mt-1.5">
        <span className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
        <input
          id={id}
          className={`${inputClasses} ${endAdornment ? 'pr-10' : ''} ${className ?? ''}`}
          {...inputProps}
        />
        {endAdornment && (
          <span className="absolute top-1/2 right-3 -translate-y-1/2">
            {endAdornment}
          </span>
        )}
      </div>
    </div>
  );
}
