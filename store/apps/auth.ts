import { Dispatch } from 'redux'
import { createSlice } from '@reduxjs/toolkit'

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn : false,
  },
  reducers: {
    login : (state,action) =>({
        ...state,
        isLoggedIn : action?.payload
    }),
  },
})

export const { login } = AuthSlice.actions

export default AuthSlice.reducer