// src/components/common/TextField.tsx

import React from 'react';

interface TextFieldProps {
  label: string;
  type: string;
  error?: boolean;
  helperText?: string;
  [x: string]: any; // Pour accepter d'autres props comme `register`
}

const TextField: React.FC<TextFieldProps> = ({ label, type, error, helperText, ...rest }) => (
  <div className="text-field-container">
    <label>{label}</label>
    <input className={`text-field ${error ? 'error' : ''}`} type={type} {...rest} />
    {helperText && <p className="helper-text">{helperText}</p>}
  </div>
);

export default TextField;
