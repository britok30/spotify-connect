import React, { useEffect, useState } from 'react';
import { getTopTracks } from '../spotify';
import { SpotifyApi } from '../types';
import SectionWrapper from './SectionWrapper';
import TimeRangeButtons from './TimeRangeButtons';
import TrackList from './TrackList';

const TopTracks = () => {
    const [topTracks, setTopTracks] = useState<
        SpotifyApi.UsersTopTracksResponse[] | null
    >(null);

    const [activeRange, setActiveRange] = useState('medium');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const topTracksRes = await getTopTracks(`${activeRange}_term`);
                const topTracksData: SpotifyApi.UsersTopTracksResponse[] =
                    topTracksRes.data.items;

                setTopTracks(topTracksData);
            } catch (e: any) {
                console.log(e);
            }
        };

        fetchData();
    }, [activeRange]);

    return (
        <>
            {topTracks && (
                <SectionWrapper title="Top tracks" breadcrumb={true}>
                    <TimeRangeButtons
                        activeRange={activeRange}
                        setActiveRange={setActiveRange}
                    />
                    {topTracks && <TrackList tracks={topTracks} />}
                </SectionWrapper>
            )}
        </>
    );
};

export default TopTracks;
