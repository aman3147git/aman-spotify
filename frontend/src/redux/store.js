import {configureStore,combineReducers} from '@reduxjs/toolkit';
import songSlice from './songSlice';
import userSlice from './userSlice';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const rootReducer=combineReducers({
    appuser:userSlice,
    song:songSlice
})
const persistConfig = {
    key: 'root',
    storage,
  }
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store =configureStore({
    reducer:
        persistedReducer,
        middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false})
    
})
export default store;
export const persistor = persistStore(store);