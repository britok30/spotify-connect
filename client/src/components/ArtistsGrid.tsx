import React from 'react';
import { SpotifyApi } from '../types';

export const ArtistsGrid = ({
    artists,
}: {
    artists: SpotifyApi.UsersTopArtistsResponse[] | null;
}) => (
    <>
        {artists && artists.length ? (
            <ul className="list-none m-0 p-0 grid gap-3 grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
                {artists.map((artist, i) => (
                    <li
                        className="cursor-default rounded-lg bg-neutral-900 hover:scale-105 transition-all ease-out duration-500 shadow-md"
                        key={i}
                    >
                        <div className="p-3 md:p-4">
                            {artist.images[0] && (
                                <div className="relative pt-[100%] mx-auto mb-6">
                                    <img
                                        className="object-cover w-full h-full absolute top-0 rounded-full"
                                        src={artist.images[0].url}
                                        alt={artist.name}
                                    />
                                </div>
                            )}
                            <h3 className="mb-2 text-sm overflow-ellipsis">
                                {artist.name}
                            </h3>
                            <p className="text-sm text-gray-500">Artist</p>
                        </div>
                    </li>
                ))}
            </ul>
        ) : (
            <p className="text-white">No artists available</p>
        )}
    </>
);
