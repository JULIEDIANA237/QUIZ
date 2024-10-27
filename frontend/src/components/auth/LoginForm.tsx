import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';  
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { loginUser } from '../../redux/thunks/authThunks';
import EmailField from '../../components/common/EmailField';
import PasswordField from '../../components/common/PasswordField';
import SubmitLoaderButton from '../../components/common/SubmitLoaderButton';
import Notification from '../../components/common/Notification';
import { LoginFormInputs } from '../../interfaces/LoginFormInputs';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Link, Grid, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AuthResponse } from '../../interfaces/AuthResponse';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email invalide')
    .required('Email requis'),
  password: Yup.string()
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
    .required('Mot de passe requis'),
});

const LoginForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // État pour afficher ou masquer le mot de passe
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: LoginFormInputs) => {
    setIsLoading(true);
    try {
      const response = await dispatch(loginUser({ email: data.email, password: data.password }));
      const userRole = (response.payload as AuthResponse).user.role;

      setNotification({
        open: true,
        message: 'Connexion réussie !',
        severity: 'success',
      });

      setTimeout(() => {
        if (userRole === 'admin') {
          navigate('/admin-dashboard');
        } else if (userRole === 'player') {
          navigate('/quizhome');
        }
      }, 2000); // Délai de 2 secondes avant la redirection

    } catch (error) {
      setNotification({
        open: true,
        message: 'Erreur lors de la connexion. Veuillez réessayer.',
        severity: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ maxWidth: 400, margin: 'auto', p: 3, boxShadow: 3, borderRadius: 2 }}>
      
      <EmailField
        error={errors.email}
        helperText={errors.email?.message}
        register={register('email')}
      />

      <PasswordField
        error={errors.password}
        helperText={errors.password?.message}
        register={register('password')}
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={togglePasswordVisibility}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />

      <SubmitLoaderButton
        isLoading={isLoading}
        disabled={!isValid}
        label="Login"
      />

      <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
        <Grid item>
          <Link component={RouterLink} to="/forgot-password" variant="body2" sx={{ textDecoration: 'none' }}>
            Mot de passe oublié ?
          </Link>
        </Grid>
        <Grid item>
          <Link component={RouterLink} to="/register" variant="body2" sx={{ textDecoration: 'none' }}>
            Pas encore inscrit ? S'inscrire
          </Link>
        </Grid>
      </Grid>

      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={handleCloseNotification}
      />
    </Box>
  );
};

export default LoginForm;
