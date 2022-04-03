import { useEffect } from 'react'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createCardAsync } from '../../redux/action/CardAction'
import handleInputFocus from '../../utils/handleInputFocus'
import './FormAddCard.scss'

const FormAddCard = ({ formAddCardRef, isOpenFormAddCard, setIsOpenFormAddCard, listId }) => {
  const [cardTitle, setCardTitle] = useState('')
  const inputCardRef = useRef()
  const dispatch = useDispatch()
  const { boardDetail } = useSelector(state => state.boardDetail)

  const handleChangeInputCardTitle = (e) => {
    setCardTitle(e.target.value)
    inputCardRef.current.style.height = `${e.target.scrollHeight > 160 ? 160 : e.target.scrollHeight}px`
  }

  const handleSubmitFormAddCard = (e) => {
    e.preventDefault()

    const newCardData = {
      cardTitle: cardTitle,
      listId: listId,
      boardId: boardDetail._id
    }
    dispatch(createCardAsync(newCardData))

    setCardTitle('')
    inputCardRef.current.focus()
  }

  useEffect(() => {
    if (isOpenFormAddCard) formAddCardRef.current.scrollIntoView()
    if (inputCardRef.current) inputCardRef.current.style.height = `${inputCardRef.current.scrollHeight > 160 ? 160 : inputCardRef.current.scrollHeight}px`
  }, [isOpenFormAddCard, formAddCardRef])

  return (
    <form className='form-add-card' onSubmit={handleSubmitFormAddCard} ref={formAddCardRef}>
      <textarea
        className='input-card-title'
        placeholder='Enter card title...'
        maxLength='210'
        autoFocus
        onFocus={handleInputFocus}
        value={cardTitle}
        onChange={handleChangeInputCardTitle}
        ref={inputCardRef}
      />
      <div className='form-actions'>
        <button className='btn-add' type='submit'>Add Card</button>
        <div className='form-close' onClick={() => setIsOpenFormAddCard(false)}>
          <i className='bi bi-x-lg' />
        </div>
      </div>
    </form>
  )
}

export default FormAddCard