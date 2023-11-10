const LocalStorage = {
    getToken: () => localStorage.getItem('token'),
    setToken: (token: string) => localStorage.setItem('token', token),
    removeToken: () => localStorage.removeItem('token'),
    getBG: () => localStorage.getItem('bg'),
    setBG: (bg: string) => localStorage.setItem('bg', bg),
    getVersion: () => localStorage.getItem('version'),
    setVersion: (version: string) => localStorage.setItem('version', version),
};

export default LocalStorage;
