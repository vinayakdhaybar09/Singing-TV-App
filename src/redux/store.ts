import {configureStore} from '@reduxjs/toolkit';
// import {shazamCoreApi} from './services/shazamCore';
import playerSlice from './features/playerSlice';

export const store = configureStore({
  reducer: {
    // [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
    palyer: playerSlice
  },
  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware().concat(shazamCoreApi.middleware),
});
