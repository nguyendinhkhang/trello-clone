import { createAsyncThunk } from '@reduxjs/toolkit'
import dataApi, { dataApiPrivate } from '../../apis/dataApi'

export const createCardAsync = createAsyncThunk(
  'card/createCardAsync',
  async (newCard, { rejectWithValue }) => {
    try {
      const response = await dataApi.post(
        '/api/card',
        newCard,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const updateCardAsync = createAsyncThunk(
  'card/updateCardAsync',
  async (dataUpdateCard, { rejectWithValue }) => {
    const { _id, ...data } = dataUpdateCard
    try {
      const response = await dataApiPrivate.put(
        `/api/card/${_id}`,
        data,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  }
)

export const getCardDetailAsync = createAsyncThunk(
  'card/getCardDetail',
  async (data, { rejectWithValue }) => {
    try {
      const response = await dataApiPrivate.get(`/api/card/${data._id}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  }
)

export const deleteCardAsync = createAsyncThunk(
  'card/deleteCardAsync',
  async (data, { rejectWithValue }) => {
    try {
      const response = await dataApiPrivate.delete(`/api/card/${data._id}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  }
)