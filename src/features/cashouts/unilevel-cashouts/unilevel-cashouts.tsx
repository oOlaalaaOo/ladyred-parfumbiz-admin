import { Table, Text, Title, Modal, Group } from '@mantine/core';
import { useQuery, useMutation } from 'react-query';
import AppButton from '../../../components/app-button/app-button';
import { IAdmin, ICashout } from '../../../interfaces';
import axiosInstance from '../../../libs/axios.lib';
import { useState } from 'react';

interface IUnilevelCashoutsProps {
    title?: string;
    admin: IAdmin;
    accessToken: string;
}

const UnilevelCashouts = ({
    title = 'Users',
    admin,
    accessToken,
}: IUnilevelCashoutsProps) => {
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [showDenyModal, setShowDenyModal] = useState<boolean>(false);
    const [showPaidModal, setShowPaidModal] = useState<boolean>(false);
    const [selectedCashout, setSelectedCashout] = useState<string>('');

    const { data } = useQuery<ICashout[], Error>(
        'unilevel-cashouts',
        async () => {
            const resp = await axiosInstance.get<ICashout[]>(
                `/cashout/unilevel`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            return resp.data;
        }
    );

    const denyCashoutMutation = useMutation<
        ICashout,
        Error,
        { cashoutId: string }
    >({
        mutationFn: async (formData) => {
            const resp = await axiosInstance.post<ICashout>(
                '/cashout/deny',
                formData,
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

    const paidCashoutMutation = useMutation<
        ICashout,
        Error,
        { cashoutId: string }
    >({
        mutationFn: async (formData) => {
            const resp = await axiosInstance.post<ICashout>(
                '/cashout/paid',
                formData,
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

    const confirmCashoutMutation = useMutation<
        ICashout,
        Error,
        { cashoutId: string; cashoutType: string }
    >({
        mutationFn: async (formData) => {
            const resp = await axiosInstance.post<ICashout>(
                '/cashout/confirm',
                formData,
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
        <>
            <Title>{title}</Title>

            <Table
                sx={() => ({
                    marginTop: '24px',
                })}
                horizontalSpacing='sm'
                verticalSpacing='sm'
                striped
                highlightOnHover
            >
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Member Unilevel points</th>
                        <th>Cashout Amount</th>
                        <th>Mobile no.</th>
                        <th>Status</th>
                        <th>Created date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data?.length === 0 ? (
                        <tr>
                            <td
                                colSpan={4}
                                style={{
                                    textAlign: 'center',
                                }}
                            >
                                <Text fz='sm'>No data.</Text>
                            </td>
                        </tr>
                    ) : null}

                    {data?.map((d) => (
                        <tr key={d._id}>
                            <td>{d.user.name}</td>
                            <td>{d.userUnilevelPoints}</td>
                            <td>{d.cashoutAmount}</td>
                            <td>{d.userMobileNo}</td>
                            <td>{d.status}</td>
                            <td>{d.createdDate}</td>
                            <td>
                                {d.status === 'pending' ? (
                                    <>
                                        <AppButton
                                            variant='outline'
                                            size='xs'
                                            sx={() => ({
                                                marginRight: '5px',
                                            })}
                                            onClick={() => {
                                                setShowDenyModal(true);
                                                setSelectedCashout(d._id);
                                            }}
                                        >
                                            Deny
                                        </AppButton>

                                        <AppButton
                                            variant='filled'
                                            size='xs'
                                            onClick={() => {
                                                setShowConfirmModal(true);
                                                setSelectedCashout(d._id);
                                            }}
                                        >
                                            Confirm
                                        </AppButton>
                                    </>
                                ) : null}

                                {d.status === 'confirmed' ? (
                                    <AppButton
                                        variant='filled'
                                        size='xs'
                                        onClick={() => {
                                            setShowPaidModal(true);
                                            setSelectedCashout(d._id);
                                        }}
                                    >
                                        Paid
                                    </AppButton>
                                ) : null}

                                {d.status === 'denied' ? (
                                    <AppButton
                                        variant='filled'
                                        size='xs'
                                        onClick={() => {
                                            setShowConfirmModal(true);
                                            setSelectedCashout(d._id);
                                        }}
                                    >
                                        Confirm
                                    </AppButton>
                                ) : null}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal
                centered
                opened={showDenyModal}
                onClose={() => setShowDenyModal(false)}
                title='Deny Cashout'
            >
                <Text>Are you sure?</Text>

                <Group>
                    <AppButton variant='outline'>Cancel</AppButton>
                    <AppButton
                        variant='filled'
                        onClick={() =>
                            denyCashoutMutation.mutate({
                                cashoutId: selectedCashout,
                            })
                        }
                    >
                        Deny
                    </AppButton>
                </Group>
            </Modal>

            <Modal
                centered
                opened={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                title='Confirm Cashout'
            >
                <Text>Are you sure?</Text>

                <Group>
                    <AppButton variant='outline'>Cancel</AppButton>
                    <AppButton
                        variant='filled'
                        onClick={() =>
                            confirmCashoutMutation.mutate({
                                cashoutId: selectedCashout,
                                cashoutType: 'unilevel',
                            })
                        }
                    >
                        Confirm
                    </AppButton>
                </Group>
            </Modal>

            <Modal
                centered
                opened={showPaidModal}
                onClose={() => setShowPaidModal(false)}
                title='Paid Cashout'
            >
                <Text>Are you sure?</Text>

                <Group>
                    <AppButton variant='outline'>Cancel</AppButton>
                    <AppButton
                        variant='filled'
                        onClick={() =>
                            paidCashoutMutation.mutate({
                                cashoutId: selectedCashout,
                            })
                        }
                    >
                        Mark as paid
                    </AppButton>
                </Group>
            </Modal>
        </>
    );
};

export default UnilevelCashouts;
