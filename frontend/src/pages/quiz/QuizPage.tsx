import React, { useState, useEffect } from 'react';
import { Button, Typography, LinearProgress, Box, Paper, CircularProgress, Snackbar, Alert, AlertColor } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../redux/hooks/hooks';
import { nextQuestion, incrementScore } from '../../redux/slices/quizslices/quizSlice';
import { saveUserScore } from '../../redux/thunks/score/scoreThunks';
import { useLanguage } from '../../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const QuizPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { questions, currentQuestionIndex, score } = useAppSelector((state) => state.quiz);
  const { language } = useLanguage();
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [progress, setProgress] = useState(0);
  const [blink, setBlink] = useState(false);
  const navigate = useNavigate();

  // Définir l'état pour la notification
  const [notification, setNotification] = useState<{ message: string; severity: AlertColor | undefined }>({ message: '', severity: undefined });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (questions.length > 0) {
      setProgress(((currentQuestionIndex + 1) / questions.length) * 100);
    }

    if (showCorrectAnswer) {
      const interval = setInterval(() => {
        setBlink((prev) => !prev);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentQuestionIndex, questions.length, showCorrectAnswer]);

  const handleAnswer = () => {
    if (currentQuestion && selectedAnswer === currentQuestion.correctAnswer) {
      dispatch(incrementScore());
    }
    setShowCorrectAnswer(true);
  };

  const handleNext = async () => {
    setShowCorrectAnswer(false);
    setSelectedAnswer('');

    if (currentQuestionIndex + 1 < questions.length) {
      dispatch(nextQuestion());
    } else {
      // Enregistrer le score et naviguer vers la page des résultats
      const result = await dispatch(saveUserScore(score));
      if (saveUserScore.fulfilled.match(result)) {
        setNotification({ message: 'Score saved successfully!', severity: 'success' });
      } else {
        setNotification({ message: 'Failed to save score', severity: 'error' });
      }
      setOpenSnackbar(true);
      navigate('/results');
    }
  };


  const handleCloseNotification = () => {
    setOpenSnackbar(false);
  };

  if (!currentQuestion) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          minHeight: '100vh',
          background: '#f5f5f5',
        }}
      >
        <CircularProgress color="secondary" />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading questions...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: '600px',
        margin: '20px auto',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '15px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Catégorie et difficulté */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="subtitle1" color="primary">
          {currentQuestion.category}
        </Typography>
        <Typography variant="subtitle1" color="secondary">
          {currentQuestion.difficulty}
        </Typography>
      </Box>

      {/* Barre de progression */}
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          mb: 2,
          height: '10px',
          borderRadius: '5px',
        }}
      />

      <Typography variant="h6" align="center" sx={{ mb: 2 }}>
        {`Question ${currentQuestionIndex + 1} / ${questions.length} (${language})`}
      </Typography>

      {/* Titre de la question */}
      <Typography variant="h5" align="center" sx={{ mb: 3 }}>
        {currentQuestion.content}
      </Typography>

      {/* Réponses */}
      <Box>
        {currentQuestion.answers.map((answer: string, index: number) => (
          <Paper
            key={index}
            onClick={() => setSelectedAnswer(answer)}
            elevation={3}
            sx={{
              cursor: 'pointer',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '10px',
              textAlign: 'center',
              backgroundColor: showCorrectAnswer && answer === currentQuestion.correctAnswer
                ? blink ? 'lightgreen' : 'green'
                : showCorrectAnswer && selectedAnswer === answer
                ? blink ? 'lightcoral' : 'red'
                : 'white',
              transition: 'background-color 0.3s ease',
              ':hover': {
                backgroundColor: !showCorrectAnswer ? '#f0f0f0' : 'inherit',
              },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontWeight: selectedAnswer === answer ? 'bold' : 'normal',
                color: showCorrectAnswer && selectedAnswer === answer ? 'white' : 'black',
              }}
            >
              {answer}
            </Typography>
          </Paper>
        ))}
      </Box>

      {/* Bouton de validation ou suivant */}
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        {!showCorrectAnswer ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleAnswer}
            disabled={!selectedAnswer}
          >
            Submit
          </Button>
        ) : (
          <Button variant="contained" color="secondary" onClick={handleNext}>
            {currentQuestionIndex + 1 === questions.length ? 'Finish' : 'Next'}
          </Button>
        )}
      </Box>

      {/* Snackbar pour notification */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseNotification}>
        <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default QuizPage;
