import { Grid } from '@mantine/core';
import { GetServerSideProps } from 'next';
import type { ReactElement } from 'react';
import { useMutation } from 'react-query';
import AppHeadTitle from '../../../components/app-head-title/app-head-title';
import WithSidebarLayout from '../../../components/layouts/with-sidebar-layout/with-sidebar-layout';
import AuthChangePassword, {
    IAuthChangePasswordSubmitProps,
} from '../../../features/auth/change-password/change-password';
import { IUser } from '../../../interfaces';
import axiosInstance from '../../../libs/axios.lib';
import { authenticatedPage } from '../../../utils/authenticated-page';
import { NextPageWithLayout } from '../../_app';

const ChangePasswordPage: NextPageWithLayout<{
    user: IUser;
    accessToken: string;
}> = ({ user, accessToken }) => {
    const mutation = useMutation<IUser, Error, IAuthChangePasswordSubmitProps>({
        mutationFn: async (formData) => {
            const resp = await axiosInstance.post<IUser>(
                '/auth/update/password',
                {
                    userId: user._id,
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            return resp.data;
        },
        onSuccess: (data) => {
            console.log('data', data);
        },
        onError: (error) => {
            console.log('error', error);
        },
    });

    return (
        <div className='change-password-page'>
            <AppHeadTitle />

            <Grid>
                <Grid.Col span={5}>
                    <AuthChangePassword
                        onSubmit={(data) => mutation.mutate(data)}
                    />
                </Grid.Col>
            </Grid>
        </div>
    );
};

ChangePasswordPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <WithSidebarLayout pageName={'Change Password'}>
            {page}
        </WithSidebarLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    return authenticatedPage(context, (user, accessToken) => {
        return {
            props: {
                user,
                accessToken,
            },
        };
    });
};

export default ChangePasswordPage;
