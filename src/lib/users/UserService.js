/**
 * @description - saves username to the localstorage
 * @param username {string}
 * @returns {boolean}
 */
export function saveUsername(username) {
    if (username === null || username.trim() === '') {
        console.log('Invalid username provided');
        return false;
    }
    localStorage.setItem('app_username', username.trim());
    return true;
}

/**
 * @description - gets username from the localstorage
 * @returns {string}
 */
export function getUsername() {
    return localStorage.getItem('app_username');
}

/**
 * @description - checks if username exists in the localstorage
 * @returns {boolean}
 */
export function hasStoredUsername() {
    const username = localStorage.getItem('app_username');
    return username !== null && username !== '';
}

/**
 * @description - deletes the username from the localstorage
 */
export function clearUsername() {
    localStorage.removeItem('app_username');
}