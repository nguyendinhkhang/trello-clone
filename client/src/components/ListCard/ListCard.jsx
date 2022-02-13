import Card from '../Card/Card'
import './ListCard.scss'

const ListCard = () => {
  return (
    <ul className='list-cards'>
      <Card
        title='HTML/CSS'
        image='https://i.pinimg.com/736x/ae/38/7b/ae387bfcea634b7b9818d25f3d637f3b.jpg'
      />
      <Card
        title='Javascript'
      />
      <Card
        title='ReactJs'
      />
      <Card
        title='NodeJs'
      />
      <Card
        title='ExpressJs'
      />
      <Card
        title='AngularJs'
      />
      <Card
        title='VueJs'
      />
      <Card
        title='React-Native'
      />
    </ul>
  )
}

export default ListCard