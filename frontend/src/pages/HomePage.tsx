import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Typography, Box, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Button from '../components/common/Button';
import { useTranslation } from 'react-i18next'; // Importer le hook de traduction
import { useLanguage } from '../contexts/LanguageContext';
import i18n from '../i18n'; // Importer i18n directement
import '../assets/styles/HomePage.css';

const HomePage: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation(); // Hook pour traduire

  const changeLanguage = (event: SelectChangeEvent<string>) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage); // Mettre à jour i18n avec la langue choisie
    localStorage.setItem('selectedLanguage', selectedLanguage); // Stocker la langue dans localStorage
  };

  return (
    <Box className="homepage-background">
      <Container maxWidth="md">
        <Grid 
          container 
          direction="column" 
          alignItems="center" 
          justifyContent="center" 
          style={{ minHeight: '100vh' }}
        >
          <Typography variant="h2" className="homepage-title" gutterBottom>
            {t('welcome')} {/* Utilisation de la traduction */}
          </Typography>

          <Grid container justifyContent="center" spacing={2}>
            <Grid item>
              <Link to="/login">
                <Button label={t('login')} className="homepage-button" type="button" /> {/* Traduire "Login" */}
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register">
                <Button label={t('register')} className="homepage-button" type="button" /> {/* Traduire "Register" */}
              </Link>
            </Grid>
          </Grid>

          <Select
            value={language}
            onChange={changeLanguage}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            style={{ marginTop: '20px' }}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="fr">Français</MenuItem>
          </Select>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
 