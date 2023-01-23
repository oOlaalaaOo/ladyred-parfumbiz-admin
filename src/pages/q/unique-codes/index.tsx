import { Grid } from '@mantine/core';
import { GetServerSideProps } from 'next';
import { ReactElement } from 'react';
import AppHeadTitle from '../../../components/app-head-title/app-head-title';
import WithSidebarLayout from '../../../components/layouts/with-sidebar-layout/with-sidebar-layout';
import UniqueCodes from '../../../features/unique-codes/unique-codes';
import { IAdmin } from '../../../interfaces';
import { authenticatedPage } from '../../../utils/authenticated-page';
import { NextPageWithLayout } from '../../_app';

const UniqueCodesPage: NextPageWithLayout<{
    admin: IAdmin;
    accessToken: string;
}> = ({ admin, accessToken }) => {
    return (
        <div>
            <AppHeadTitle />

            <Grid>
                <Grid.Col span={12}>
                    <UniqueCodes admin={admin} accessToken={accessToken} />
                </Grid.Col>
            </Grid>
        </div>
    );
};

UniqueCodesPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <WithSidebarLayout pageName={'Unique Codes'}>{page}</WithSidebarLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    return authenticatedPage(context, (admin, accessToken) => {
        return {
            props: {
                admin,
                accessToken,
            },
        };
    });
};

export default UniqueCodesPage;
