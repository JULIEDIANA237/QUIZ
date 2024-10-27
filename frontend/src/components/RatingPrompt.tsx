import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

interface RatingPromptProps {
  open: boolean;
  onClose: () => void;
}

const RatingPrompt: React.FC<RatingPromptProps> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        p: 4,
        boxShadow: 24,
        borderRadius: 2,
      }}>
        <Typography variant="h6" gutterBottom>
          Félicitations pour votre meilleur score !
        </Typography>
        <Typography variant="body1" gutterBottom>
          Aidez-nous à améliorer l'application en partageant votre avis.
        </Typography>
        <Button variant="contained" color="primary" onClick={onClose}>
          Fermer
        </Button>
      </Box>
    </Modal>
  );
};

export default RatingPrompt;
