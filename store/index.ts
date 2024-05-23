import { configureStore } from '@reduxjs/toolkit'
// import cart from './apps/cart'
import auth from './apps/auth'
import { getToken } from '../services/sessionProvider';
// import settings from './apps/settings'
// import profile from './apps/profile'
// import checkout from './apps/checkout'
// import { getToken } from '../framework/utils/get-token'
// import { getProfile } from '../utils/get-profile'

export const store = configureStore({
  reducer: {
    auth
  
  },
  preloadedState: {
    auth: {
      isLoggedIn: Boolean(getToken()),
    },
    // settings: {
    //   isProd: process.env.NEXT_PUBLIC_ENVIRONMENT == 'stage' ? false : true,
    //   settings: null,
    //   socialLinks: []
    // }
    // profile : {
    //   profile : getProfile()
    // }
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>