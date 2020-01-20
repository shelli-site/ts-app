export function getToken() {
    return window.localStorage.token;
}

export function setToken(token: string) {
    window.localStorage.token = token;
    return true;
}
