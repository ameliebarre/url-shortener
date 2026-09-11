import { useState } from 'react';

import { FieldErrors } from './FieldErrors';
import { FormField } from './FormField';
import { EyeIcon, EyeOffIcon, LockIcon } from './icons';

interface PasswordFieldProps {
  placeholder?: string;
  fieldErrors?: string[];
}

export function PasswordField({
  placeholder = 'At least 8 characters',
  fieldErrors,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <FormField
        id="password"
        name="password"
        label="Password"
        icon={<LockIcon className="h-4 w-4" />}
        type={visible ? 'text' : 'password'}
        placeholder={placeholder}
        endAdornment={
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Hide password' : 'Show password'}
            className="cursor-pointer text-gray-400 hover:text-ink"
          >
            {visible ? (
              <EyeOffIcon className="h-4 w-4" />
            ) : (
              <EyeIcon className="h-4 w-4" />
            )}
          </button>
        }
      />
      <FieldErrors errors={fieldErrors} />
    </div>
  );
}
