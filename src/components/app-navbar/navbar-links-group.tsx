import { useState } from 'react';
import {
    Group,
    Box,
    Collapse,
    ThemeIcon,
    Text,
    UnstyledButton,
} from '@mantine/core';
import {
    TablerIcon,
    IconCalendarStats,
    IconChevronLeft,
    IconChevronRight,
} from '@tabler/icons';
import useNavbarLinksGroupStyles from './navbar-links-group.styles';
import { useRouter } from 'next/router';

interface LinksGroupProps {
    icon: TablerIcon;
    label: string;
    initiallyOpened?: boolean;
    link?: string;
    links?: Array<{ label: string; link: string }>;
}

export const LinksGroup = ({
    icon: Icon,
    label,
    initiallyOpened,
    link,
    links,
}: LinksGroupProps) => {
    const router = useRouter();
    const { classes, theme } = useNavbarLinksGroupStyles();
    const hasLinks = Array.isArray(links);
    const [opened, setOpened] = useState(initiallyOpened || false);
    const ChevronIcon =
        theme.dir === 'ltr' ? IconChevronRight : IconChevronLeft;

    const items = !links
        ? []
        : links.map((link_) => (
              <Text<'a'>
                  component='a'
                  className={classes.link}
                  key={link_.label}
                  onClick={(event) => {
                      event.preventDefault();

                      router.push(link_.link);
                  }}
              >
                  {link_.label}
              </Text>
          ));

    return (
        <>
            <UnstyledButton
                onClick={() => {
                    if (!hasLinks) {
                        if (link) router.push(link);
                    } else {
                        setOpened((o) => !o);
                    }
                }}
                className={classes.control}
            >
                <Group position='apart' spacing={0}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ThemeIcon variant='light' size={30}>
                            <Icon size={18} />
                        </ThemeIcon>
                        <Box ml='md'>{label}</Box>
                    </Box>

                    {hasLinks && (
                        <ChevronIcon
                            className={classes.chevron}
                            size={14}
                            stroke={1.5}
                            style={{
                                transform: opened
                                    ? `rotate(${
                                          theme.dir === 'rtl' ? -90 : 90
                                      }deg)`
                                    : 'none',
                            }}
                        />
                    )}
                </Group>
            </UnstyledButton>

            {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
        </>
    );
};

const mockdata = {
    label: 'Releases',
    icon: IconCalendarStats,
    links: [
        { label: 'Upcoming releases', link: '/' },
        { label: 'Previous releases', link: '/' },
        { label: 'Releases schedule', link: '/' },
    ],
};

const NavbarLinksGroup = () => {
    return (
        <Box
            sx={(theme) => ({
                minHeight: 220,
                padding: theme.spacing.md,
                backgroundColor:
                    theme.colorScheme === 'dark'
                        ? theme.colors.dark[6]
                        : theme.white,
            })}
        >
            <LinksGroup {...mockdata} />
        </Box>
    );
};

export default NavbarLinksGroup;
