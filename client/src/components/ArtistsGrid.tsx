import React from 'react';
import { SpotifyApi } from '../types';

export const ArtistsGrid = ({
    artists,
}: {
    artists: SpotifyApi.UsersTopArtistsResponse[] | null;
}) => (
    <>
        {artists && artists.length ? (
            <ul className="list-none m-0 p-0 grid">
                {artists.map((artist, i) => (
                    <li className="grid__item" key={i}>
                        <div className="grid__item__inner">
                            {artist.images[0] && (
                                <div className="grid__item__img">
                                    <img
                                        src={artist.images[0].url}
                                        alt={artist.name}
                                    />
                                </div>
                            )}
                            <h3 className="grid__item__name overflow-ellipsis">
                                {artist.name}
                            </h3>
                            <p className="grid__item__label">Artist</p>
                        </div>
                    </li>
                ))}
            </ul>
        ) : (
            <p className="empty-notice">No artists available</p>
        )}
    </>
);
