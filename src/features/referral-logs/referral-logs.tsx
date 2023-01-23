import { Table, Text } from '@mantine/core';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { IUser } from '../../interfaces';
import axiosInstance from '../../libs/axios.lib';

interface IDirectDownlinesProps {
    user: IUser;
    accessToken: string;
}

interface IReferralLog {
    _id: string;
    referredUser: IUser;
    referrerUser: IUser;
    referralPoints: number;
    referralType: string;
    description?: string;
    createdDate: any;
    updatedDate: any;
}

const ReferralLogs: FC<IDirectDownlinesProps> = ({ user, accessToken }) => {
    const { data } = useQuery<IReferralLog[], Error>(
        'referral-logs',
        async () => {
            const resp = await axiosInstance.get(`/referral-log`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            return resp.data;
        }
    );

    return (
        <Table
            sx={() => ({
                marginTop: '24px',
            })}
            horizontalSpacing='sm'
            verticalSpacing='sm'
            striped
            highlightOnHover
            withBorder
        >
            <thead>
                <tr>
                    <th>Referred Name</th>
                    <th>Referral Points</th>
                    <th>Description</th>
                    <th>Created Date</th>
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
                        <td>{d.referredUser.name}</td>
                        <td>{d.referralPoints}</td>
                        <td>{d.description}</td>
                        <td>{d.createdDate}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default ReferralLogs;
