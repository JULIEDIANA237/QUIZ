// components/Notification.tsx
import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface NotificationProps {
  open: boolean;
  message: string;
  severity: 'success' | 'error';
  onClose: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notification: React.FC<NotificationProps> = ({ open, message, severity, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000} // Notification disparaît après 3 secondes
      onClose={onClose}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;