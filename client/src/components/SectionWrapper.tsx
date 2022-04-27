import React from 'react';
import { Link } from 'react-router-dom';

const SectionWrapper = ({
    children,
    title,
    seeAllLink,
    breadcrumb,
}: {
    children: React.ReactNode;
    title: string;
    seeAllLink: string;
    breadcrumb?: boolean;
}) => (
    <div className="first-of-type:pt-0 w-full max-w-[1300px] my-0 mx-auto py-6 px-4 md:py-8 md:px-16">
        <div className="flex justify-between items-stretch mb-8">
            <h2 className="flex m-0 text-xl">
                {breadcrumb && (
                    <span className="flex text-gray-300">
                        <Link to="/">Profile</Link>
                    </span>
                )}
                {title && (
                    <>
                        {seeAllLink ? (
                            <Link to={seeAllLink}>{title}</Link>
                        ) : (
                            <span>{title}</span>
                        )}
                    </>
                )}
            </h2>
            {seeAllLink && (
                <Link
                    to={seeAllLink}
                    className="flex items-end uppercase text-gray-300 text-xs font-bold tracking-widest pb-0.5"
                >
                    See All
                </Link>
            )}
        </div>

        {children}
    </div>
);

export default SectionWrapper;
