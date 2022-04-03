import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createListAsync } from '../../redux/action/ListAction'
import handleInputFocus from '../../utils/handleInputFocus'
import './FormAddList.scss'

const FormAddList = ({ formAddListRef, handleToggleFormAddList }) => {
  const [listTitle, setListTitle] = useState('')
  const inputTitleListRef = useRef()
  const dispatch = useDispatch()
  const { boardDetail } = useSelector(state => state.boardDetail)

  const handleSubmitFormAddList = (e) => {
    e.preventDefault()

    const newListData = {
      listTitle: listTitle,
      boardId: boardDetail._id
    }
    dispatch(createListAsync(newListData))

    setListTitle('')
    inputTitleListRef.current.focus()
  }

  return (
    <form className='form-add-list' onSubmit={handleSubmitFormAddList} ref={formAddListRef}>
      <input
        className='input-title-list'
        type='text' autoFocus
        placeholder='Enter list title...'
        maxLength='210'
        value={listTitle}
        onChange={e => setListTitle(e.target.value)}
        onFocus={handleInputFocus}
        ref={inputTitleListRef}
      />
      <div className='form-actions'>
        <button className='btn-add' type='submit'>Add List</button>
        <div className='form-close'>
          <i className='bi bi-x-lg' onClick={handleToggleFormAddList} />
        </div>
      </div>
    </form>
  )
}

export default FormAddList