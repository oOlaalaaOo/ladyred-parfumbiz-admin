import { Grid } from '@mantine/core';
import { GetServerSideProps } from 'next';
import { ReactElement } from 'react';
import AppHeadTitle from '../../../components/app-head-title/app-head-title';
import WithSidebarLayout from '../../../components/layouts/with-sidebar-layout/with-sidebar-layout';
import RepeatPurchaseCashouts from '../../../features/cashouts/repeat-purchase-cashouts/repeat-purchase-cashouts';
import { IAdmin } from '../../../interfaces';
import { authenticatedPage } from '../../../utils/authenticated-page';
import { NextPageWithLayout } from '../../_app';

const RepeatPurchaseCashoutPage: NextPageWithLayout<{
    admin: IAdmin;
    accessToken: string;
}> = ({ admin, accessToken }) => {
    return (
        <div>
            <AppHeadTitle />

            <Grid>
                <Grid.Col span={12}>
                    <RepeatPurchaseCashouts
                        admin={admin}
                        accessToken={accessToken}
                        title=''
                    />
                </Grid.Col>
            </Grid>
        </div>
    );
};

RepeatPurchaseCashoutPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <WithSidebarLayout pageName={'Cashout - Repeat Purchase'}>
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

export default RepeatPurchaseCashoutPage;
