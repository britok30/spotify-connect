import React, { useEffect, useState } from 'react';
import { accessToken, logout } from './spotify';

const App = () => {
    const [token, setToken] = useState<string | boolean | null>();

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
                <div className="flex flex-col justify-center">
                    <h1>Logged in!</h1>
                    <button onClick={logout}>Log Out</button>
                </div>
            )}
        </div>
    );
};

export default App;
