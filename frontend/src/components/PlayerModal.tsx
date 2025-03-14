import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './PlayerModal.css'; // Import the custom CSS file

interface PlayerModalProps {
  show: boolean;
  handleClose: () => void;
  handleAddFavorite: () => void; // New prop for "Add to Favourites" button
  
  
  
  player: {
    name: string;
    position: string;
    team: string;
    age: number;
    image: string;
  };
}

const PlayerModal: React.FC<PlayerModalProps> = ({
  show,
  handleClose,
  handleAddFavorite,
  player,
}) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      dialogClassName="custom-modal"
      centered // This ensures the modal appears in the vertical center
    >
      <Modal.Header closeButton>
        <Modal.Title>Player Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ textAlign: 'center' }}>
          <img
            src={player.image || 'https://via.placeholder.com/150'}
            alt="Player"
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
          <h3 style={{ marginTop: '1rem' }}>{player.name}</h3>
          <p>Position: {player.position}</p>
          <p>Team: {player.team}</p>
          <p>Age: {player.age}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleAddFavorite}>
          Add to Favourites
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PlayerModal;
