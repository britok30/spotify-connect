import { Link } from 'react-router-dom';
import React from 'react';
import { SpotifyApi } from '../types';

const PlaylistsGrid = ({
    playlists,
}: {
    playlists: SpotifyApi.ListOfCurrentUsersPlaylistsResponse[];
}) => (
    <>
        {playlists && playlists.length ? (
            <ul className="list-none m-0 p-0 grid gap-3 grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
                {playlists.map((playlist, i) => (
                    <li
                        className="grid items-center grid-cols-1 gap-4 text-gray-300 rounded-sm hover:bg-neutral-700 transition-all duration-300 ease-in-out cursor-default p-1"
                        key={i}
                    >
                        <Link
                            className="p-3 md:p-4"
                            to={`/playlists/${playlist.id}`}
                        >
                            {playlist.images.length && playlist.images[0] && (
                                <div className="relative mx-auto mb-6">
                                    <img
                                        className="rounded-md"
                                        src={playlist.images[0].url}
                                        alt={playlist.name}
                                    />
                                </div>
                            )}
                            <h3 className="text-white text-sm overflow-ellipsis">
                                {playlist.name}
                            </h3>
                            <p className="text-gray-300 text-xs font-thin">
                                Playlist
                            </p>
                        </Link>
                    </li>
                ))}
            </ul>
        ) : (
            <p className="text-white font-bold text-lg">No playlists available</p>
        )}
    </>
);

export default PlaylistsGrid;
