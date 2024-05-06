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
    <div className='wallpaper'>
      <div className="menu">
        <Button text="PLAY" onClick={handlePlay} />
        <Button text="QUIT" onClick={handleQuit} />
      </div>
    </div>
  );
}

export default Menu;
