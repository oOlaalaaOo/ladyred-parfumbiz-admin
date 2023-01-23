import { Global } from '@mantine/core';

const CustomFonts = () => {
    return (
        <Global
            styles={[
                {
                    '@font-face': {
                        fontFamily: 'Inter',
                        src: `url('/assets/fonts/Inter-Bold.ttf') format("truetype")`,
                        fontWeight: 700,
                        fontStyle: 'normal',
                    },
                },
                {
                    '@font-face': {
                        fontFamily: 'Inter',
                        src: `url('/assets/fonts/Inter-Medium.ttf') format("truetype")`,
                        fontWeight: 500,
                        fontStyle: 'normal',
                    },
                },
                {
                    '@font-face': {
                        fontFamily: 'Inter',
                        src: `url('/assets/fonts/Inter-Regular.ttf') format("truetype")`,
                        fontWeight: 400,
                        fontStyle: 'normal',
                    },
                },
                {
                    '@font-face': {
                        fontFamily: 'Poppins',
                        src: `url('/assets/fonts/Poppins-Light.ttf') format("truetype")`,
                        fontWeight: 300,
                        fontStyle: 'normal',
                    },
                },
                {
                    '@font-face': {
                        fontFamily: 'Poppins',
                        src: `url('/assets/fonts/Poppins-Bold.ttf') format("truetype")`,
                        fontWeight: 700,
                        fontStyle: 'normal',
                    },
                },
                {
                    '@font-face': {
                        fontFamily: 'Poppins',
                        src: `url('/assets/fonts/Poppins-Medium.ttf') format("truetype")`,
                        fontWeight: 500,
                        fontStyle: 'normal',
                    },
                },
                {
                    '@font-face': {
                        fontFamily: 'Poppins',
                        src: `url('/assets/fonts/Poppins-Regular.ttf') format("truetype")`,
                        fontWeight: 400,
                        fontStyle: 'normal',
                    },
                },
                {
                    '@font-face': {
                        fontFamily: 'Poppins',
                        src: `url('/assets/fonts/Poppins-Light.ttf') format("truetype")`,
                        fontWeight: 300,
                        fontStyle: 'normal',
                    },
                },
            ]}
        />
    );
};

export default CustomFonts;
