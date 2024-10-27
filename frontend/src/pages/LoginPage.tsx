import React from 'react';
import { Box, Container, Paper, Typography } from '@mui/material';
import LoginForm from '../components/auth/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #6A82FB 0%, #FC5C7D 100%)', // Dégradé de fond rose
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={10} sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Connexion
          </Typography>
          <LoginForm />
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
