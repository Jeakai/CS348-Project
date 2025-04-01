import axios from 'axios';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import './PlayerModal.css';

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
        
        try {
            await axios.put(`http://localhost:3000/api/favourites/${uid}/toggle`, { pid }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
            });
            console.log("Favourite toggled successfully");
            
            setPlayer({ ...player, isFavourited: newLikedState });
            if (setPlayers && players) {
                const updatedPlayers = players.map(p => 
                    p.pid === pid ? {
                        ...p,
                        isFavourited: newLikedState,
                        favCount: newLikedState ? p.favCount + 1 : p.favCount - 1
                    } : p
                );
                setPlayers(updatedPlayers);
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
                <Modal.Title className="text-center w-100">Player Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    textAlign: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem'
                }}>
                    <img 
                        src={player.image || "https://via.placeholder.com/150"} 
                        alt="Player Image" 
                        style={{ 
                            width: '140px', 
                            height: '140px', 
                            borderRadius: '50%', 
                            objectFit: 'cover', 
                            marginBottom: '10px',
                            boxShadow: '0 0 10px rgba(0,0,0,0.1)'
                        }} 
                    />
                    
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                        <h2 style={{ 
                            fontWeight: 700, 
                            fontSize: '26px', 
                            marginBottom: 0, 
                            lineHeight: 1 
                        }}>
                            {player.title}
                        </h2>
                        <span 
                            style={{ 
                                cursor: 'pointer', 
                                fontSize: '24px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                lineHeight: 1
                            }} 
                            onClick={toggleFavourite}
                            title={player.isFavourited ? "Unfavourite" : "Add to favourites"}
                        >
                            {player.isFavourited ? '❤️' : '🤍'}
                        </span>
                    </div>

                    <p style={{ fontStyle: 'italic', color: '#666', marginBottom: '0.8rem' }}>
                        {player.description}
                    </p>
                    
                    <div style={{ fontSize: '15px', lineHeight: '1.5' }}>
                        <p><strong>Age:</strong> {player.age}</p>
                        <p><strong>Height (cm):</strong> {player.height}</p>
                        <p><strong>Weight (kg):</strong> {player.weight}</p>
                        <p><strong>Points:</strong> {player.points}</p>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer style={{ justifyContent: 'center' }}>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PlayerModal;