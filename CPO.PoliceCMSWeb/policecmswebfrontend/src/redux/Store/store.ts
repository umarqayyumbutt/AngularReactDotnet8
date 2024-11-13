
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Slices/authSlice';
import userReducer from '../Slices/userSlice';
import provinceReducer from '../Slices/provinceSlice';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistReducer, persistStore } from 'redux-persist';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
//import { PersistGate } from 'redux-persist/integration/react';
//import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'user','provinces'], // Only persist specific reducers
};

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  provinces:provinceReducer,
  //province:ProvinceReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  // reducer: {
  //   user: userReducer,
  //   auth:authReducer,
  //   //user: userReducer,
  //   // otherFeature: otherFeatureReducer,
  // }
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//export default store;