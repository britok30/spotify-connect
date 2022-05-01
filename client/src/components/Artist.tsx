import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArtistById } from '../spotify';
import { SpotifyApi } from '../types';
import SectionWrapper from './SectionWrapper';

const Artist = () => {
    const { id } = useParams();
    const [artist, setArtist] = useState<SpotifyApi.SingleArtistResponse>(null);

    useEffect(() => {
        try {
            const fetchData = async () => {
                const { data } = await getArtistById(id);
                setArtist(data);
                console.log(data);
            };

            fetchData();
        } catch (e: any) {
            console.log(e);
        }
    }, [id]);

    return (
        <>
            <header>
                {artist && (
                    <div className="flex items-end relative max-h-[500px] min-h-[250px] h-[30vh] bg-gradient-to-t from-rose-400 to-orange-300 md:min-h-[340px]">
                        <div className="flex items-end w-full max-w-[1300px] mx-auto py-6 px-4 md:py-8 md:px-16">
                            {artist.images.length && artist.images[0].url && (
                                <img
                                    className="rounded-full shadow-lg w-[20%] max-w-[250px] min-w-[120px] mr-6 md:mr-8"
                                    src={artist.images[0].url}
                                    alt="artist Artwork"
                                />
                            )}
                            <div>
                                <span className="text-xs font-bold mb-2 uppercase">
                                    artist
                                </span>
                                <h1 className="text-6xl font-extrabold leading-[1] mb-2 md:ml-[-5px]">
                                    {artist.name}
                                </h1>
                                <p className="flex items-center m-0 text-sm font-light text-gray-100">
                                    {artist.followers.total ? (
                                        <span>
                                            {artist.followers.total.toLocaleString()}{' '}
                                            {`follower${
                                                artist.followers.total !== 1
                                                    ? 's'
                                                    : ''
                                            }`}
                                        </span>
                                    ) : null}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            <main>
                <SectionWrapper title="Artist Details" breadcrumb={true}>
                    {artist && (
                        <>
                            <span className="text-6xl block font-bold mb-6">
                                Type: {artist.type.toUpperCase()}
                            </span>
                            <span className="text-6xl block font-bold mb-6">
                                Popularity: {artist.popularity}
                            </span>
                            <ul className="text-6xl font-bold list-none mb-6">
                                Genres:{' '}
                                {artist.genres.length > 0 &&
                                    artist.genres.map((genre) => (
                                        <li className="mr-2 text-3xl font-light">
                                            {genre}
                                        </li>
                                    ))}
                            </ul>
                            <a
                                className="text-6xl font-bold cursor-pointer underline"
                                href={artist.external_urls.spotify}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Spotify Profile
                            </a>
                        </>
                    )}
                </SectionWrapper>
            </main>
        </>
    );
};

export default Artist;
