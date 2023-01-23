import { GetServerSidePropsContext, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { IAdmin } from '../interfaces';

export const authenticatedPage = async (
    context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
    cb: (admin: IAdmin, accessToken: string) => any
) => {
    const { cookies } = context.req;

    if (typeof cookies['accessToken'] === 'undefined') {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    const resp = await fetch(`${process.env.API_BASE_URL}/auth/admin/me`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${cookies['accessToken']}`,
            'Content-Type': 'application/json',
        },
    });

    if (resp.status !== 200) {
        context.res.setHeader('Set-Cookie', [
            `accessToken=; Max-Age=0; path=/`,
        ]);

        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    const result = await resp.json();

    return cb(result, cookies['accessToken']);
};
