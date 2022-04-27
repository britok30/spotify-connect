import React from 'react';
import { formatDuration } from '../utils';
import { SpotifyApi } from '../types';

const TrackList = ({
    tracks,
}: {
    tracks: SpotifyApi.UsersTopTracksResponse[];
}) => (
    <>
        {tracks && tracks.length ? (
            <div>
                {tracks.map((track, i) => (
                    <li
                        className="grid items-center grid-cols-1 gap-4 text-gray-300 rounded-sm hover:bg-neutral-700 transition-all duration-300 ease-in-out cursor-default p-1"
                        key={i}
                        style={{
                            gridTemplateColumns:
                                '20px 4fr 2fr minmax(60px, 1fr)',
                        }}
                    >
                        <div className="flex items-center justify-end text-base tabular-nums overflow-visible">
                            {i + 1}
                        </div>
                        <div className="flex items-center">
                            {track.album.images.length &&
                                track.album.images[2] && (
                                    <div className="mr-3 w-16 h-16 shrink-0">
                                        <img
                                            className="rounded-md"
                                            src={track.album.images[2].url}
                                            alt={track.name}
                                        />
                                    </div>
                                )}
                            <div>
                                <div className="text-white text-sm overflow-ellipsis">
                                    {track.name}
                                </div>
                                <div className="text-gray-300 mt-1 text-xs font-light overflow-ellipsis">
                                    {track.artists.map((artist, i) => (
                                        <span key={i}>
                                            {artist.name}
                                            {i !== track.artists.length - 1 &&
                                                ', '}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="overflow-ellipsis text-sm hidden md:block md:whitespace-nowrap">
                            {track.album.name}
                        </div>
                        <div className="hidden md:flex md:justify-end md:tabular-nums">
                            {formatDuration(track.duration_ms)}
                        </div>
                    </li>
                ))}
            </div>
        ) : (
            <p className="text-white">No tracks available</p>
        )}
    </>
);

export default TrackList;
