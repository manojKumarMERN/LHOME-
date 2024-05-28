import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// utils/auth.ts
import Cookies from 'js-cookie';


interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ token: string }>) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
    },
  },
});

const AUTH_TOKEN = 'auth_token';

export const setToken = (token: string) => {
  localStorage.setItem(AUTH_TOKEN, token);
  Cookies.set(AUTH_TOKEN, token, { expires: 7, path: '/' });
};

export const getToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN) || Cookies.get(AUTH_TOKEN) || null;
};

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;


// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface AuthState {
//   isLoggedIn: boolean;
// }

// const initialState: AuthState = {
//   isLoggedIn: false,
// };

// export const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     login: (state, action: PayloadAction<boolean>) => {
//       state.isLoggedIn = action.payload;
//     },
//   },
// });

// export const { login } = authSlice.actions;

// export default authSlice.reducer;

// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface AuthState {
//   isLoggedIn: boolean;
//   token: string | null;
// }

// const initialState: AuthState = {
//   isLoggedIn: true,
//   token: null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     login(state, action: PayloadAction<{ token: string }>) {
//       state.isLoggedIn = true;
//       state.token = action.payload.token;
//     },
//     logout(state) {
//       state.isLoggedIn = false;
//       state.token = null;
//     },
//   },
// });

// export const { login, logout } = authSlice.actions;
// export default authSlice.reducer;
