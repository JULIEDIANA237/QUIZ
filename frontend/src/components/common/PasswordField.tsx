import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Lock } from '@mui/icons-material';
import { FieldError } from 'react-hook-form';

interface PasswordFieldProps {
  error: FieldError | undefined;
  helperText: string | undefined;
  register: any;
  type: string; // Ajout de la propriété 'type'
  endAdornment?: React.ReactNode; // Ajout de la propriété 'endAdornment'
}

const PasswordField: React.FC<PasswordFieldProps> = ({ error, helperText, register, type, endAdornment }) => {
  return (
    <TextField
      label="Mot de passe"
      type={type} // Utilisation de 'type' provenant des props
      {...register}
      error={!!error}
      helperText={helperText}
      fullWidth
      margin="normal"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Lock />
          </InputAdornment>
        ),
        endAdornment: endAdornment, // Utilisation de 'endAdornment' provenant des props
      }}
    />
  );
};

export default PasswordField;
