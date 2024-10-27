import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { registerUser } from '../../redux/thunks/authThunks';
import EmailField from '../../components/common/EmailField';
import PasswordField from '../../components/common/PasswordField';
import SubmitLoaderButton from '../../components/common/SubmitLoaderButton';
import Notification from '../../components/common/Notification';
import NameField from '../../components/common/NameField';
import { Box, Link, Grid, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const schema = yup.object().shape({
  name: yup.string().required('Nom requis'),
  email: yup.string().email('Email invalide').required('Email requis'),
  password: yup.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères').required('Mot de passe requis'),
});

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
}

const RegisterForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<RegisterFormInputs>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    setIsLoading(true);
    try {
      const resultAction = await dispatch(registerUser(data));
  
      if (registerUser.rejected.match(resultAction)) {
        // Si l'utilisateur existe déjà
        setNotification({
          open: true,
          message: resultAction.payload as string || 'Erreur lors de l\'enregistrement.',
          severity: 'error',
        });
      } else {
        setNotification({
          open: true,
          message: 'Enregistrement réussi !',
          severity: 'success',
        });
  
        reset(); // Réinitialiser le formulaire après l'enregistrement
  
        // Temporisation avant la redirection pour afficher la notification
        setTimeout(() => {
          navigate('/login');
        }, 2000); // Attente de 2 secondes (2000 ms)
      }
    } catch (error) {
      setNotification({
        open: true,
        message: 'Erreur lors de l\'enregistrement.',
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
      <NameField
        error={!!errors.name}
        helperText={errors.name?.message}
        register={register('name')}
      />
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
        label="S'inscrire"
      />

      <Grid container justifyContent="center" sx={{ mt: 2 }}>
        <Link component={RouterLink} to="/login" variant="body2" sx={{ textDecoration: 'none' }}>
          Déjà un compte ? Se connecter
        </Link>
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

export default RegisterForm;
