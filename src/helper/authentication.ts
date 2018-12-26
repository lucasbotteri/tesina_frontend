import jwtDecode from 'jwt-decode';
import constants from '@/constants';
const TOKEN_NAME = 'LEL_TOKEN';

export function getToken() {
    return localStorage.getItem(TOKEN_NAME);
}

export function setToken(token: string) {
    localStorage.setItem(TOKEN_NAME, token);
}

export function isLoggedIn(): boolean {
    return localStorage.getItem(TOKEN_NAME) !== null;
}

export function getAuthHeader(token: string) {
    return 'Bearer ' + token;
}

export function removeToken() {
    return localStorage.removeItem(TOKEN_NAME);
}

export function decode(token: string | null) {
    return token ? jwtDecode(token) : '';
}

export function isAdmin(): boolean {
    const token = getToken();
    if (token) {
        const decodedData: any = jwtDecode(token);
        return decodedData.role === constants.USER_ROLE.ADMINISTRATOR;
    }
    return false;
}
