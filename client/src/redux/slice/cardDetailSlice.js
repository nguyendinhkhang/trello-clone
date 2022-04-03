import { createSlice } from '@reduxjs/toolkit'
import { deleteCardAsync, getCardDetailAsync, updateCardAsync } from '../action/CardAction'

const cardDetailSlice = createSlice({
  name: 'cardDetailSlice',
  initialState: {
    loading: false,
    loadingCoverImage: false,
    card: {},
    error: null
  },
  reducers: {
    updateCardTitle: (state, { payload }) => {
      state.card.cardTitle = payload.cardTitle
    },
    updateCardLabel: (state, { payload }) => {
      state.card.label = payload.label
    },
    updateCardDescription: (state, { payload }) => {
      state.card.description = payload.description
    },
    updateCardCoverImage: (state, { payload }) => {
      state.loadingCoverImage = true
      state.card.coverImage.url = payload.coverImage
    }
  },
  extraReducers: {
    [getCardDetailAsync.pending]: (state) => {
      state.loading = true
    },
    [getCardDetailAsync.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.card = payload.card
    },
    [getCardDetailAsync.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload.message
    },
    [updateCardAsync.fulfilled]: (state) => {
      state.loadingCoverImage = false
    },
    [updateCardAsync.rejected]: (state, { payload }) => {
      state.error = payload.message
      state.loadingCoverImage = false
    },
    [deleteCardAsync.fulfilled]: (state) => {
      state.card = {}
    },
    [deleteCardAsync.rejected]: (state, { payload }) => {
      state.error = payload.message
    }
  }
})

export const { updateCardTitle, updateCardLabel, updateCardDescription, updateCardCoverImage } = cardDetailSlice.actions
export default cardDetailSlice.reducer