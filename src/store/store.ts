import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import persistStore from 'redux-persist/lib/persistStore';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { translationApi } from '@services/translation-api';
import { detectLanguageApi } from '@services/detectLanguage-api';

const persistConfig = {
    key: 'translation-webApp-v1.0.0',
    storage,
    version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
            .concat(translationApi.middleware)
            .concat(detectLanguageApi.middleware),
});

export const persistor = persistStore(store, {}, () => persistor.persist());
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useDispatch = () => useReduxDispatch<AppDispatch>();
