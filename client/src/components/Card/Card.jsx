import { Link, useLocation } from 'react-router-dom'
import './Card.scss'

const Card = ({ card }) => {
  const location = useLocation()
  return (
    <div className='card'>
      {card.coverImage.url && <img className='cover-image'
        src={card.coverImage.url}
        alt={card.cardTitle}
        onMouseDown={e => e.preventDefault()}
      />}
      <div className='card-label'>
        {card.label.map(label =>
          <span key={label.id} className='label' style={{ backgroundColor: `${label.bgLabel}` }}></span>
        )}
      </div>
      <span className='card-title'>{card.cardTitle}</span>
      <footer className='card-footer'>
        {card.description &&
          <div className='card-footer-item'>
            <i className='icon-card-footer bi bi-text-left'></i>
          </div>
        }
      </footer>
      <Link
        className='edit-card'
        to={`/card/${card._id}`}
        state={{ background: location }}
      >
        <i className='icon-edit bi bi-pencil-square'></i>
      </Link>
    </div>
  )
}

export default Card