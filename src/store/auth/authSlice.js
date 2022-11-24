import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking',
    user: {

    },
    errorMessage: undefined
  },
  reducers: {
    onChecking: (state) => {
      state.status        = 'checking'
      state.user          = {}
      state.errorMessage  = undefined
    },
    onLogin : (action, { payload }) => {
      state.status        = 'authenticated'
      state.user          = payload
      state.errorMessage  = undefined
    },
    
  }
});

export const { increment } = authSlice.actions

export default authSlice.reducer