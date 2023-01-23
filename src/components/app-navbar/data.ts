import { IconBarcode, IconCash, IconLogout, IconUsers } from '@tabler/icons';

const MockData = {
    navbar: [
        { label: 'Users', icon: IconUsers, link: '/q/dashboard' },
        { label: 'Unique Codes', icon: IconBarcode, link: '/q/unique-codes' },
        {
            label: 'Cashout',
            icon: IconCash,
            links: [
                {
                    label: 'Unilevel',
                    link: '/q/cashout/unilevel',
                },
                {
                    label: 'Repeat purchase',
                    link: '/q/cashout/repeat-purchase',
                },
            ],
        },
        { label: 'Logout', icon: IconLogout, link: '/logout' },
    ],
};

export default MockData;
