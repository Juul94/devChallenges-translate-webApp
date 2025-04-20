import React from 'react';
import { Box } from '@mui/material';
import heroImg from '@images/hero_img.jpg';
import logo from '@icons/logo.svg';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <Box
            minHeight='100vh'
            width='100%'
            bgcolor='#000000'
            sx={{
                position: 'relative',
                backgroundImage: `url(${heroImg})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'top',
                backgroundSize: 'auto',
                overflow: 'hidden',
            }}>
            {/* Gradient fade from bottom of the image upward */}
            <Box
                position='absolute'
                bottom={0}
                left={0}
                width='100%'
                height='80%'
                zIndex={1}
                sx={{
                    background: 'linear-gradient(to top, #000 60%, rgba(0,0,0,0))',
                    pointerEvents: 'none',
                }}
            />

            {/* Content over gradient and image */}
            <Box width={1280} position='relative' zIndex={2} margin='0 auto'>
                <Box width='100%' display='flex' justifyContent='center' pt={12}>
                    <img src={logo} alt='Logo' width='130px' />
                </Box>

                <Box>{children}</Box>
            </Box>
        </Box>
    );
};

export default Layout;
