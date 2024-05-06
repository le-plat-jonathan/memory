import { useState, useEffect } from 'react';
import './App.css';
import Card from '../Card/Card';
import Title from '../Title/Title';
import Button from '../Button/Button';
import Player from '../Player/Player';
import { useNavigate } from 'react-router-dom';

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(20);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [pairsRemaining, setPairsRemaining] = useState(12);
  const navigate = useNavigate();

  const cardImages = [
    { "src": "src/assets/img/card1.png", matched: false },
    { "src": "src/assets/img/card2.png", matched: false },
    { "src": "src/assets/img/card3.png", matched: false },
    { "src": "src/assets/img/card4.png", matched: false },
    { "src": "src/assets/img/card5.png", matched: false },
    { "src": "src/assets/img/card6.webp", matched: false },
  ];

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
      
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(20)
    setPairsRemaining(12);
    setGameOver(false);
  }

  const navigateToMenu = () => {
    navigate('/');
  }

  const handleChoice = (card) => {
    console.log(card)
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => {
      if (prevTurns > 0) {
        return prevTurns - 1;
      } else {
        setGameOver(true);
        return 0;
      }
    });
    setDisabled(false)
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)

      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          const updatedCards = prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          });

          setPairsRemaining(prevPairs => prevPairs - 1);
          console.log(pairsRemaining);

          if (pairsRemaining === 1) {
            setGameOver(true);
          }

          return updatedCards;
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }

    }
  }, [choiceOne, choiceTwo, pairsRemaining])

  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <div className='leftDisplay'>
        <div className='lecteur'>
          <Title text='Memory Game'/>
            <Button text='Menu' onClick={navigateToMenu}/>
            <Button className='resetBtn' text='Reset' onClick={shuffleCards}/>
            <p>Turns: {turns}</p>
            <div className='player'>
            <img src='src/assets/img/logo.png' className='logo'/>
            <Player/>
          </div>
        </div>
      </div>
      {gameOver && pairsRemaining === 0 && <p className="gameOverMessage">You win!</p>}
      {gameOver && pairsRemaining !== 0 && <p className="gameOverMessage">You lose!</p>}
      <div className="card-grid">
        {cards.map(card => (
          <Card 
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled || gameOver}
          />
        ))}
      </div>
    </div>
  );
}

export default App;