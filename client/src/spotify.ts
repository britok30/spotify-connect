const getAccessToken = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const accessToken = urlParams.get('access_token');

    return accessToken;
};

const getRefreshToken = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const refreshToken = urlParams.get('refresh_token');

    return refreshToken;
};

export const accessToken = getAccessToken();
export const refreshToken = getRefreshToken();
