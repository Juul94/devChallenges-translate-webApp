import { Box, Button, CircularProgress, Divider, TextareaAutosize, TextField, Tooltip, Typography } from '@mui/material';
import DefaultButton from './defaultButton';
import { MaxTextLength } from '@type/default';
import swapIcon from '@icons/Horizontal_top_left_main.svg';
import copyIcon from '@icons/Copy.svg';
import soundIcon from '@icons/sound_max_fill.svg';
import translateIcon from '@icons/Sort_alfa.svg';
import { useLazyDetectLanguageQuery } from '@services/detectLanguage-api';
import { languageMap } from '@data/languages';
import { useEffect, useState } from 'react';

interface TranslationBoxProps {
    isTranslationContent?: boolean; // True: Show input content, False: Show output content
    translationText: string;
    setTranslationText: (text: string) => void;
    translateFrom: string;
    translateTo: string;
    setTranslateFrom: (lang: string) => void;
    setTranslateTo: (lang: string) => void;
    languages: string[];
    handleTranslateText: () => void; // Function to run API to translate the text when the user click the translate button
    isLoading?: boolean; // Loading (Incl. fetching) state for translation text
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
    handleTranslateText,
    isLoading,
}) => {
    /*
     *  HOOKS
     */

    const [showLanguageDetection, setSetLanguageDetection] = useState<boolean>(false);

    useEffect(() => {
        setSetLanguageDetection(false);
    }, [translationText]);

    /*
     *  API CALLS
     */

    const [triggerLanguageDetection, { data: languageDetectionData }] = useLazyDetectLanguageQuery();

    /*
     *  LOCAL STATES
     */

    const SwapIcon = <img src={swapIcon} alt='Swap' />;
    const CopyIcon = <img src={copyIcon} alt='Copy' />;
    const SoundIcon = <img src={soundIcon} alt='Sound' />;
    const TranslateIcon = <img src={translateIcon} alt='Translate' />;

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
        setSetLanguageDetection(false);

        if (isTranslationContent) {
            handleTranslateFrom(language);
        } else {
            handleTranslateTo(language);
        }
    };

    const handleSwapLanguage = () => {
        const tempFromLanguage = translateFrom;
        handleTranslateFrom(translateTo);
        handleTranslateTo(tempFromLanguage);
        setTranslationText(translationText);
    };

    const handleDetectLanguage = async (text: string) => {
        await triggerLanguageDetection(text)
            .unwrap()
            .then(() => setSetLanguageDetection(true));
    };

    const isActiveLanguage = (language: string) => {
        const isActive = isTranslationContent ? translateFrom === language : translateTo === language;
        return isActive;
    };

    const handleCopyText = () => {
        navigator.clipboard.writeText(translationText).then(() => {
            // To do: Show snackbar message to the user
            console.log('Text copied to clipboard:', translationText);
        });
    };

    const handleSpeakText = () => {
        const utterance = new SpeechSynthesisUtterance(translationText);
        utterance.lang = isTranslationContent ? translateFrom : translateTo;
        window.speechSynthesis.speak(utterance);
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
                            disabled={isLoading}
                            sx={{ '&.Mui-disabled': { color: '#fff' } }}
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

            <Box minHeight={175}>
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

                        <Box
                            display='flex'
                            justifyContent={showLanguageDetection ? 'space-between' : 'flex-end'}
                            alignItems='center'
                            my={2}>
                            {showLanguageDetection && (
                                <Box display='flex' gap={1}>
                                    <Typography variant='caption' color='#fff'>
                                        Detected Language:
                                    </Typography>

                                    <Typography variant='caption' color='#fff' fontWeight='bold'>
                                        {languageDetectionData}
                                    </Typography>
                                </Box>
                            )}

                            <Typography variant='caption' color='neutral.200'>
                                {translationText.length}/{MaxTextLength}
                            </Typography>
                        </Box>
                    </Box>
                ) : (
                    <Box display='flex' height={175}>
                        {isLoading && translationText ? (
                            <Box width='100%' height='100%' display='flex' alignItems='center' justifyContent='center'>
                                {translationText.length !== 0 && <CircularProgress />}

                                <Typography variant='h6' fontWeight='normal' color='#fff' pl={2}>
                                    {translationText.length === 0 ? 'No translation available' : 'Translating...'}
                                </Typography>
                            </Box>
                        ) : (
                            <Typography color='#fff'>{translationText}</Typography>
                        )}
                    </Box>
                )}
            </Box>

            <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Box display='flex' gap={1}>
                    <Tooltip title='Copy' placement='top' arrow>
                        <Box borderRadius={3}>
                            <DefaultButton endIcon={CopyIcon} onClick={handleCopyText} />
                        </Box>
                    </Tooltip>

                    <Tooltip title='Listen' placement='top' arrow>
                        <Box borderRadius={3}>
                            <DefaultButton endIcon={SoundIcon} onClick={handleSpeakText} />
                        </Box>
                    </Tooltip>
                </Box>

                {isTranslationContent && (
                    <Button
                        variant='contained'
                        color='info'
                        startIcon={TranslateIcon}
                        onClick={handleTranslateText}
                        disabled={isLoading}
                        sx={{
                            backgroundColor: 'blue.main',
                            borderColor: 'blue.secondary',
                            borderWidth: 1,
                            borderStyle: 'solid',
                            borderRadius: 3,
                            px: 3,
                            py: 1.5,
                            color: '#fff',
                            '&:hover': { backgroundColor: 'info.dark' },
                            '&.Mui-disabled': { color: '#fff', backgroundColor: 'blue.main' },
                        }}>
                        Translate
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default TranslationBox;
