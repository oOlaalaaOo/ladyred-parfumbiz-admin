import { Grid, Title } from '@mantine/core';
import AppNavbar from '../../app-navbar/app-navbar';
import styles from './with-sidebar-layout.module.scss';

const WithSidebarLayout = ({
    pageName,
    children,
}: {
    pageName: string;
    children: any;
}) => {
    return (
        <Grid>
            <Grid.Col span={3}>
                <AppNavbar />
            </Grid.Col>
            <Grid.Col span={9}>
                <div className={styles['with-sidebar-layout__content']}>
                    <Title
                        sx={() => ({
                            marginBottom: '30px',
                        })}
                    >
                        {pageName}
                    </Title>

                    {children}
                </div>
            </Grid.Col>
        </Grid>
    );
};

export default WithSidebarLayout;
