import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPlaylistById } from '../spotify';
import { SpotifyApi } from '../types';
import SectionWrapper from './SectionWrapper';
import TrackList from './TrackList';

const Playlist = () => {
    const { id } = useParams();
    const [playlist, setPlaylist] = useState(null);
    const [tracks, setTracks] = useState<any[] | null>(null);

    useEffect(() => {
        try {
            const fetchData = async () => {
                const { data } = await getPlaylistById(id);
                setPlaylist(data);
                setTracks(data.tracks.items);
            };

            fetchData();
        } catch (e: any) {
            console.log(e);
        }
    }, [id]);

    const tracksForTracklist = useMemo(() => {
        if (!tracks) {
            return;
        }
        return tracks.map(
            ({ track }: { track: SpotifyApi.UsersTopTracksResponse }) => track
        );
    }, [tracks]);

    return (
        <>
            <header>
                {playlist && (
                    <div className="flex items-end relative max-h-[500px] min-h-[250px] h-[30vh] bg-gradient-to-t from-green-300 via-blue-500 to-purple-600  md:min-h-[340px]">
                        <div className="flex items-end w-full max-w-[1300px] mx-auto py-6 px-4 md:py-8 md:px-16">
                            {playlist.images.length &&
                                playlist.images[0].url && (
                                    <img
                                        className="rounded-full shadow-lg w-[20%] max-w-[250px] min-w-[120px] mr-6 md:mr-8"
                                        src={playlist.images[0].url}
                                        alt="Playlist Artwork"
                                    />
                                )}
                            <div>
                                <span className="text-xs font-bold mb-2 uppercase">
                                    Playlist
                                </span>
                                <h1 className="text-6xl font-extrabold leading-[1] mb-2 md:ml-[-5px]">
                                    {playlist.name}
                                </h1>
                                <p className="flex items-center m-0 text-sm font-light text-gray-100">
                                    {playlist.followers.total ? (
                                        <span>
                                            {playlist.followers.total}{' '}
                                            {`follower${
                                                playlist.followers.total !== 1
                                                    ? 's'
                                                    : ''
                                            }`}
                                        </span>
                                    ) : null}
                                    <span>
                                        {playlist.tracks.total}{' '}
                                        {`song${
                                            playlist.tracks.total !== 1
                                                ? 's'
                                                : ''
                                        }`}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            <main>
                <SectionWrapper title="Playlist" breadcrumb={true}>
                    {tracks && <TrackList tracks={tracksForTracklist} />}
                </SectionWrapper>
            </main>
        </>
    );
};

export default Playlist;
