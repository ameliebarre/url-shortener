import { useState } from 'react';

import { FormField } from './FormField';
import { EyeIcon, EyeOffIcon, LockIcon } from './icons';

export function PasswordField() {
  const [visible, setVisible] = useState(false);

  return (
    <FormField
      id="password"
      label="Password"
      icon={<LockIcon className="h-4 w-4" />}
      type={visible ? 'text' : 'password'}
      placeholder="At least 8 characters"
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
  );
}
