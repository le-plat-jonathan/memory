import './Card.css'

function SingleCard({ card, handleChoice, flipped, disabled }) {
  
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card)
    }
  }

  return (
    <div className='card'>
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />
        <img className="back" src="src\assets\img\cover.webp" onClick={handleClick} alt="cover" />
      </div>
    </div>
  )
}

export default SingleCard;