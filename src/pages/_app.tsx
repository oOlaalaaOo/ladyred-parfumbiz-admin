import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import CustomFonts from '../components/custom-fonts';
import type { NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <QueryClientProvider client={queryClient}>
            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                    colorScheme: 'light',
                    fontFamily: 'Inter',
                    headings: { fontFamily: 'Poppins' },
                }}
            >
                <CustomFonts />
                <div
                    id='app-notification-container'
                    style={{
                        position: 'absolute',
                        width: '25vw',
                        height: '100vh',
                        top: '10px',
                        right: '10px'
                    }}
                />
                {getLayout(<Component {...pageProps} />)}
            </MantineProvider>
        </QueryClientProvider>
    );
};

export default MyApp;
