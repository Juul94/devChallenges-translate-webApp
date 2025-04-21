export enum DefaultValues {
    FROM_LANG = 'English',
    TO_LANG = 'French',
    TEXT = 'Hello, how are you?',
}

export enum LanguageShortTerm {
    EN = 'en',
    FR = 'fr',
    ES = 'es',
}

export const MaxTextLength = 500;

export interface TranslationAPIPayload {
    text: string;
    fromLang: string;
    toLang: string;
}

export interface DetectedLanguage {
    confidence: number;
    language: string;
}
