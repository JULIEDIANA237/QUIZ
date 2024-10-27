// components/EmailField.tsx
import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Email } from '@mui/icons-material';
import { FieldError } from 'react-hook-form';

interface EmailFieldProps {
  error: FieldError | undefined;
  helperText: string | undefined;
  register: any;
}

const EmailField: React.FC<EmailFieldProps> = ({ error, helperText, register }) => {
  return (
    <TextField
      label="Email"
      type="email"
      {...register}
      error={!!error}
      helperText={helperText}
      fullWidth
      margin="normal"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Email />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default EmailField;
