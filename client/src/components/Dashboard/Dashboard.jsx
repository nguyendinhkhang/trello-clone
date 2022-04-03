import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Draggable } from 'react-smooth-dnd'
import { useDispatch, useSelector } from 'react-redux'
import sortByOrder from '../../utils/sortByOrder'
import applyDrag from '../../utils/dragDrop'
import ListWrapper from '../ListWrapper/ListWrapper'
import NavbarDashboard from '../Navbar-Dashboard/Navbar-Dashboard'
import useOutSideClick from '../../hooks/useOutSideClick'
import { updateListOrderBoard } from '../../redux/slice/boardDetailSlice'
import { getBoardDetail } from '../../redux/action/BoardAction'
import { updateBoardAsync } from '../../redux/action/BoardAction'
import FormAddList from '../FormAddList/FormAddList'
import Navbar from '../Navbar/Navbar'
import Loader from '../Loader/Loader'
import './Dashboard.scss'

const Dashboard = () => {
  const { ref, isOpen, setIsOpen } = useOutSideClick()
  const dispatch = useDispatch()
  const { loading, boardDetail } = useSelector(state => state.boardDetail)
  const { id } = useParams()

  const handleListDrop = (dropResult) => {
    if (dropResult.removedIndex === dropResult.addedIndex) return

    let newlistOrder = [...boardDetail.listOrder]
    newlistOrder = applyDrag(newlistOrder, dropResult)

    dispatch(updateListOrderBoard(newlistOrder))
    dispatch(updateBoardAsync({ _id: boardDetail._id, listOrder: newlistOrder }))
  }

  const handleToggleFormAddList = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    if (boardDetail._id !== id) {
      dispatch(getBoardDetail(id))
    }
  }, [dispatch, boardDetail, id])

  return (
    <>
      <Navbar />
      {loading
        ? <div className='dashboard-container'>
          <Loader />
        </div>
        : Object.keys(boardDetail).length !== 0 &&
        <>
          <div
            className='dashboard-container'
            style={boardDetail.background &&
              boardDetail.background.startsWith('#')
              ? { background: `${boardDetail.background}` }
              : { backgroundImage: `url(${boardDetail.background})` }}
          >
            <NavbarDashboard boardTitle={boardDetail.boardTitle} />
            <div className='dashboard-content'>
              <Container
                orientation='horizontal'
                onDrop={handleListDrop}
                getChildPayload={index => boardDetail.lists[index]}
                dragHandleSelector='.header-list-wrapper'
                dragClass='list-wrapper-dragging'
                dropClass='list-wrapper-dropping'
                dropPlaceholder={{
                  animationDuration: 150,
                  showOnTop: true,
                  className: 'list-wrapper-drop-preview'
                }}
                style={{ minHeight: '0', minWidth: '0' }}
              >
                {boardDetail.lists &&
                  // board.lists
                  //   .sort((a, b) => board.listOrder.indexOf(a._id) - board.listOrder.indexOf(b._id))
                  sortByOrder(boardDetail.lists, boardDetail.listOrder, '_id')
                    .map(list => (
                      <Draggable key={list._id}>
                        <ListWrapper {...list} />
                      </Draggable>
                    ))
                }
              </Container>
              <div className='add-list'>
                {!isOpen &&
                  <div className='button-add-list' onClick={handleToggleFormAddList}>
                    <i className='bi bi-plus-lg' />
                    <span>Add another list</span>
                  </div>
                }
                {isOpen &&
                  <FormAddList formAddListRef={ref} handleToggleFormAddList={handleToggleFormAddList} />
                }
              </div>
            </div>
          </div>
        </>
      }
    </>
  )
}

export default Dashboard