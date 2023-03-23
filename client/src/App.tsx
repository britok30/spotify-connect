import React, { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { accessToken, logout } from "./spotify";
import { LoginButton } from "./components/LoginButton";
import { Profile } from "./components/Profile";
import TopArtists from "./components/TopArtists";
import TopTracks from "./components/TopTracks";
import Playlists from "./components/Playlists";
import Playlist from "./components/Playlist";
import Artist from "./components/Artist";

const App = () => {
  const [token, setToken] = useState<string | boolean | null>();

  useEffect(() => {
    setToken(accessToken);
  }, []);

  const LOGIN_URI =
    process.env.NODE_ENV !== "production"
      ? "http://localhost:8888/login"
      : "https://spotify-connect-v1.herokuapp.com/login";

  return (
    <div className="text-white bg-neutral-900 h-full relative">
      {!token ? (
        <LoginButton href={LOGIN_URI} />
      ) : (
        <>
          <button
            className="absolute z-10 text-white rounded-full p-3 text-sm bg-black top-1 right-2  mt-4"
            onClick={logout}
          >
            Log Out
          </button>
          <Router>
            <ScrollToTop />
            <Routes>
              <Route path="/top-artists" element={<TopArtists />} />
              <Route path="/artists/:id" element={<Artist />} />
              <Route path="/top-tracks" element={<TopTracks />} />
              <Route path="/playlists/:id" element={<Playlist />} />
              <Route path="/playlists" element={<Playlists />} />
              <Route path="/" element={<Profile />} />
            </Routes>
          </Router>
        </>
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
