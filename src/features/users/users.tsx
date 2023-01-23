import { Table, Text, Title } from '@mantine/core';
import { useQuery } from 'react-query';
import { IAdmin, IUser } from '../../interfaces';
import axiosInstance from '../../libs/axios.lib';

interface IUsersProps {
    title?: string;
    admin: IAdmin;
    accessToken: string;
}

const Users = ({ title = 'Users', admin, accessToken }: IUsersProps) => {
    const { data } = useQuery<IUser[], Error>('users', async () => {
        const resp = await axiosInstance.get<IUser[]>(`/user`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return resp.data;
    });

    return (
        <>
            <Title>{title}</Title>

            {typeof data === 'undefined' || data.length === 0 ? (
                <Text
                    fz='sm'
                    sx={() => ({
                        marginTop: '24px',
                    })}
                >
                    No users.
                </Text>
            ) : (
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
                            <th>Mobile no.</th>
                            <th>Unilevel points</th>
                            <th>Repeat purchase points</th>
                            <th>Registered date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((d) => (
                            <tr key={d._id}>
                                <td>{d.name}</td>
                                <td>{d.mobileNo}</td>
                                <td>{d.unilevelPoints}</td>
                                <td>{d.repeatPurchasePoints}</td>
                                <td>{d.createdDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default Users;
