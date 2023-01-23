import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const LogoutPage: NextPage = () => {
    const router = useRouter();

    useEffect(() => {
        document.cookie =
            'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        router.replace('/');
    }, []);

    return <div>Redirecting...</div>;
};

export default LogoutPage;
