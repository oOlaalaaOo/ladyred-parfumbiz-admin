import { TextInput, TextInputProps } from '@mantine/core';
import { createStyles } from '@mantine/styles';

interface IAppInput extends TextInputProps {}

const useStyles = createStyles(() => ({
    root: {
        position: 'relative',
    },
}));

const AppInput = ({ ...rest }: IAppInput) => {
    const { classes } = useStyles();

    return <TextInput classNames={classes} {...rest} />;
};

export default AppInput;
