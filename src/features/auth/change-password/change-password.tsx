import { useForm } from '@mantine/form';
import AppButton from '../../../components/app-button/app-button';
import AppInput from '../../../components/app-input/app-input';
import styles from './change-password.module.scss';

export interface IAuthChangePasswordSubmitProps {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

interface IAuthChangePassword {
    onSubmit: (values: IAuthChangePasswordSubmitProps) => void;
}

const AuthChangePassword = ({ onSubmit }: IAuthChangePassword) => {
    const form = useForm({
        initialValues: {
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        },
        validate: {
            currentPassword: (value) =>
                value.length === 0 ? 'Current password is required.' : null,
            newPassword: (value) =>
                value.length === 0 ? 'New password is required.' : null,
            confirmNewPassword: (value, values) =>
                value !== values.newPassword
                    ? 'New password did not matched.'
                    : null,
        },
    });

    return (
        <form
            className={styles['change-password-form']}
            onSubmit={form.onSubmit((values) => onSubmit(values))}
        >
            <div className={styles['change-password-form__field']}>
                <AppInput
                    placeholder='Enter current password'
                    label='Current password'
                    name='currentPassword'
                    type='password'
                    autoComplete='currentPassword'
                    {...form.getInputProps('currentPassword')}
                />
            </div>

            <div className={styles['change-password-form__field']}>
                <AppInput
                    placeholder='Enter new password'
                    label='New password'
                    name='newPassword'
                    type='password'
                    autoComplete='newPassword'
                    {...form.getInputProps('newPassword')}
                />
            </div>

            <div className={styles['change-password-form__field']}>
                <AppInput
                    placeholder='Enter confirm new password'
                    label='Confirm new password'
                    name='confirmNewPassword'
                    type='password'
                    autoComplete='confirmNewPassword'
                    {...form.getInputProps('confirmNewPassword')}
                />
            </div>

            <div className={styles['change-password-form__field']}>
                <AppButton
                    fullWidth
                    type='submit'
                    sx={() => ({ marginTop: '30px' })}
                >
                    Submit new password
                </AppButton>
            </div>
        </form>
    );
};

export default AuthChangePassword;
