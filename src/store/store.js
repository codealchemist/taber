import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

// Import your individual reducers here
import tabCollectionsReducer from './slices/tab-collections.slice'

const rootReducer = combineReducers({
  tabCollections: tabCollectionsReducer
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['tab-collections']
  // blacklist: ['someNonPersistedReducer'], // Optionally, specify which reducers NOT to persist
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'FLUSH',
          'REHYDRATE',
          'PAUSE',
          'PERSIST',
          'PURGE',
          'REGISTER'
        ]
      }
    })
})

export const persistor = persistStore(store)
