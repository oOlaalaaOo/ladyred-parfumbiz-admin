import { Navbar, Group, Code, ScrollArea, Text, Title } from '@mantine/core';
import { Icon3dCubeSphere } from '@tabler/icons';
import useAppNavbarStyles from './app-navbar.styles';
import MockData from './data';
import { LinksGroup } from './navbar-links-group';

const { navbar: navbarMockData } = MockData;

const AppNavbar = () => {
    const { classes } = useAppNavbarStyles();

    const links = navbarMockData.map((item) => (
        <LinksGroup {...item} key={item.label} />
    ));

    return (
        <Navbar
            height={800}
            p='md'
            className={classes.navbar}
        >
            <Navbar.Section className={classes.header}>
                <Group position='apart'>
                    <Code
                        sx={() => ({
                            fontSize: '20px',
                            fontWeight: 700,
                            color: '#DC3535',
                        })}
                    >
                        Ladyred Parfumbiz
                    </Code>

                    <Icon3dCubeSphere
                        color='#DC3535'
                        width='30px'
                        height='30px'
                    />
                </Group>
            </Navbar.Section>

            <Navbar.Section
                grow
                className={classes.links}
                component={ScrollArea}
            >
                <div className={classes.linksInner}>{links}</div>
            </Navbar.Section>
        </Navbar>
    );
};

export default AppNavbar;
