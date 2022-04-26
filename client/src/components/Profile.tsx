import React from 'react';
import { SpotifyApi } from '../types';

export const Profile = ({
    profile,
}: {
    profile: SpotifyApi.CurrentUsersProfileResponse;
}) => {
    return (
        <>
            {profile && (
                <div>
                    <h1 className="text-6xl">{profile.display_name}</h1>
                    <p className="text-lg">
                        {profile.followers.total} Followers
                    </p>
                    {profile.images.length && profile.images[0].url && (
                        <img
                            className="rounded"
                            src={profile.images[0].url}
                            alt="Avatar"
                        />
                    )}
                </div>
            )}
        </>
    );
};
