import { combineReducers } from '@reduxjs/toolkit';
import { translationApi } from '@services/translation-api';
import { detectLanguageApi } from '@services/detectLanguage-api';

export const rootReducer = combineReducers({
    [translationApi.reducerPath]: translationApi.reducer,
    [detectLanguageApi.reducerPath]: detectLanguageApi.reducer,
});
