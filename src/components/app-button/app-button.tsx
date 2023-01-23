import { Button, ButtonProps, createStyles } from '@mantine/core';
import { MouseEventHandler } from 'react';

interface IAppButton extends ButtonProps {
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

const useStyles = createStyles(() => ({}));

const AppButton = ({ children, onClick, ...rest }: IAppButton) => {
    const { classes } = useStyles();

    return (
        <Button classNames={classes} onClick={onClick} {...rest}>
            {children}
        </Button>
    );
};

export default AppButton;
