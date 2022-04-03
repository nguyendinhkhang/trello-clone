import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getMyBoardAsync, createBoardAsync } from '../../redux/action/BoardAction'
import Navbar from '../../components/Navbar/Navbar'
import Loader from '../../components/Loader/Loader'
import imgBoardSke from '../../assets/dashboard-ske.svg'
import useOutSideClick from '../../hooks/useOutSideClick'
import { dataBgColor, dataBgImage } from '../../apis/dataBackground'
import useClickStar from '../../hooks/useClickStar'
import './MyBoard.scss'

const MyBoard = () => {
  const [newBoardTitle, setNewBoardTitle] = useState('')
  const [errNewBoardTitle, setErrNewBoardTitle] = useState('')
  const [background, setBackground] = useState('https://images.unsplash.com/photo-1647681105535-b3d6e4f1a0b9')
  const dispatch = useDispatch()
  const { loading, myBoards } = useSelector(state => state.myBoard)
  const { ref, isOpen, setIsOpen } = useOutSideClick()
  const clickStar = useClickStar()

  const boardStarred = myBoards.filter(myBoard => myBoard.isStar === true)

  const handleSetBackground = (background) => {
    setBackground(background)
  }

  const handleChangeInputNewBoardTitle = (e) => {
    setNewBoardTitle(e.target.value)
  }

  const handleBlurInputNewBoard = () => {
    if (!/^.{3,60}$/.test(newBoardTitle)) {
      setErrNewBoardTitle('Board title must be 6-30 characters and only include letters and numbers')
    } else {
      setErrNewBoardTitle('')
    }
  }

  const handleClickCreateNewBoard = () => {
    if (newBoardTitle === '') {
      setErrNewBoardTitle('Please enter board title')
    } else {
      dispatch(createBoardAsync({
        boardTitle: newBoardTitle,
        background: background
      }))
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.title = 'My Boards | Trello'
    dispatch(getMyBoardAsync())
  }, [dispatch])

  return (
    <>
      <Navbar />
      <div className='my-board'>
        {loading
          ? <Loader />
          : <div className='my-board-container'>
            {boardStarred.length > 0 &&
              <div className='my-board-content'>
                <div className='my-board-title'>
                  <i className='bi bi-star'></i>
                  <h3 className='title'>Starred Boards</h3>
                </div>
                <div className='my-board-list'>
                  {boardStarred.map(myBoard => (
                    <div
                      className='my-board-item'
                      key={myBoard._id}
                      style={myBoard.background.startsWith('#') ? { background: `${myBoard.background}` } : { backgroundImage: `url(${myBoard.background})` }}
                    >
                      <Link
                        className='my-board-item-link'
                        to={`/board/${myBoard._id}`}
                      >
                        <h3 className='board-title'>{myBoard.boardTitle}</h3>
                      </Link>
                      <i
                        className='bi bi-star-fill'
                        onClick={() => clickStar(myBoard._id, !myBoard.isStar)}
                      />
                    </div>
                  ))
                  }
                </div>
              </div>
            }
            <div className='my-board-content'>
              <div className='my-board-title'>
                <i className='bi bi-card-text'></i>
                <h3 className='title'>All Boards</h3>
              </div>
              <div className='my-board-list'>
                <div className='my-board-item add-board-item'>
                  <span className='icon-create' onClick={() => setIsOpen(true)}>+</span>
                  {isOpen &&
                    <div className='extras-list' ref={ref}>
                      <div className='extras-header'>
                        <span className='extras-title'>Create New Board</span>
                        <div className='extras-close' onClick={() => setIsOpen(false)}>
                          <i className='bi bi-x-lg' />
                        </div>
                      </div>
                      <ul className='extras-list-item'>
                        <li className='extras-item extras-item-center'>
                          <div className='board-sample' style={background.startsWith('#') ? { background: `${background}` } : { backgroundImage: `url(${background})` }}>
                            <img src={imgBoardSke} alt='board-sample' />
                          </div>
                        </li>
                        <li className='extras-item'>
                          <label>Background</label>
                          <div className='background-image-container'>
                            {dataBgImage.map(BgImage => (
                              <div
                                className='bg-img'
                                key={BgImage.id}
                                style={{ backgroundImage: `url(${BgImage.bgImage})` }}
                                onClick={() => handleSetBackground(BgImage.bgImage)}
                              >
                                <div className='overlay' />
                                <i
                                  className='bi bi-check-lg icon-check'
                                  style={{ display: `${background === BgImage.bgImage ? 'block' : 'none'}` }}
                                />
                              </div>
                            ))}
                          </div>
                          <div className='background-color-container'>
                            {dataBgColor.map(BgColor => (
                              <div
                                className='bg-color'
                                key={BgColor.id}
                                style={{ background: `${BgColor.bgColor}` }}
                                onClick={() => handleSetBackground(BgColor.bgColor)}
                              >
                                <div className='overlay' />
                                <i
                                  className='bi bi-check-lg icon-check'
                                  style={{ display: `${background === BgColor.bgColor ? 'block' : 'none'}` }}
                                />
                              </div>
                            ))}
                          </div>
                        </li>
                        <li className='extras-item'>
                          <label>Board title <span>*</span></label>
                          <input
                            type='text'
                            placeholder='Enter board title...'
                            value={newBoardTitle}
                            onChange={handleChangeInputNewBoardTitle}
                            onBlur={handleBlurInputNewBoard}
                          />
                          <p className='input-error'>{errNewBoardTitle}</p>
                        </li>
                        <li className='extras-item color-red'>
                          <button
                            type='button'
                            className='btn-create-board'
                            onClick={handleClickCreateNewBoard}
                            disabled={errNewBoardTitle.length ? true : false}
                          >
                            Create new board
                          </button>
                        </li>
                      </ul>
                    </div>
                  }
                </div>
                {myBoards.map(myBoard => (
                  <div
                    className='my-board-item'
                    key={myBoard._id}
                    style={myBoard.background.startsWith('#') ? { background: `${myBoard.background}` } : { backgroundImage: `url(${myBoard.background})` }}
                  >
                    <Link
                      to={`/board/${myBoard._id}`}
                      className='my-board-item-link'
                    >
                      <h3 className='board-title'>{myBoard.boardTitle}</h3>
                    </Link>
                    <i
                      className={`bi ${myBoard.isStar ? 'bi-star-fill' : 'bi-star' } icon-star`}
                      onClick={() => clickStar(myBoard._id, !myBoard.isStar)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default MyBoard