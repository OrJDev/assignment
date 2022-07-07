import { ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import userReducer from '../users';
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
    users: userReducer,
})
const persistConfig = {
    key: 'root',
    storage
}

export const store = createStore(persistReducer(persistConfig, rootReducer))
export const pStore = persistStore(store)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
