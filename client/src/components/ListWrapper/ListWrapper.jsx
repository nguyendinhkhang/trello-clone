import ListCard from '../ListCard/ListCard'
import './ListWrapper.scss'

const ListWrapper = () => {
  return (
    <div className='list-wrapper'>
      <header>Brainstorm</header>
      <ListCard />
      <footer>Add another card</footer>
    </div>
  )
}

export default ListWrapper