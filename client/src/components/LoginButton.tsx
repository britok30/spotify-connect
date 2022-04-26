import React from 'react';

export const LoginButton = ({ href }: { href: string }) => {
    return (
        <button className="bg-green-500 my-5 mx-auto text-white py-3 px-5 rounded-3xl inline-block">
            <a
                className="text-4xl"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
            >
                Login to Spotify
            </a>
        </button>
    );
};
