import { createSlice } from '@reduxjs/toolkit'
import { createBoardAsync, deleteBoardAsync, getMyBoardAsync, updateBoardAsync } from '../action/BoardAction'

const myBoard = createSlice({
  name: 'myBoard',
  initialState: {
    loading: false,
    myBoards: [],
    error: null
  },
  reducers: {
    updateBoard: (state, { payload }) => {
      state.myBoards.forEach(myBoard => {
        if (myBoard._id === payload._id) {
          myBoard.isStar = payload.isStar
        }
      })
    }
  },
  extraReducers: {
    [getMyBoardAsync.pending]: (state) => {
      state.loading = true
    },
    [getMyBoardAsync.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.myBoards = payload.myBoards
    },
    [getMyBoardAsync.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload.message
    },
    [createBoardAsync.pending]: () => {

    },
    [createBoardAsync.fulfilled]: (state, { payload }) => {
      state.loadingCreate = false
      state.myBoards = [payload.newBoard, ...state.myBoards]
    },
    [createBoardAsync.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload.message
    },
    [updateBoardAsync.pending]: () => {

    },
    [updateBoardAsync.fulfilled]: (state, { payload }) => {
      state.myBoards.forEach(myBoard => {
        if (myBoard._id === payload.boardUpdated._id) {
          myBoard === payload.boardUpdated
        }
      })
    },
    [updateBoardAsync.rejected]: (state, { payload }) => {
      state.error = payload.message
    },
    [deleteBoardAsync.rejected]: (state, { payload }) => {
      state.error = payload.message
    }
  }
})

export const { updateBoard } = myBoard.actions
export default myBoard.reducer
