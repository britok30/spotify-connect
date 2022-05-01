import React, { useEffect, useState } from 'react';
import { getTopArtists } from '../spotify';
import { SpotifyApi } from '../types';
import { ArtistsGrid } from './ArtistsGrid';
import SectionWrapper from './SectionWrapper';
import TimeRangeButtons from './TimeRangeButtons';

const TopArtists = () => {
    const [topArtists, setTopArtists] = useState<
        SpotifyApi.UsersTopArtistsResponse[] | null
    >(null);

    const [activeRange, setActiveRange] = useState('medium');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const topArtistsRes = await getTopArtists(
                    `${activeRange}_term`
                );
                const topArtistsData: SpotifyApi.UsersTopArtistsResponse[] =
                    topArtistsRes.data.items;

                setTopArtists(topArtistsData);
            } catch (e: any) {
                console.log(e);
            }
        };

        fetchData();
    }, [activeRange]);

    return (
        <>
            {topArtists && (
                <SectionWrapper title="Top artists" breadcrumb={true}>
                    <TimeRangeButtons
                        activeRange={activeRange}
                        setActiveRange={setActiveRange}
                    />
                    {topArtists && <ArtistsGrid artists={topArtists} />}
                </SectionWrapper>
            )}
        </>
    );
};

export default TopArtists;
