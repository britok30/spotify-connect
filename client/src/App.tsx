import React, { useEffect, useState } from 'react';
import { SpotifyApi } from './types';

import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link,
    useLocation,
} from 'react-router-dom';
import { accessToken, logout, getCurrentUserProfile } from './spotify';

const App = () => {
    const [token, setToken] = useState<string | boolean | null>();
    const [profile, setProfile] =
        useState<SpotifyApi.CurrentUsersProfileResponse>(null);

    useEffect(() => {
        setToken(accessToken);

        const fetchData = async () => {
            try {
                const {
                    data,
                }: { data: SpotifyApi.CurrentUsersProfileResponse } =
                    await getCurrentUserProfile();
                setProfile(data);
            } catch (e: any) {
                console.log(e);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="bg-gray-900 h-screen flex justify-center items-center text-white">
            {!token ? (
                <LoginButton href="http://localhost:8888/login" />
            ) : (
                <Router>
                    <ScrollToTop />
                    <Routes>
                        <Route
                            path="/top-artists"
                            element={<h1>Top Artists</h1>}
                        />
                        <Route
                            path="/top-tracks"
                            element={<h1>Top Tracks</h1>}
                        />
                        <Route
                            path="/playlists/:id"
                            element={<h1>Playlist</h1>}
                        />
                        <Route path="/playlists" element={<h1>Playlists</h1>} />
                        <Route path="/" element={<Home profile={profile} />} />
                    </Routes>
                </Router>
            )}
        </div>
    );
};

export default App;

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

const Home = ({
    profile,
}: {
    profile: SpotifyApi.CurrentUsersProfileResponse;
}) => (
    <div className="flex flex-col justify-center items-start">
        <button onClick={logout}>Log Out</button>

        {profile && (
            <div>
                <h1 className="text-6xl">{profile.display_name}</h1>
                <p className="text-lg">{profile.followers.total} Followers</p>
                {profile.images.length && profile.images[0].url && (
                    <img
                        className="rounded"
                        src={profile.images[0].url}
                        alt="Avatar"
                    />
                )}
            </div>
        )}
    </div>
);

const LoginButton = ({ href }: { href: string }) => {
    return (
        <button className="bg-green-500 my-5 mx-auto text-white py-3 px-5 rounded-3xl inline-block">
            <a
                className="text-4xl"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
            >
                Login to Spotify
            </a>
        </button>
    );
};
