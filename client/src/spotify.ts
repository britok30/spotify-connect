import axios from 'axios';

enum LocalStorageKeys {
    ACCESS_TOKEN = 'spotify_access_token',
    REFRESH_TOKEN = 'spotify_refresh_token',
    EXPIRE_TIME = 'spotify_token_expire_time',
    TIME_STAMP = 'spotify_token_timestamp',
}

// Map to retrieve localStorage values
const LOCALSTORAGE_VALUES = {
    accessToken: window.localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN),
    refreshToken: window.localStorage.getItem(LocalStorageKeys.REFRESH_TOKEN),
    expireTime: window.localStorage.getItem(LocalStorageKeys.EXPIRE_TIME),
    timestamp: window.localStorage.getItem(LocalStorageKeys.TIME_STAMP),
};
const getAccessToken = (): string | boolean => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const queryParams = {
        [LocalStorageKeys.ACCESS_TOKEN]: urlParams.get('access_token'),
        [LocalStorageKeys.REFRESH_TOKEN]: urlParams.get('refresh_token'),
        [LocalStorageKeys.EXPIRE_TIME]: urlParams.get('expires_in'),
    };
    const hasError = urlParams.get('error');

    // If there's an error OR the token in localStorage has expired, refresh the token
    if (
        hasError ||
        hasTokenExpired() ||
        LOCALSTORAGE_VALUES.accessToken === 'undefined'
    ) {
        refreshToken();
    }

    // If there is a valid access token in localStorage, use that
    if (
        LOCALSTORAGE_VALUES.accessToken &&
        LOCALSTORAGE_VALUES.accessToken !== 'undefined'
    ) {
        return LOCALSTORAGE_VALUES.accessToken;
    }

    // If there is a token in the URL query params, user is logging in for the first time
    if (queryParams[LocalStorageKeys.ACCESS_TOKEN]) {
        // Store the query params in localStorage
        for (const property in queryParams) {
            window.localStorage.setItem(property, queryParams[property]);
        }
        // Set timestamp
        window.localStorage.setItem(
            LocalStorageKeys.TIME_STAMP,
            String(Date.now())
        );
        // Return access token from query params
        return queryParams[LocalStorageKeys.ACCESS_TOKEN];
    }

    // We should never get here!
    return false;
};

/**
 * Checks if the amount of time that has elapsed between the timestamp in localStorage
 * and now is greater than the expiration time of 3600 seconds (1 hour).
 * @returns {boolean} Whether or not the access token in localStorage has expired
 */
const hasTokenExpired = (): boolean => {
    const { accessToken, timestamp, expireTime } = LOCALSTORAGE_VALUES;
    if (!accessToken || !timestamp) {
        return false;
    }
    const millisecondsElapsed = Date.now() - Number(timestamp);
    return millisecondsElapsed / 1000 > Number(expireTime);
};

/**
 * Use the refresh token in localStorage to hit the /refresh_token endpoint
 * in our Node app, then update values in localStorage with data from response.
 * @returns {void}
 */
const refreshToken = async (): Promise<void> => {
    try {
        // Logout if there's no refresh token stored or we've managed to get into a reload infinite loop
        if (
            !LOCALSTORAGE_VALUES.refreshToken ||
            LOCALSTORAGE_VALUES.refreshToken === 'undefined' ||
            Date.now() - Number(LOCALSTORAGE_VALUES.timestamp) / 1000 < 1000
        ) {
            console.error('No refresh token available');
            logout();
        }

        // Use `/refresh_token` endpoint from our Node app
        const { data } = await axios.get(
            `/refresh_token?refresh_token=${LOCALSTORAGE_VALUES.refreshToken}`
        );

        // Update localStorage values
        window.localStorage.setItem(
            LocalStorageKeys.ACCESS_TOKEN,
            data.access_token
        );
        window.localStorage.setItem(
            LocalStorageKeys.TIME_STAMP,
            String(Date.now())
        );

        // Reload the page for localStorage updates to be reflected
        window.location.reload();
    } catch (e: any) {
        console.error(e);
    }
};

/**
 * Clear out all localStorage items we've set and reload the page
 * @returns {void}
 */
export const logout = (): void => {
    // Clear all localStorage items
    for (const property in LocalStorageKeys) {
        window.localStorage.removeItem(LocalStorageKeys[property]);
    }
    // Navigate to homepage
    window.location.href = window.location.origin;
};

export const accessToken = getAccessToken();

/**
 * Axios global request headers
 * https://github.com/axios.axios#global-axios-defaults
 */

axios.defaults.baseURL = 'https://api.spotify.com/v1';
axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
axios.defaults.headers['Content-Type'] = 'application/json';

/**
 * Get Current User's Profile
 * https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-current-users-profile
 * @returns {Promise}
 */
export const getCurrentUserProfile = (): Promise<any> => axios.get('/me');
