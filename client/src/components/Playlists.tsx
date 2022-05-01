import React, { useState, useEffect } from 'react';
import { getCurrentUserPlaylists } from '../spotify';
import { SpotifyApi } from '../types';
import SectionWrapper from './SectionWrapper';
import PlaylistsGrid from './PlaylistsGrid';

const Playlists = () => {
    const [playlists, setPlaylists] = useState<
        SpotifyApi.ListOfCurrentUsersPlaylistsResponse[] | null
    >(null);

    useEffect(() => {
        try {
            const fetchData = async () => {
                const userPlaylistsRes = await getCurrentUserPlaylists();
                const userPlaylistData: SpotifyApi.ListOfCurrentUsersPlaylistsResponse[] =
                    userPlaylistsRes.data.items;

                setPlaylists(userPlaylistData);
            };

            fetchData();
        } catch (e: any) {
            console.log(e);
        }
    }, [playlists]);

    return (
        <main>
            <SectionWrapper title="Public Playlists" breadcrumb={true}>
                {playlists && <PlaylistsGrid playlists={playlists} />}
            </SectionWrapper>
        </main>
    );
};

export default Playlists;
