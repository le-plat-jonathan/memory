import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button.jsx';
import './Menu.css';

function Menu() {
  const navigate = useNavigate();

  const handlePlay = () => {
    navigate('/App');
  };

  const handleQuit = () => {
    const confirmQuit = window.confirm('Are you sure you want to quit?');
    if (confirmQuit) {
      window.close();
    }
  };

  return (
    <div className="menu">
      <h1>Welcome to Memory Game</h1>
      <Button text="JOUER" onClick={handlePlay} />
      <Button text="QUITTER" onClick={handleQuit} />
    </div>
  );
}

export default Menu;
