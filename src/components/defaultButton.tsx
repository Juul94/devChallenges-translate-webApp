import { Button } from '@mui/material';
import { alpha, SxProps } from '@mui/material/styles';
import { ReactElement } from 'react';

interface DefaultButtonProps {
    text?: string; // Optional, since an endIcon or startIcon can be used alone
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
    sx?: SxProps;
}

const DefaultButton: React.FC<DefaultButtonProps> = ({ text, onClick, isActive, startIcon, endIcon, disabled, sx }) => (
    <Button
        variant='text'
        onClick={onClick}
        startIcon={startIcon}
        endIcon={endIcon}
        disabled={disabled}
        sx={{
            ...sx,
            color: 'neutral.100',
            textTransform: 'capitalize',
            px: 1,
            py: 0.5,
            borderRadius: 3,
            minWidth: text ? 'auto' : 35,
            width: text ? 'auto' : 35,
            height: text ? 'auto' : 35,
            '&:hover': {
                backgroundColor: (theme) => alpha(theme.palette.neutral[200], 0.4),
            },
            ...(isActive && {
                backgroundColor: (theme) => alpha(theme.palette.neutral[200], 0.4),
            }),
            ...(!text && {
                maxWidth: 40,
                '.MuiButton-icon': { margin: 0 },
                borderWidth: 2.25,
                borderStyle: 'solid',
                borderColor: (theme) => alpha(theme.palette.neutral[200], 0.4),
                '&:hover': {
                    backgroundColor: (theme) => alpha(theme.palette.neutral[200], 0.25),
                    // Change color of the svg icon on hover
                    svg: {
                        fill: 'red',
                    },
                },
            }),
        }}>
        {text}
    </Button>
);

export default DefaultButton;
