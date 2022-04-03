import { useDispatch } from 'react-redux'
import { updateBoardAsync } from '../redux/action/BoardAction'
import { updateBoardIsStar } from '../redux/slice/boardDetailSlice'
import { updateBoard } from '../redux/slice/myBoardSlice'

const useClickStar = () => {
  const dispatch = useDispatch()
  const clickStar = (id, isStar) => {
    dispatch(updateBoardIsStar(isStar))
    dispatch(updateBoard({ _id: id, isStar: isStar }))
    dispatch(updateBoardAsync({ _id: id, isStar: isStar }))
  }
  return clickStar
}

export default useClickStar