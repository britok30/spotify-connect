import React, { useEffect, useState } from 'react';
import { accessToken } from './spotify';

const App = () => {
    const [token, setToken] = useState<string | null>();

    useEffect(() => {
        setToken(accessToken);
    }, []);

    return (
        <div className="bg-black h-screen flex justify-center items-center text-white">
            {!token ? (
                <a
                    className="App-link"
                    href="http://localhost:8888/login"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Login to Spotify
                </a>
            ) : (
                <h1>Logged in!</h1>
            )}
        </div>
    );
};

export default App;
