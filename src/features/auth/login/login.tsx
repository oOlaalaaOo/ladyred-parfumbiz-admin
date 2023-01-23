import { Center, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import AppButton from '../../../components/app-button/app-button';
import AppInput from '../../../components/app-input/app-input';
import styles from './login.module.scss';

export interface IAuthLoginSubmitProps {
    username: string;
    password: string;
}

interface IAuthLogin {
    onSubmit: (values: IAuthLoginSubmitProps) => void;
}

const AuthLogin = ({ onSubmit }: IAuthLogin) => {
    const router = useRouter();

    const form = useForm({
        initialValues: {
            username: '',
            password: '',
        },

        validate: {
            username: (value) =>
                value.length === 0 ? 'Username is required.' : null,
            password: (value) =>
                value.length === 0 ? 'Password is required.' : null,
        },
    });

    return (
        <form
            className={styles['login-form']}
            onSubmit={form.onSubmit((values) => onSubmit(values))}
        >
            <div className={styles['login-form__field']}>
                <AppInput
                    placeholder='Enter your username here'
                    label='Username'
                    name='username'
                    autoComplete='username'
                    {...form.getInputProps('username')}
                />
            </div>
            <div className={styles['login-form__field']}>
                <AppInput
                    placeholder='Enter your password here'
                    label='Password'
                    type='password'
                    name='password'
                    autoComplete='password'
                    {...form.getInputProps('password')}
                />
            </div>
            <div className={styles['login-form__field']}>
                <AppButton
                    fullWidth
                    type='submit'
                    sx={() => ({ marginTop: '30px' })}
                >
                    Login
                </AppButton>
            </div>
        </form>
    );
};

export default AuthLogin;
