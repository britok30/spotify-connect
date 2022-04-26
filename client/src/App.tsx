import React, { useEffect, useState } from 'react';
import { SpotifyApi } from './types';

import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link,
    useLocation,
} from 'react-router-dom';
import { accessToken, getCurrentUserProfile } from './spotify';
import { LoginButton } from './components/LoginButton';
import { Profile } from './components/Profile';

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
                        <Route
                            path="/"
                            element={<Profile profile={profile} />}
                        />
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
