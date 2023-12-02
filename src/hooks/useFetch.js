import useAsync from './useAsync';

const DEFAULT_OPTIONS = {
    credentials: 'include',
    headers: { 
        'Content-Type': 'application/json'
    },
};

export default function useFetch(endpoint, options = {}, dependencies = [], url='http://localhost:3001') {
    return useAsync(() => {
        return fetch(url + endpoint, {...DEFAULT_OPTIONS, ...options}).then(res => {
            if (res.ok) return res.json();
            return res.json().then(json => Promise.reject(json));
        });
    }, dependencies);
}