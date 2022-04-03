import { useEffect, useRef, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import useOutSideClick from '../../hooks/useOutSideClick'
import ListCard from '../ListCard/ListCard'
import handleInputFocus from '../../utils/handleInputFocus'
import { deleteList, updateList_Title } from '../../redux/slice/boardDetailSlice'
import { deleteListAsync, updateListAsync } from '../../redux/action/ListAction'
import './ListWrapper.scss'

const ListWrapper = (props) => {
  const { _id, listTitle, ...data } = props
  const [_title, set_Title] = useState(listTitle)
  const textareaRef = useRef()
  const { ref, isOpen, setIsOpen } = useOutSideClick()
  const { ref: inputEditRef, isOpen: isOpenInputEdit, setIsOpen: setIsOpenInputEdit } = useOutSideClick()
  const { ref: formAddCardRef, isOpen: isOpenFormAddCard, setIsOpen: setIsOpenFormAddCard } = useOutSideClick()
  const dispatch = useDispatch()

  const handleChangeTextArea = (e) => {
    set_Title(e.target.value)
    textareaRef.current.style.height = `${e.target.scrollHeight}px`
  }

  const handleUpdateListTitle = useCallback(() => {
    if (listTitle !== _title && _title !== '') {
      dispatch(updateList_Title({ _id: _id, listTitle: _title }))
      dispatch(updateListAsync({ _id: _id, listTitle: _title }))
    }
  }, [dispatch, listTitle, _title, _id])

  const handleDeleteList = (id) => {
    dispatch(deleteList({ _id: id }))
    dispatch(deleteListAsync({ _id: id }))
  }

  useEffect(() => {
    if (isOpen) ref.current.scrollIntoView()
    if (textareaRef.current) textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    if (isOpenInputEdit === false) {
      if (_title === '') {
        set_Title(listTitle)
      }
      handleUpdateListTitle()
    }
  }, [isOpen, isOpenInputEdit, ref, _title, listTitle, handleUpdateListTitle])

  return (
    <div className='list-wrapper'>
      <header className='header-list-wrapper'>
        {!isOpenInputEdit &&
          <div
            className='header-title'
            onClick={() => {
              setIsOpen(false)
              setIsOpenInputEdit(true)
            }}
          >
            <span>{_title}</span>
          </div>
        }
        {isOpenInputEdit &&
          <div className='header-edit-title' ref={inputEditRef}>
            <textarea
              className='input-edit-title'
              placeholder='Enter title...'
              maxLength='210'
              autoFocus
              value={_title}
              onChange={handleChangeTextArea}
              onFocus={handleInputFocus}
              onKeyDown={e => e.key === 'Enter' && setIsOpenInputEdit(false)}
              ref={textareaRef}
            />
          </div>
        }
        <div className='header-extras' onClick={() => setIsOpen(true)}>
          <i className='bi bi-three-dots' />
        </div>
      </header>
      {isOpen &&
        <div className='extras-list' ref={ref}>
          <div className='extras-header'>
            <span>Extras</span>
            <div className='extras-close'>
              <i className='bi bi-x-lg' onClick={() => setIsOpen(false)} />
            </div>
          </div>
          <ul className='extras-list-item'>
            <li className='extras-item'
              onClick={() => {
                setIsOpen(false)
                setIsOpenInputEdit(true)
              }}
            >
              Edit Title...
            </li>
            <li className='extras-item'
              onClick={() => {
                setIsOpen(false)
                setIsOpenFormAddCard(true)
              }}>
              Add another card...
            </li>
            <li
              className='extras-item color-red'
              onClick={() => handleDeleteList(_id)}
            >
              Remove List
            </li>
          </ul>
        </div>
      }
      <ListCard
        _id={_id}
        {...data}
        outSideClick={{ formAddCardRef, isOpenFormAddCard, setIsOpenFormAddCard }}
      />
      {!isOpenFormAddCard &&
        <footer className='footer-list-wrapper' onClick={() => setIsOpenFormAddCard(true)}>
          <div className='footer-action'>
            <i className='bi bi-plus-lg' />
            <span>Add another card</span>
          </div>
        </footer>
      }
    </div>
  )
}

export default ListWrapper