require('dotenv').config();
import express, { Express, query, Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';

const app: Express = express();
const querystring = require('querystring');
const PORT: number = 8888;

const CLIENT_ID: string = process.env.CLIENT_ID;
const CLIENT_SECRET: string = process.env.CLIENT_SECRET;
const REDIRECT_URI: string = process.env.REDIRECT_URI;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello world');
});

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = (length: number): string => {
    let text: string = '';
    const possible: string =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

const stateKey = 'spotify_auth_state';

app.get('/login', (req: Request, res: Response) => {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    const scope = [
        'user-read-private',
        'user-read-email',
        'user-top-read',
    ].join(' ');

    const queryParams = querystring.stringify({
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
        state: state,
        scope: scope,
    });

    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

app.get('/callback', (req: Request, res: Response) => {
    const code = req.query.code || null;

    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: querystring.stringify({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URI,
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(
                `${CLIENT_ID}:${CLIENT_SECRET}`
            ).toString('base64')}`,
        },
    })
        .then((response: AxiosResponse<any, any>) => {
            if (response.status === 200) {
                const {
                    access_token,
                    refresh_token,
                    expires_in,
                }: {
                    access_token: string;
                    refresh_token: string;
                    expires_in: number;
                } = response.data;
                const queryParams = querystring.stringify({
                    access_token,
                    refresh_token,
                    expires_in,
                });
                // Redirect to react app
                res.redirect(`http://localhost:3000/?${queryParams}`);
                // pass along tokens in query params
            } else {
                res.redirect(
                    `/?${querystring.stringify({
                        error: 'invalid_token',
                    })}`
                );
            }
        })
        .catch((error: any) => res.send(error));
});

app.get('/refresh_token', (req: Request, res: Response) => {
    const { refresh_token } = req.query;

    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token: refresh_token,
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(
                `${CLIENT_ID}:${CLIENT_SECRET}`
            ).toString('base64')}`,
        },
    })
        .then((response: AxiosResponse<any, any>) => {
            res.send(response.data);
        })
        .catch((error: any) => {
            res.send(error);
        });
});

app.listen(PORT, () => {
    console.log(`Express app listening at http://localhost:${PORT}`);
});
