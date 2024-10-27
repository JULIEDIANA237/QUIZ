import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
//import AdminDashboard from './pages/AdminDashboard';
import QuizHomePage from './pages/quiz/QuizHomePage';
import QuizPage from './pages/quiz/QuizPage';
import ResultsPage from './pages/quiz/ResultsPage';
import { LanguageProvider } from './contexts/LanguageContext';
import './i18n';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/quizhome" element={<QuizHomePage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/quiz" element={<QuizPage />} />
        </Routes>
    </Router>
    </LanguageProvider>
    
  );
};

export default App;
