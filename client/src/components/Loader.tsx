import React from 'react';
//@ts-ignore
import spotify from '../images/spotify.png';

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-screen z-10">
            <img
                className="h-10 w-10 animate-bounce"
                src={spotify}
                alt="logo"
            />
        </div>
    );
};

export default Loader;
