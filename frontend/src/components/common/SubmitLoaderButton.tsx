// components/SubmitLoaderButton.tsx
import React from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

interface SubmitLoaderButtonProps {
  isLoading: boolean;
  disabled: boolean;
  label: string;
}

const SubmitLoaderButton: React.FC<SubmitLoaderButtonProps> = ({
  isLoading,
  disabled,
  label,
}) => {
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      disabled={disabled || isLoading}
      sx={{ mt: 2 }}
    >
      {isLoading ? <CircularProgress size={24} color="inherit" /> : label}
    </Button>
  );
};

export default SubmitLoaderButton;
