import { Notification, Portal } from '@mantine/core';
import {
    IconAlertCircle,
    IconCheck,
    IconExclamationCircle,
    IconInfoCircle,
} from '@tabler/icons';
import { FC } from 'react';

interface IAppNotificationProps {
    title: string;
    message: string;
    mode: 'success' | 'error' | 'info' | 'warning';
    onClose?: () => void;
}

const AppNotification: FC<IAppNotificationProps> = ({
    title,
    message,
    mode,
    onClose,
}) => {
    const iconMode = () => {
        switch (mode) {
            case 'success':
                return <IconCheck size={18} />;
            case 'error':
                return <IconExclamationCircle size={18} />;
            case 'info':
                return <IconInfoCircle size={18} />;
            case 'warning':
                return <IconAlertCircle size={18} />;
        }
    };

    const colorMode = () => {
        switch (mode) {
            case 'success':
                return 'green';
            case 'warning':
                return 'lime';
            case 'error':
                return 'red';
            case 'info':
                return 'cyan';
            default:
                return 'blue';
        }
    };

    return (
        <Portal target='#app-notification-container'>
            <Notification
                title={title}
                icon={iconMode()}
                color={colorMode()}
                onClose={() => {
                    if (onClose) onClose();
                }}
            >
                {message}
            </Notification>
        </Portal>
    );
};

export default AppNotification;
