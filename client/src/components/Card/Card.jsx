import './Card.scss'

const Card = ({ title, image }) => {
  return (
    <li className='card'>
      {image && <img className='cover-image'
        src={image}
        alt={title}
      />}
      {title}
    </li>
  )
}

export default Card