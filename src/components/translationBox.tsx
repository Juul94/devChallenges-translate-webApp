import { Box, Divider, TextareaAutosize, TextField, Tooltip, Typography } from '@mui/material';
import DefaultButton from './defaultButton';
import swapIcon from '@icons/Horizontal_top_left_main.svg';
import { useState } from 'react';
import { MaxTextLength } from '@type/default';

interface TranslationBoxProps {
    isTranslationContent?: boolean; // True: Show input content, False: Show output content
    translationText: string;
    setTranslationText: (text: string) => void;
    translateFrom: string;
    translateTo: string;
    setTranslateFrom: (lang: string) => void;
    setTranslateTo: (lang: string) => void;
    languages: string[];
}

const TranslationBox: React.FC<TranslationBoxProps> = ({
    isTranslationContent,
    translationText,
    setTranslationText,
    translateFrom,
    translateTo,
    setTranslateFrom,
    setTranslateTo,
    languages,
}) => {
    /*
     *  LOCAL STATES
     */

    const SwapIcon = <img src={swapIcon} alt='Swap' />;

    /*
     *  HANDLERS & FUNCTIONS
     */

    const handleTranslateFrom = (language: string) => {
        setTranslateFrom(language);
    };

    const handleTranslateTo = (language: string) => {
        setTranslateTo(language);
    };

    const handleTranslation = (language: string) => {
        if (isTranslationContent) {
            console.log(1);
            handleTranslateFrom(language);
        } else {
            console.log(2);
            handleTranslateTo(language);
        }
    };

    const handleSwapLanguage = () => {
        const tempFromLanguage = translateFrom;
        handleTranslateFrom(translateTo);
        handleTranslateTo(tempFromLanguage);
    };

    const handleTranslationTextChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const newValue = event.target.value;

        if (newValue.length <= MaxTextLength) {
            setTranslationText(newValue);
        }
    };

    const handleDetectLanguage = (translation: string) => {
        // Logic to detect language goes here
        console.log('Detect Language from translation: ', translation);
    };

    const isActiveLanguage = (language: string) => {
        const isActive = isTranslationContent ? translateFrom === language : translateTo === language;
        return isActive;
    };

    return (
        <Box
            borderRadius={5}
            bgcolor={isTranslationContent ? 'neutral.600' : 'neutral.700'}
            width='100%'
            padding={3}
            minHeight={300}
            sx={{ borderWidth: 1, borderStyle: 'solid', borderColor: 'neutral.300', opacity: 0.8 }}>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Box display='flex' gap={1.5}>
                    {isTranslationContent && (
                        <DefaultButton text='Detect Language' onClick={() => handleDetectLanguage(translationText)} />
                    )}

                    {languages.map((language) => (
                        <DefaultButton
                            key={language}
                            text={language}
                            onClick={() => handleTranslation(language)}
                            isActive={isActiveLanguage(language)}
                        />
                    ))}
                </Box>

                {!isTranslationContent && (
                    <Tooltip title='Swap Languages' placement='top' arrow>
                        <Box borderRadius={3}>
                            <DefaultButton endIcon={SwapIcon} onClick={handleSwapLanguage} />
                        </Box>
                    </Tooltip>
                )}
            </Box>

            <Divider sx={{ mt: 1.5, mb: 2, borderColor: 'neutral.200', opacity: 0.2 }} />

            <Box color='#fff'>
                {isTranslationContent ? (
                    <Box>
                        <TextField
                            multiline
                            fullWidth
                            rows={6}
                            variant='standard'
                            value={translationText}
                            onChange={(e) => setTranslationText(e.target.value)}
                            slotProps={{
                                htmlInput: { maxLength: MaxTextLength },
                                input: {
                                    disableUnderline: true,
                                    style: {
                                        color: '#fff',
                                        backgroundColor: 'transparent',
                                        borderRadius: 1,
                                        padding: 1,
                                        width: '100%',
                                    },
                                },
                            }}
                        />

                        <Box display='flex' justifyContent='flex-end' mt={0.5}>
                            <Typography variant='caption' color='neutral.200'>
                                {translationText.length}/{MaxTextLength}
                            </Typography>
                        </Box>
                    </Box>
                ) : (
                    <Box>
                        <Typography>{translationText}</Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default TranslationBox;
