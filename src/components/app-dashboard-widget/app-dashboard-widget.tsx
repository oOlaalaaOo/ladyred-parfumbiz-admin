import { createStyles, Paper, Text, ThemeIcon } from '@mantine/core';
import { IconAffiliate } from '@tabler/icons';

const ICON_SIZE = 60;

const useStyles = createStyles((theme) => ({
    card: {
        position: 'relative',
        overflow: 'visible',
        padding: theme.spacing.xl,
        paddingTop: theme.spacing.xl * 1.5 + ICON_SIZE / 3,
    },
    icon: {
        position: 'absolute',
        top: -ICON_SIZE / 3,
        left: `calc(50% - ${ICON_SIZE / 2}px)`,
    },
    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        lineHeight: 1,
    },
}));

interface IAppDashboardWidgetProps {
    title: string;
    subtitle: string;
    balance: string;
    ctaComponent?: JSX.Element;
}

const AppDashboardWidget = ({
    title,
    subtitle,
    balance,
    ctaComponent,
}: IAppDashboardWidgetProps) => {
    const { classes } = useStyles();

    return (
        <Paper
            radius='md'
            withBorder
            className={classes.card}
            mt={ICON_SIZE / 3}
        >
            <ThemeIcon
                className={classes.icon}
                size={ICON_SIZE}
                radius={ICON_SIZE}
            >
                <IconAffiliate size={34} stroke={1.5} />
            </ThemeIcon>

            <Text align='center' weight={700} className={classes.title}>
                {title}
            </Text>
            <Text color='dimmed' align='center' size='sm'>
                {subtitle}
            </Text>

            <Text
                align='center'
                weight={700}
                size={32}
                sx={() => ({
                    marginTop: '24px',
                })}
            >
                {balance}
            </Text>

            {ctaComponent ? ctaComponent : null}
        </Paper>
    );
};

export default AppDashboardWidget;
