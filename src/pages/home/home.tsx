import { ReactElement, useEffect, useState, useCallback, useMemo } from 'react';
import Layout from '@layouts/layout';
import { Box } from '@mui/material';
import TranslationBox from '@components/translationBox';
import { languages } from '@data/languages';
import { DefaultValues } from '@type/default';
import { useLazyTranslateTextQuery, useTranslateTextQuery } from '@services/translation-api';
import debounce from 'lodash/debounce';

const Home = () => {
    /*
     * STATES & LOCAL VARIABLES
     */
    const [translationText, setTranslationText] = useState<string>(DefaultValues.TEXT || 'Hello');
    const [translateFrom, setTranslateFrom] = useState<string>(DefaultValues.FROM_LANG);
    const [translateTo, setTranslateTo] = useState<string>(DefaultValues.TO_LANG);
    const [translatedText, setTranslatedText] = useState<string>('');

    /*
     * API CALLS
     */

    const [triggerTranslation, { isLoading: isLoadingTranslationText, isFetching: isFetchingTranslationText }] =
        useLazyTranslateTextQuery();

    /*
     * HANDLERS & FUNCTIONS
     */

    // Debounced function to handle translation
    const debouncedTranslate = useMemo(() => {
        return debounce(async (text: string, from: string, to: string) => {
            const response = await triggerTranslation({
                text,
                fromLang: from,
                toLang: to,
            }).unwrap();

            setTranslatedText(response);
        }, 500);
    }, [triggerTranslation]);

    // Manual translate handler
    const handleTranslateText = async () => {
        const response = await triggerTranslation({
            text: translationText,
            fromLang: translateFrom,
            toLang: translateTo,
        }).unwrap();

        setTranslatedText(response);

        // TODO: Show snackbar message to the user
    };

    /*
     * EFFECTS
     */

    // Initial run on page load with default values
    useEffect(() => {
        triggerTranslation({
            text: translationText,
            fromLang: translateFrom,
            toLang: translateTo,
        })
            .unwrap()
            .then((responseData) => {
                setTranslatedText(responseData);
            });
    }, []);

    // Trigger debounced translation when translationText, translateFrom, or translateTo changes
    useEffect(() => {
        if (translationText) {
            debouncedTranslate(translationText, translateFrom, translateTo);
        }
    }, [translationText, translateFrom, translateTo, debouncedTranslate]);

    return (
        <Box display='flex' justifyContent='center' alignItems='center' gap={1} mt={7} px={7}>
            <TranslationBox
                isTranslationContent
                translationText={translationText}
                setTranslationText={setTranslationText}
                translateFrom={translateFrom}
                translateTo={translateTo}
                setTranslateFrom={setTranslateFrom}
                setTranslateTo={setTranslateTo}
                languages={languages}
                handleTranslateText={handleTranslateText}
                isLoading={isLoadingTranslationText || isFetchingTranslationText}
            />
            <TranslationBox
                translationText={translatedText}
                setTranslationText={setTranslationText}
                translateFrom={translateFrom}
                translateTo={translateTo}
                setTranslateFrom={setTranslateFrom}
                setTranslateTo={setTranslateTo}
                languages={languages}
                handleTranslateText={handleTranslateText}
                isLoading={isLoadingTranslationText || isFetchingTranslationText}
            />
        </Box>
    );
};

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Home;
