import { useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import useClickStar from '../../hooks/useClickStar'
import { updateBoardAsync, deleteBoardAsync } from '../../redux/action/BoardAction'
import { updateBoardTitle } from '../../redux/slice/boardDetailSlice'
import handleInputFocus from '../../utils/handleInputFocus'
import useOutSideClick from '../../hooks/useOutSideClick'
import useAuth from '../../hooks/useAuth'
import './Navbar-Dashboard.scss'

const NavbarDashboard = () => {
  const { boardDetail } = useSelector(state => state.boardDetail)
  const [boardName, setBoardName] = useState(boardDetail.boardTitle)
  const { ref, isOpen, setIsOpen } = useOutSideClick()
  const inputBoardNameRef = useRef()
  const clickStar = useClickStar()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { auth } = useAuth()

  const { _id, boardTitle, isStar } = boardDetail
  const { userInfo } = auth

  const handleChangeInputBoardName = (e) => {
    setBoardName(e.target.value)
    inputBoardNameRef.current.style.width = (((boardName.length + 1) * 8) + 32) + 'px'
  }

  const handleUpdateBoardTitle = useCallback(() => {
    if (boardTitle !== boardName && boardName !== '') {
      dispatch(updateBoardTitle(boardName))
      dispatch(updateBoardAsync({ _id: _id, boardTitle: boardName }))
    }
  }, [dispatch, boardName, boardTitle, _id])

  const handleDeleteBoard = async (id) => {
    await dispatch(deleteBoardAsync({ _id: id }))
    navigate(`/${userInfo.username}/boards`)
  }

  useEffect(() => {
    document.title = `${boardName} | Trello`
    if (inputBoardNameRef.current) {
      inputBoardNameRef.current.style.minWidth = (((boardName.length + 1) * 8) + 32) + 'px'
    }
    if (isOpen === false) {
      if (boardName === '') {
        setBoardName(boardTitle)
      }
      handleUpdateBoardTitle()
    }
  }, [isOpen, boardName, boardTitle, handleUpdateBoardTitle])

  return (
    <nav className='navbar-dashboard'>
      <div className='board-controll' ref={ref} onClick={() => setIsOpen(true)}>
        {!isOpen && <h1 className='board-name'>{boardTitle}</h1>}
        {isOpen &&
          <input
            type='text'
            className='input-board-name'
            maxLength='30'
            autoFocus onFocus={handleInputFocus}
            value={boardName}
            onChange={handleChangeInputBoardName}
            onKeyDown={e => e.key === 'Enter' && setIsOpen(false)}
            ref={inputBoardNameRef}
          />
        }
      </div>
      <div className='board-controll'>
        <i className='icon-navbar-dashboard bi bi-pencil' onClick={() => setIsOpen(true)} />
      </div>
      <div className='board-controll'>
        <i
          className={`icon-navbar-dashboard bi ${isStar ? 'bi-star-fill' : 'bi-star'}`}
          onClick={() => clickStar(_id, !isStar)}
        />
      </div>
      <div className='board-controll'>
        <i
          className='icon-navbar-dashboard bi bi-trash'
          onClick={() => handleDeleteBoard(_id)}
        />
      </div>
    </nav>
  )
}

export default NavbarDashboard