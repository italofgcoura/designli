import {createSlice} from '@reduxjs/toolkit';

export type tUser = {
  isLoged: boolean;
  loadingUser: boolean;
};

const initialState: tUser = {
  isLoged: false,
  loadingUser: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    creatUser: (state, action) => {
      return {...state, user: action.payload, loadingUser: true};
    },
    loginUser: (state, action) => {
      return {...state, isLoged: action.payload};
    },
    finishRequest: state => {
      return {...state, loadingUser: false};
    },
  },
});

export const {creatUser, loginUser, finishRequest} = userSlice.actions;

export default userSlice.reducer;
