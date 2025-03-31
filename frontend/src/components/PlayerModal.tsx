import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './PlayerModal.css';
import axios from 'axios';

interface PlayerModalProps {
    show: boolean;
    handleClose: () => void;
    player: any;
    // player: {
    //     pid: number;
    //     title: string; // Player name
    //     height: string;
    //     weight: string;
    //     age: number;
    //     description: string; // Team
    //     points: number;
    //     image: string;
    //     isFavourited: boolean;
    // };
    setPlayer: (player: any) => void;
    players?: any[];
    setPlayers?: (players: any[]) => void;
    uid: number;
}

const PlayerModal: React.FC<PlayerModalProps> = ({ show, handleClose, player, setPlayer, players, setPlayers, uid }) => {
    // console.log('PlayerModal:', player, uid);
    // console.log('Players:', players);

    const toggleFavourite = async () => {
        const newLikedState = !player?.isFavourited;
        const pid = player.pid;
        console.log('Toggle favourite for', pid, player.isFavourited);
        
        try { // TODO: Single call to toggle favourite using transaction in backend
            const token = localStorage.getItem("authToken");
            if (newLikedState) {
                // Add favourite via POST
                await axios.post(`http://localhost:3000/api/favourites/${uid}`, { pid }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log("Favourite added successfully");
            } else {
                // Remove favourite via DELETE
                await axios.delete(`http://localhost:3000/api/favourites/${uid}/${pid}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log("Favourite removed successfully");
            }
            setPlayer({ ...player, isFavourited: newLikedState });
            if (setPlayers) {
                const newPlayers = JSON.parse(JSON.stringify(players));
                const playerIndex = newPlayers.findIndex((p: any) => p.pid === pid);
                newPlayers[playerIndex].isFavourited = newLikedState;
                setPlayers(newPlayers);
            }
        } catch (error) {
            console.error("Error updating favourites:", error);
            // setPlayer({ ...player, isFavourited: !newLikedState });
        }
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            dialogClassName="custom-modal"
            // autoFocus={false}
            backdrop={true}
        >
            <Modal.Header closeButton>
                <Modal.Title>Player Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <img 
                        src={player.image || "https://via.placeholder.com/150"} 
                        alt="Player Image" 
                        style={{ width: '150px', height: '150px', borderRadius: '50%' }} 
                    />
                    <h3>{player.title}</h3>
                    <p>Team: {player.description}</p>
                    <p>Age: {player.age}</p>
                    <p>Height: {player.height}</p>
                    <p>Weight: {player.weight}</p>
                    <p>Points: {player.points}</p>
                    <span 
                        style={{ cursor: 'pointer', fontSize: '24px' }} 
                        onClick={toggleFavourite}
                    >
                        {player.isFavourited ? '❤️' : '♡'}
                    </span>
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