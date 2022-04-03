import { createAsyncThunk } from '@reduxjs/toolkit'
import { dataApiPrivate } from '../../apis/dataApi'

export const createListAsync = createAsyncThunk(
  'list/createListAsync',
  async (newList, { rejectWithValue }) => {
    try {
      const response = await dataApiPrivate.post(
        '/api/list',
        newList,
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

export const updateListAsync = createAsyncThunk(
  'list/updateListAsync',
  async (dataUpdateList, { rejectWithValue }) => {
    const { _id, ...data } = dataUpdateList
    try {
      const response = await dataApiPrivate.put(
        `/api/list/${_id}`,
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

export const deleteListAsync = createAsyncThunk(
  'list/deleteListAsync',
  async (data, { rejectWithValue }) => {
    try {
      const response = await dataApiPrivate.delete(`/api/list/${data._id}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.message)
    }
  }
)
