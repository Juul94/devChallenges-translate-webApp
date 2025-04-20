import { ReactElement, useState } from 'react';
import Layout from '@layouts/layout';
import { Box } from '@mui/material';
import TranslationBox from '@components/translationBox';
import { languages } from '@data/languages';
import { DefaultValues } from '@type/default';

const Home = () => {
    /*
     *  HOOKS
     */
    const [translationText, setTranslationText] = useState<string>(DefaultValues.TEXT);
    const [translateFrom, setTranslateFrom] = useState<string>(DefaultValues.FROM_LANG);
    const [translateTo, setTranslateTo] = useState<string>(DefaultValues.TO_LANG);

    /*
     *  HANDLERS & FUNCTIONS
     */

    const handleTranslationForm = (language: string) => {
        // Logic to run API to translate the text when the user click the translate button
    };

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
            />
            <TranslationBox
                translationText={translationText}
                setTranslationText={setTranslationText}
                translateFrom={translateFrom}
                translateTo={translateTo}
                setTranslateFrom={setTranslateFrom}
                setTranslateTo={setTranslateTo}
                languages={languages}
            />
        </Box>
    );
};

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Home;
