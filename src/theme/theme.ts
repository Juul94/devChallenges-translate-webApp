// theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        neutral: {
            100: '#F9FAFB',
            200: '#D2D5DA',
            300: '#4D5562',
            400: '#394150',
            500: '#212936CC',
            600: '#121826CC',
            700: '#040711',
        },
        blue: {
            main: '#263FA9',
            light: '#7CA9F3',
        },
    },
});

export default theme;

// Below defines a custom theme for a Material-UI application using the `createTheme` function

declare module '@mui/material/styles' {
    interface Palette {
        neutral: {
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
        };
        blue: Palette['primary']; // Treat like a regular color
    }

    interface PaletteOptions {
        neutral?: {
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
        };
        blue?: PaletteOptions['primary'];
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        blue: true;
    }
}

declare module '@mui/material/Typography' {
    interface TypographyPropsColorOverrides {
        blue: true;
        neutral: true;
    }
}
