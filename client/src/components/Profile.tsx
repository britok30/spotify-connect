import React, { useEffect, useState } from 'react';
import { SpotifyApi } from '../types';
import {
    getCurrentUserProfile,
    getCurrentUserPlaylists,
    getTopArtists,
} from '../spotify';
import SectionWrapper from './SectionWrapper';
import { ArtistsGrid } from './ArtistsGrid';

export const Profile = () => {
    const [profile, setProfile] =
        useState<SpotifyApi.CurrentUsersProfileResponse | null>(null);

    const [playlists, setPlaylists] =
        useState<SpotifyApi.ListOfCurrentUsersPlaylistsResponse | null>(null);

    const [topArtists, setTopArtists] = useState<
        SpotifyApi.UsersTopArtistsResponse[] | null
    >(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userProfileRes = await getCurrentUserProfile();
                const userProfileData: SpotifyApi.CurrentUsersProfileResponse =
                    userProfileRes.data;

                const userPlaylistsRes = await getCurrentUserPlaylists();
                const userPlaylistData: SpotifyApi.ListOfCurrentUsersPlaylistsResponse =
                    userPlaylistsRes.data;

                const topArtistsRes = await getTopArtists('long_term');
                const topArtistsData: SpotifyApi.UsersTopArtistsResponse[] =
                    topArtistsRes.data.items;

                setProfile(userProfileData);
                setPlaylists(userPlaylistData);
                setTopArtists(topArtistsData);

                console.log('top', topArtists);
            } catch (e: any) {
                console.log(e);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {profile && (
                <div className="flex items-end relative max-h-[500px] min-h-[250px] h-[30vh] bg-gradient-to-r from-black to-gray-300  md:min-h-[340px]">
                    <div className="flex items-end w-full max-w-[1300px] mx-auto py-6 px-4 md:py-8 md:px-16">
                        {profile.images.length && profile.images[0].url && (
                            <img
                                className="rounded-full shadow-lg w-[20%] max-w-[250px] min-w-[120px] mr-6 md:mr-8"
                                src={profile.images[0].url}
                                alt="Avatar"
                            />
                        )}
                        <div>
                            <span className="text-xs font-bold mb-2 uppercase">
                                Profile
                            </span>
                            <h1 className="text-6xl font-extrabold leading-[1] mb-2 md:ml-[-5px]">
                                {profile.display_name}
                            </h1>
                            <p className="flex items-center m-0 text-sm font-light text-gray-100">
                                {playlists && (
                                    <span>
                                        {playlists.total} Playlist
                                        {playlists.total !== 1 ? 's' : ''}
                                    </span>
                                )}
                                <span className="mx-1">-</span>
                                <span>
                                    {profile.followers.total} Follower
                                    {profile.followers.total !== 1 ? 's' : ''}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <SectionWrapper
                title="Top artists this month"
                seeAllLink={'/top-artists'}
            >
                <ArtistsGrid artists={topArtists?.slice(0, 10)} />
            </SectionWrapper>
        </>
    );
};
