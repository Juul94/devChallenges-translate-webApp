import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface RawLanguageDetectionResult {
    language_code: string;
    language_name: string;
    probability: number;
    percentage: number;
    reliable_result: boolean;
}

interface LanguageDetectionApiResponse {
    success: boolean;
    results: RawLanguageDetectionResult[];
}

export const detectLanguageApi = createApi({
    reducerPath: 'detectLanguageApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.languagelayer.com',
    }),
    endpoints: (builder) => ({
        detectLanguage: builder.query<string, string>({
            query: (text) => ({
                url: '/detect',
                method: 'GET',
                params: {
                    access_key: import.meta.env.VITE_LANGUAGE_DETECTION_API_KEY,
                    query: text,
                },
            }),
            transformResponse: (response: LanguageDetectionApiResponse) => {
                console.log(response);

                if (response.success && response.results.length > 0) {
                    const sortedResults = response.results.sort((a, b) => b.probability - a.probability);
                    const mostConfidentLanguage = sortedResults[0]?.language_name || sortedResults[1]?.language_name || 'en';
                    return mostConfidentLanguage;
                }

                return '';
            },
        }),
    }),
});

export const { useDetectLanguageQuery, useLazyDetectLanguageQuery } = detectLanguageApi;
