import Head from 'next/head';
import { CONSTANTS } from '../../utils/constants';

const AppHeadTitle = () => {
    return (
        <Head>
            <title>{CONSTANTS.APP_NAME}</title>
        </Head>
    );
};

export default AppHeadTitle;
