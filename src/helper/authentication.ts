import jwtDecode from 'jwt-decode';
const TOKEN_NAME = 'LEL_TOKEN';

export function getToken() {
    return localStorage.getItem(TOKEN_NAME);
}

export function setToken(token: string) {
    localStorage.setItem(TOKEN_NAME, token);
}

export function getAuthHeader(token: string) {
    return 'Bearer ' + token;
}

export function decode(token: string) {
    console.log(token);
    return String(jwtDecode(token));
}