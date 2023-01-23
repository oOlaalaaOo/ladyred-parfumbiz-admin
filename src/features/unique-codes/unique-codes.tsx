import { Center, Pagination, Table, Text } from '@mantine/core';
import { FC, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import AppButton from '../../components/app-button/app-button';
import AppNotification from '../../components/app-notification/app-notification';
import { IAdmin } from '../../interfaces';
import axiosInstance from '../../libs/axios.lib';

interface IUniqueCodeProps {
    admin: IAdmin;
    accessToken: string;
}

interface IUniqueCode {
    _id: string;
    code: string;
    status: string;
    createdDate: any;
}

const UniqueCodes: FC<IUniqueCodeProps> = ({ admin, accessToken }) => {
    const [showNotification, setShowNotification] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);

    const { data } = useQuery<
        { total: number; page: number; uniqodes: IUniqueCode[] },
        Error
    >(
        ['unique-codes', page],
        async () => {
            const resp = await axiosInstance.get(`/unique-code?page=${page}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            return resp.data;
        },
        { keepPreviousData: true }
    );

    const copyCode = (code: string) => {
        navigator.clipboard.writeText(code).then(() => {
            setShowNotification(true);
        });
    };

    const totalPage = useMemo(() => {
        return Number(data?.total || 10) / 10;
    }, [data]);

    return (
        <>
            <Table
                horizontalSpacing='sm'
                verticalSpacing='sm'
                striped
                highlightOnHover
            >
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Status</th>
                        <th>Created Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.uniqodes && data.uniqodes.length === 0 ? (
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

                    {data &&
                        data.uniqodes &&
                        data.uniqodes.map((d) => (
                            <tr key={d._id}>
                                <td>{d.code}</td>
                                <td>{d.status}</td>
                                <td>{d.createdDate}</td>
                                <td>
                                    <AppButton
                                        variant='filled'
                                        size='xs'
                                        onClick={() => copyCode(d.code)}
                                    >
                                        Copy Code
                                    </AppButton>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>

            <Center>
                <Pagination
                    sx={() => ({
                        marginTop: '30px',
                    })}
                    total={totalPage}
                    page={page}
                    onChange={(page) => setPage(page)}
                />
            </Center>

            {showNotification === true ? (
                <AppNotification
                    title='Success'
                    message='Code copied!'
                    mode='success'
                    onClose={() => setShowNotification(false)}
                />
            ) : null}
        </>
    );
};

export default UniqueCodes;
