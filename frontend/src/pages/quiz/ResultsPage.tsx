import React, { useEffect, useState  } from 'react';
import { Button, Typography, Box, Paper } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../redux/hooks/hooks';
import { resetQuiz } from '../../redux/slices/quizslices/quizSlice';
import { useNavigate } from 'react-router-dom';
import {  fetchBestScore } from '../../redux/thunks/score/scoreThunks';
import { selectBestScore } from '../../redux/selectors/quiz/quizSelectors';
import RatingPrompt from '../../components/RatingPrompt';

const ResultsPage: React.FC = () => {
  const { score, questions } = useAppSelector((state) => state.quiz);
  const bestScore = useAppSelector(selectBestScore);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [showRatingPrompt, setShowRatingPrompt] = useState(false);

  /*useEffect(() => {
    console.log('ResultsPage: Fetching best score');
    dispatch(fetchBestScore()).then((action) => {
      if (fetchBestScore.fulfilled.match(action)) {
        console.log('ResultsPage: Best score fetched successfully:', action.payload);
      } else {
        console.error('ResultsPage: Failed to fetch best score:', action.payload);
      }
    });
  }, [dispatch]);*/

  useEffect(() => {
    dispatch(fetchBestScore()).then((action) => {
      if (fetchBestScore.fulfilled.match(action)) {
        const fetchedBestScore = action.payload.score;
        console.log('Current Score:', score, 'Best Score:', fetchedBestScore);
        if (score > fetchedBestScore) {
          setShowRatingPrompt(true);
          console.log('New best score achieved, showRatingPrompt set to true');
        }
      }
    });
  }, [dispatch, score]);
  
  
  const handleCloseRatingPrompt = () => {
    setShowRatingPrompt(false);
  };
  

  const handleQuit = () => {
    navigate('/login');
  };

  const handleRestart = () => {
    dispatch(resetQuiz());
    navigate('/quiz');
  };

  const handleMenu = () => {
    dispatch(resetQuiz());
    navigate('/quizHome');
  };

  return (
    <Box 
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Typography variant="h4" gutterBottom>Quiz Completed!</Typography>

      <Paper 
        elevation={3}
        sx={{
          p: 3,
          mt: 2,
          backgroundColor: score >= (bestScore || 0) ? 'green' : 'red', // Vert si score >= meilleur score, sinon rouge
          color: '#fff',
          textAlign: 'center',
          width: '60%',
        }}
      >
        <Typography variant="h6">Your score: {score} / {questions.length}</Typography>
      </Paper>

      {bestScore !== null && (
        <Typography variant="h6" sx={{ mt: 2 }}>
          Your best score: {bestScore}
        </Typography>
      )}
      
      <Box sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" onClick={handleQuit} sx={{ m: 1 }}>
          Quit
        </Button>
        <Button variant="contained" color="secondary" onClick={handleRestart} sx={{ m: 1 }}>
          Restart
        </Button>
        <Button variant="contained" color="warning" onClick={handleMenu} sx={{ m: 1 }}>
          Menu
        </Button>
      </Box>
      <RatingPrompt open={showRatingPrompt} onClose={handleCloseRatingPrompt} />
    </Box>
  );
};

export default ResultsPage;
