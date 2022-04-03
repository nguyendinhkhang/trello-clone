import { useDispatch, useSelector } from 'react-redux'
import { Container, Draggable } from 'react-smooth-dnd'
import { updateCardAsync } from '../../redux/action/CardAction'
import { updateListAsync } from '../../redux/action/ListAction'
import { updateList_CardOrder_Card } from '../../redux/slice/boardDetailSlice'
import applyDrag from '../../utils/dragDrop'
import sortByOrder from '../../utils/sortByOrder'
import Card from '../Card/Card'
import FormAddCard from '../FormAddCard/FormAddCard'
import './ListCard.scss'

const ListCard = ({ _id, cardOrder, cards, outSideClick }) => {
  const { formAddCardRef, isOpenFormAddCard, setIsOpenFormAddCard } = outSideClick
  const { boardDetail } = useSelector(state => state.boardDetail)
  const dispatch = useDispatch()

  const handleCardDrop = (dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      const currentList = boardDetail.lists.find(list => list._id === _id)

      if (dropResult.removedIndex === dropResult.addedIndex
        && dropResult.payload.listId === currentList._id)
        return

      const newCards = applyDrag(currentList.cards, dropResult)
      const newCardOrder = newCards.map(card => card._id)
      dispatch(updateList_CardOrder_Card({ listId: currentList._id, cardOrder: newCardOrder, cards: newCards }))
      dispatch(updateListAsync({ _id: currentList._id, cardOrder: newCardOrder }))

      if (dropResult.removedIndex === null) {
        dispatch(updateCardAsync({ _id: dropResult.payload._id, listId: currentList._id }))
      }
    }
  }

  return (
    <div className={`list-cards ${isOpenFormAddCard && 'list-cards-max-height'}`}>
      <Container
        orientation='vertical'
        groupName='list-wrapper'
        onDrop={dropResult => handleCardDrop(dropResult)}
        getChildPayload={index => cards[index]}
        dragClass='card-dragging'
        dropClass='card-dropping'
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: 'card-drop-preview'
        }}
        dropPlaceholderAnimationDuration={200}
        style={{ minHeight: '2px' }}
      >
        {cards &&
          // cards
          //   .sort((a, b) => cardOrder.indexOf(a.id) - cardOrder.indexOf(b.id))
          sortByOrder(cards, cardOrder, '_id')
            .map(card => (
              <Draggable key={card._id}>
                <Card
                  card={card}
                />
              </Draggable>
            ))
        }
      </Container>
      {isOpenFormAddCard &&
        <FormAddCard
          listId={_id}
          formAddCardRef={formAddCardRef}
          isOpenFormAddCard={isOpenFormAddCard}
          setIsOpenFormAddCard={setIsOpenFormAddCard}
        />
      }
    </div>
  )
}

export default ListCard