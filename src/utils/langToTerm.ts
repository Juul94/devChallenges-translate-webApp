import { LanguageShortTerm } from '@type/default';

export const langToTerm = (language: string) => {
    const langMap: { [key: string]: string } = {
        English: LanguageShortTerm.EN,
        French: LanguageShortTerm.FR,
        Spanish: LanguageShortTerm.ES,
    };

    const formatedLanguage = langMap[language] || 'en';
    return formatedLanguage;
};
