// components/NameField.tsx
import React from 'react';
import TextField from '@mui/material/TextField';

interface NameFieldProps {
  error: boolean; // Indiquer si une erreur existe
  helperText?: string; // Message d'aide ou d'erreur
  register: ReturnType<any>; // Typage du hook form
}

const NameField: React.FC<NameFieldProps> = ({ error, helperText, register }) => {
  return (
    <TextField
      label="Nom"
      type="text"
      {...register}
      error={error} // Afficher une erreur si true
      helperText={helperText} // Message d'erreur s'il existe
      fullWidth
      margin="normal"
    />
  );
};

export default NameField;
