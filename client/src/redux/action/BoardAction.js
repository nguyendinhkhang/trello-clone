import { createAsyncThunk } from '@reduxjs/toolkit'
import { dataApiPrivate } from '../../apis/dataApi'

export const getBoardDetail = createAsyncThunk(
  'myBoard/getBoardDetail',
  async (boardId, { rejectWithValue }) => {
    try {
      const response = await dataApiPrivate.get(`/api/board/${boardId}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const updateBoardAsync = createAsyncThunk(
  'myBoard/boardDetail/updateBoard',
  async (dataUpdateBoard, { rejectWithValue }) => {
    const { _id, ...data } = dataUpdateBoard
    try {
      const response = await dataApiPrivate.put(
        `/api/board/${_id}`,
        data,
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

export const getMyBoardAsync = createAsyncThunk(
  'myBoard/getMyBoard',
  async (data, { rejectWithValue }) => {
    try {
      const response = await dataApiPrivate.get('/api/my-board')
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const createBoardAsync = createAsyncThunk(
  'myBoard/createBoard',
  async (data, { rejectWithValue }) => {
    try {
      const response = await dataApiPrivate.post(
        '/api/my-board',
        data,
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

export const deleteBoardAsync = createAsyncThunk(
  'myBoard/boardDetail/deleteBoard',
  async (data, { rejectWithValue }) => {
    try {
      const response = await dataApiPrivate.delete(`/api/board/${data._id}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)