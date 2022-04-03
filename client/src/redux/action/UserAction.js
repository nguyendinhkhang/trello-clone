import { createAsyncThunk } from '@reduxjs/toolkit'
import dataApi from '../../apis/dataApi'

export const signUp = createAsyncThunk(
  'user/signUp',
  async (signUpData, { rejectWithValue }) => {
    try {
      const response = await dataApi.post(
        '/api/user/sign-up',
        signUpData,
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

export const activateEmail = createAsyncThunk(
  'user/activateEmail',
  async (activationToken, { rejectWithValue }) => {
    try {
      const response = await dataApi.post(
        '/api/user/activation',
        activationToken,
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

export const signIn = createAsyncThunk(
  'user/signIn',
  async (signInData, { rejectWithValue }) => {
    try {
      const response = await dataApi.post(
        '/api/user/sign-in',
        signInData,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const signInWithGoogle = createAsyncThunk(
  'user/signInWithGoogle',
  async (signInDataGoogle, { rejectWithValue }) => {
    try {
      const response = await dataApi.post(
        '/api/user/sign-in-google',
        signInDataGoogle,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const signInWithFacebook = createAsyncThunk(
  'user/signInWithFacebook',
  async (signInDataFacebook, { rejectWithValue }) => {
    try {
      const response = await dataApi.post(
        '/api/user/sign-in-facebook',
        signInDataFacebook,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const refreshToken = createAsyncThunk(
  'user/refreshToken',
  async(data, { rejectWithValue }) => {
    try {
      const response = await dataApi.get(
        '/api/user/refresh-token',
        { withCredentials: true }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const loadUser = createAsyncThunk(
  'user/loadUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await dataApi.get(
        '/api/user/me',
        { withCredentials: true }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const signOut = createAsyncThunk(
  'user/signOut',
  async (data, { rejectWithValue }) => {
    try {
      const response = await dataApi.get(
        '/api/user/sign-out',
        { withCredentials: true }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (dataForgotPassword, { rejectWithValue }) => {
    try {
      const response = await dataApi.post(
        '/api/user/forgot-password',
        dataForgotPassword,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (dataResetPassword, { rejectWithValue }) => {
    try {
      const response = await dataApi.post(
        '/api/user/reset-password',
        dataResetPassword,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)