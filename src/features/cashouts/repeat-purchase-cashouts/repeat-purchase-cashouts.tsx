import { Table, Text, Title } from '@mantine/core';
import { useQuery } from 'react-query';
import { IAdmin, ICashout, IUser } from '../../../interfaces';
import axiosInstance from '../../../libs/axios.lib';

interface IRepeatPurchaseCashoutsProps {
    title?: string;
    admin: IAdmin;
    accessToken: string;
}

const RepeatPurchaseCashouts = ({
    title = 'Users',
    admin,
    accessToken,
}: IRepeatPurchaseCashoutsProps) => {
    const { data } = useQuery<ICashout[], Error>(
        'unilevel-cashouts',
        async () => {
            const resp = await axiosInstance.get<ICashout[]>(
                `/cashout/repeat-purchase`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            return resp.data;
        }
    );

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
                withBorder
            >
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Member repeat-purchase points</th>
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
                            <td>{d.userRepeatPurchasePoints}</td>
                            <td>{d.cashoutAmount}</td>
                            <td>{d.userMobileNo}</td>
                            <td>{d.status}</td>
                            <td>{d.createdDate}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default RepeatPurchaseCashouts;
