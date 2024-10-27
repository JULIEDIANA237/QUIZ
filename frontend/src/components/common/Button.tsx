// src/components/common/Button.tsx

import React from 'react';

interface ButtonProps {
  label: string;
  type: "submit" | "button" | "reset";
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, type, className, disabled }) => (
  <button type={type} className={className} disabled={disabled}>
    {label}
  </button>
);

export default Button;
