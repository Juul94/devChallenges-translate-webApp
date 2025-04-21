import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TranslationAPIPayload } from '@type/default';
import { langToTerm } from '@utilities/langToTerm';

export const translationApi = createApi({
    reducerPath: 'translationApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.mymemory.translated.net/',
    }),
    tagTypes: ['Translation'],
    endpoints: (builder) => ({
        translateText: builder.query<string, TranslationAPIPayload>({
            query: ({ text, fromLang, toLang }) => ({
                url: 'get',
                method: 'GET',
                params: {
                    q: text,
                    langpair: `${langToTerm(fromLang)}|${langToTerm(toLang)}`,
                },
            }),
            transformResponse: (response: { responseData: { translatedText: string } }) =>
                response.responseData.translatedText,
        }),
    }),
});

export const { useTranslateTextQuery, useLazyTranslateTextQuery } = translationApi;
