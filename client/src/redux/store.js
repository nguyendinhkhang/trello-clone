import { configureStore } from '@reduxjs/toolkit'
import boardDetailReducer from './slice/boardDetailSlice'
import userReducer from './slice/userSlice'
import myBoardReducer from './slice/myBoardSlice'
import cardDetailReducer from './slice/cardDetailSlice'

const store = configureStore({
  reducer: {
    boardDetail: boardDetailReducer,
    user: userReducer,
    myBoard: myBoardReducer,
    card: cardDetailReducer
  }
})

export default store