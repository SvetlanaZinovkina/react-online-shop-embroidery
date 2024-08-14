import { configureStore } from '@reduxjs/toolkit';
import api from './api.js';
import userReducer from '../slices/userSlice.js';
// import messagesReducer from '../slices/messagesSlice.js';
// import modalReducer from '../slices/modalSlice.js';

export default configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userReducer,
    // messages: messagesReducer,
    // modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});
