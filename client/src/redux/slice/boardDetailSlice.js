import { createSlice } from '@reduxjs/toolkit'
import { getBoardDetail, updateBoardAsync } from '../action/BoardAction'
import { createCardAsync, deleteCardAsync, updateCardAsync } from '../action/CardAction'
import { createListAsync, deleteListAsync, updateListAsync } from '../action/ListAction'

const boardDetailSlice = createSlice({
  name: 'boardDetail',
  initialState: {
    loading: false,
    boardDetail: {},
    error: null
  },
  reducers: {
    updateBoardTitle: (state, { payload }) => {
      state.boardDetail.boardTitle = payload
    },
    updateBoardIsStar: (state, { payload }) => {
      state.boardDetail.isStar = payload
    },
    updateListOrderBoard: (state, { payload }) => {
      state.boardDetail.listOrder = payload
    },
    updateList_Title: (state, { payload }) => {
      state.boardDetail.lists.forEach(list => {
        if (list._id === payload._id) {
          list.listTitle = payload.listTitle
        }
      })
    },
    updateList_CardOrder_Card: (state, { payload }) => {
      state.boardDetail.lists.forEach(list => {
        if (list._id === payload.listId) {
          list.cardOrder = payload.cardOrder
          list.cards = payload.cards
        }
      })
    },
    deleteList: (state, { payload }) => {
      state.boardDetail.listOrder = state.boardDetail.listOrder.filter(listId => listId !== payload._id)
      state.boardDetail.lists = state.boardDetail.lists.filter(list => list._id !== payload._id)
    },
    deleteCard: (state, { payload }) => {
      state.boardDetail.lists.forEach(list => list.cards = list.cards.filter(card => card._id !== payload._id))
    }
  },
  extraReducers: {
    [getBoardDetail.pending]: (state) => {
      state.loading = true
    },
    [getBoardDetail.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.boardDetail = payload.board
    },
    [getBoardDetail.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload.message
    },
    [createListAsync.pending]: () => {

    },
    [createListAsync.fulfilled]: (state, { payload }) => {
      state.boardDetail.listOrder = [...state.boardDetail.listOrder, payload.newList._id]
      state.boardDetail.lists = [...state.boardDetail.lists, payload.newList]
    },
    [createListAsync.rejected]: (state, { payload }) => {
      state.error = payload.message
    },
    [updateBoardAsync.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload.message
    },
    [updateListAsync.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload.message
    },
    [deleteListAsync.rejected]: (state, { payload }) => {
      state.error = payload.message
    },
    [createCardAsync.pending]: () => {

    },
    [createCardAsync.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.boardDetail.lists.forEach(list => {
        if (list._id === payload.newCard.listId) {
          list.cardOrder = [...list.cardOrder, payload.newCard._id]
          if (!list.cards) {
            list.cards = [payload.newCard]
          } else {
            list.cards = [...list.cards, payload.newCard]
          }
        }
      })
    },
    [createCardAsync.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload.message
    },
    [updateCardAsync.fulfilled]: (state, { payload }) => {
      // state.boardDetail.lists.forEach(list =>
      //   list.cards.forEach(card => {
      //     if (card._id === payload.cardUpdated._id) {
      //       card = payload.cardUpdated
      //     }
      //   })
      // )
      for (let i = 0; i < state.boardDetail.lists.length; i++) {
        for (let j = 0; j < state.boardDetail.lists[i].cards.length; j++) {
          if (state.boardDetail.lists[i].cards[j]._id === payload.cardUpdated._id) {
            state.boardDetail.lists[i].cards[j] = payload.cardUpdated
          }
        }
      }
    },
    [updateCardAsync.rejected]: (state, { payload }) => {
      state.error = payload.message
    },
    [deleteCardAsync.rejected]: (state, { payload }) => {
      state.error = payload.message
    }
  }
})

export const {
  updateListOrderBoard,
  addNewListBoard,
  updateBoardTitle,
  updateBoardIsStar,
  updateList_Title,
  updateList_CardOrder_Card,
  deleteList,
  deleteCard
} = boardDetailSlice.actions

export default boardDetailSlice.reducer