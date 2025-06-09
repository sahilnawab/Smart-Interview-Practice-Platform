import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './api/baseApi';
import { errorMiddleware } from './middleware/errorMiddleware';


export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
 middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware()
    .concat(baseApi.middleware)
    .concat(errorMiddleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
