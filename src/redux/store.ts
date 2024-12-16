import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root-reducer';

export const store = configureStore({ reducer: rootReducer });

export type tRootState = ReturnType<typeof store.getState>;

export type tAppDispatch = typeof store.dispatch;
