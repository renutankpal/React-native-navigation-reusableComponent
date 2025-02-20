import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import sessionReducer from './slices/sessionSlice';
import communityReducer from './community/communitySlice';
import locationReducer from './community/locationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    session:sessionReducer,
    community: communityReducer,
    location: locationReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
