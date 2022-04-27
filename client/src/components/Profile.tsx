import React, { useEffect, useState } from 'react';
import { SpotifyApi } from '../types';
import { getCurrentUserProfile, getCurrentUserPlaylists } from '../spotify';

export const Profile = () => {
    const [profile, setProfile] =
        useState<SpotifyApi.CurrentUsersProfileResponse | null>(null);

    const [playlists, setPlaylists] =
        useState<SpotifyApi.ListOfCurrentUsersPlaylistsResponse | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userProfileResponse = await getCurrentUserProfile();
                const userProfileData: SpotifyApi.CurrentUsersProfileResponse =
                    userProfileResponse.data;

                const userPlaylistsResponse = await getCurrentUserPlaylists();
                const userPlaylistData: SpotifyApi.ListOfCurrentUsersPlaylistsResponse =
                    userPlaylistsResponse.data;

                setProfile(userProfileData);
                setPlaylists(userPlaylistData);
            } catch (e: any) {
                console.log(e);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {profile && (
                <div className="flex items-end relative max-h-[500px] min-h-[250px] h-[30vh] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 md:min-h-[340px]">
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
                                <div className="mx-1">-</div>
                                <span>
                                    {profile.followers.total} Follower
                                    {profile.followers.total !== 1 ? 's' : ''}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
