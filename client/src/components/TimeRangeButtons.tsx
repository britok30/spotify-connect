import React from 'react';

const TimeRangeButtons = ({
    activeRange,
    setActiveRange,
}: {
    activeRange: string;
    setActiveRange: (range: string) => void;
}) => {
    return (
        <ul className="list-none mt-6 mb-6 p-0 flex md:absolute md:top-0 md:right-[8.5rem] md:mb-0">
            <li className="mr-2 md:ml-2 md:mr-0">
                <button
                    className="bg-gray-400 hover:bg-gray-500 transition ease-out duration-300 px-2 py-2 rounded-lg"
                    onClick={() => setActiveRange('short')}
                    style={{
                        backgroundColor:
                            activeRange === 'short' ? '#1DB954' : '',
                    }}
                >
                    This Month
                </button>
            </li>
            <li className="mr-2 md:ml-2 md:mr-0">
                <button
                    className="bg-gray-400 hover:bg-gray-500 transition ease-out duration-300  px-2 py-2 rounded-lg"
                    onClick={() => setActiveRange('medium')}
                    style={{
                        backgroundColor:
                            activeRange === 'medium' ? '#1DB954' : '',
                    }}
                >
                    Last 6 Months
                </button>
            </li>
            <li className="mr-2 md:ml-2 md:mr-0">
                <button
                    className="bg-gray-400 hover:bg-gray-500 transition ease-out duration-300 px-2 py-2 rounded-lg"
                    onClick={() => setActiveRange('long')}
                    style={{
                        backgroundColor:
                            activeRange === 'long' ? '#1DB954' : '',
                    }}
                >
                    All Time
                </button>
            </li>
        </ul>
    );
};

export default TimeRangeButtons;
