import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './PlayerModal.css'; // Import the custom CSS file

interface PlayerModalProps {
    show: boolean;
    handleClose: () => void;
    player: any;
    // player: {
    //     name: string;
    //     position: string;
    //     team: string;
    //     age: number;
    //     image: string;
    // };
}

const PlayerModal: React.FC<PlayerModalProps> = ({ show, handleClose, player }) => {
    return (
        <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
            <Modal.Header closeButton>
                <Modal.Title>Player Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ textAlign: 'center' }}>
                    <img 
                        src={player.image || "https://via.placeholder.com/150"} 
                        alt="Player" 
                        style={{ width: '150px', height: '150px', borderRadius: '50%' }} 
                    />
                    <h3>{player.name}</h3>
                    <p>Position: {player.position}</p>
                    <p>Team: {player.team}</p>
                    <p>Age: {player.age}</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PlayerModal;