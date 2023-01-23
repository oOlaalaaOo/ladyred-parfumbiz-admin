import { Grid } from '@mantine/core';
import { GetServerSideProps } from 'next';
import { ReactElement, useState } from 'react';
import AppHeadTitle from '../../../components/app-head-title/app-head-title';
import WithSidebarLayout from '../../../components/layouts/with-sidebar-layout/with-sidebar-layout';
import UnilevelCashouts from '../../../features/cashouts/unilevel-cashouts/unilevel-cashouts';
import { IAdmin } from '../../../interfaces';
import { authenticatedPage } from '../../../utils/authenticated-page';
import { NextPageWithLayout } from '../../_app';

const UnilevelCashoutPage: NextPageWithLayout<{
    admin: IAdmin;
    accessToken: string;
}> = ({ admin, accessToken }) => {
    return (
        <div>
            <AppHeadTitle />

            <Grid>
                <Grid.Col span={12}>
                    <UnilevelCashouts
                        admin={admin}
                        accessToken={accessToken}
                        title=''
                    />
                </Grid.Col>
            </Grid>
        </div>
    );
};

UnilevelCashoutPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <WithSidebarLayout pageName={'Cashout - Unilevel'}>
            {page}
        </WithSidebarLayout>
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

export default UnilevelCashoutPage;
