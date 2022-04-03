import { createSlice } from '@reduxjs/toolkit'
import { activateEmail, forgotPassword, loadUser, refreshToken, resetPassword, signInWithFacebook, signInWithGoogle, signOut, signUp } from '../action/UserAction'
import { signIn } from '../action/UserAction'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loadingUser: false,
    loading: false,
    auth: {
      isAuth: false,
      userInfo: {},
      role: null,
      accessToken: null
    },
    isSigningUp: false,
    isForgotPassword: false,
    isResetSuccess: null,
    error: null
  },
  reducers: {},
  extraReducers: {
    [loadUser.pending]: (state) => {
      state.loadingUser = true
    },
    [loadUser.fulfilled]: (state, { payload }) => {
      state.loadingUser = false
      state.auth.isAuth = payload.success
      state.auth.userInfo = payload.userInfo
      state.auth.role = payload.role
      state.auth.accessToken = payload.accessToken
    },
    [loadUser.rejected]: (state, { payload }) => {
      state.loadingUser = false
      state.error = payload.message
    },
    [signUp.pending]: (state) => {
      state.loading = true
    },
    [signUp.fulfilled]: (state) => {
      state.loading = false
      state.isSigningUp = true
    },
    [signUp.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload.message
    },
    [activateEmail.pending]: (state) => {
      state.isSigningUp = true
    },
    [activateEmail.fulfilled]: (state, { payload }) => {
      state.isSigningUp = false
      state.auth.isAuth = payload.success
      state.auth.userInfo = payload.userInfo
      state.auth.role = payload.role
      state.auth.accessToken = payload.accessToken
    },
    [activateEmail.rejected]: (state, { payload }) => {
      state.isSigningUp = false
      state.error = payload.message
    },
    [signIn.pending]: (state) => {
      state.loading = true
    },
    [signIn.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.auth.isAuth = payload.success
      state.auth.userInfo = payload.userInfo
      state.auth.role = payload.role
      state.auth.accessToken = payload.accessToken
      state.error = null
    },
    [signIn.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload.message
    },
    [signInWithGoogle.pending]: (state) => {
      state.loading = true
    },
    [signInWithGoogle.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.auth.isAuth = payload.success
      state.auth.userInfo = payload.userInfo
      state.auth.role = payload.role
      state.auth.accessToken = payload.accessToken
      state.error = null
    },
    [signInWithGoogle.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload.message
    },
    [signInWithFacebook.pending]: (state) => {
      state.loading = true
    },
    [signInWithFacebook.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.auth.isAuth = payload.success
      state.auth.userInfo = payload.userInfo
      state.auth.role = payload.role
      state.auth.accessToken = payload.accessToken
      state.error = null
    },
    [signInWithFacebook.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload.message
    },
    [refreshToken.pending]: () => {

    },
    [refreshToken.fulfilled]: (state, { payload }) => {
      state.auth.isAuth = payload.success
      state.auth.accessToken = payload.accessToken
    },
    [refreshToken.rejected]: (state, { payload }) => {
      state.loading = false
      state.auth.isAuth = payload.success
      state.auth.userInfo = {}
      state.auth.role = null
      state.auth.accessToken = null
      state.error = payload.message
    },
    [signOut.pending]: (state) => {
      state.loading = true
    },
    [signOut.fulfilled]: (state) => {
      state.loading = false
      state.auth.isAuth = false
      state.auth.userInfo = {}
      state.auth.role = null
      state.auth.accessToken = null
      state.error = null
    },
    [signOut.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload.message
    },
    [forgotPassword.pending]: (state) => {
      state.loading = true
    },
    [forgotPassword.fulfilled]: (state) => {
      state.loading = false
      state.isForgotPassword = true
    },
    [forgotPassword.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload.message
    },
    [resetPassword.pending]: (state) => {
      state.loading = true
    },
    [resetPassword.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.isResetSuccess = payload.success
    },
    [resetPassword.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload.message
    }
  }
})

export default userSlice.reducer