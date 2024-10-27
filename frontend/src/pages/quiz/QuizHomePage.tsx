import React, { useState, useEffect } from 'react';
import { Button, MenuItem, Select, Typography, Box, Container } from '@mui/material';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { fetchQuizData } from '../../redux/thunks/quizthunk/fetchQuizData';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';  // Importer le contexte de la langue

const QuizHomePage: React.FC = () => {
  const [category, setCat] = useState('');  // Gère la sélection de catégorie
  const [difficulty, setDiff] = useState('');  // Gère la sélection de difficulté
  const [token, setToken] = useState<string | null>(null);  // Stocke le token de l'utilisateur
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const { language } = useLanguage();  // Récupérer la langue depuis le contexte

  // Utiliser un effet pour récupérer le token de l'utilisateur au chargement de la page
  useEffect(() => {
    const userToken = localStorage.getItem('token');
    setToken(userToken);
  }, []);

  const handleNext = () => {
    if (category && difficulty && token) {  // Vérifie que le token existe
      // Utiliser la langue et le token lors de l'envoi des données pour récupérer les questions
      dispatch(fetchQuizData({ category, difficulty, language }));
      navigate('/quiz');  // Rediriger vers la page du quiz
    } else if (!token) {
      alert('User not authenticated. Please login.');
      navigate('/login');  // Rediriger vers la page de connexion si pas de token
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 5, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>Welcome to the Quiz!</Typography>
      <Typography variant="body1" gutterBottom>Select your category and difficulty to start.</Typography>

      {/* Sélection de la catégorie */}
      <Box mb={3}>
        <Select
          value={category}
          onChange={(e) => setCat(e.target.value)}
          fullWidth
          variant="outlined"
          displayEmpty
        >
          <MenuItem value="" disabled>Select Category</MenuItem>
          <MenuItem value="Sciences">Science</MenuItem>
          <MenuItem value="History">History</MenuItem>
          <MenuItem value="Mathematics">Mathematics</MenuItem>
          <MenuItem value="Geography">Geography</MenuItem>
        </Select>
      </Box>

      {/* Sélection de la difficulté */}
      <Box mb={3}>
        <Select
          value={difficulty}
          onChange={(e) => setDiff(e.target.value)}
          fullWidth
          variant="outlined"
          displayEmpty
        >
          <MenuItem value="" disabled>Select Difficulty</MenuItem>
          <MenuItem value="easy">Easy</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="hard">Hard</MenuItem>
        </Select>
      </Box>

      {/* Bouton pour commencer le quiz */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleNext}
        disabled={!category || !difficulty || !token}
        fullWidth
        sx={{ padding: 2 }}
      >
        Start Quiz
      </Button>
    </Container>
  );
};

export default QuizHomePage;
