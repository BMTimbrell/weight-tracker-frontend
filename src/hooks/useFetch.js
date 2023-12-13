import { useState, useEffect } from 'react';

const DEFAULT_OPTIONS = {
    credentials: 'include',
    headers: { 
        'Content-Type': 'application/json'
    },
};

export default function useFetch(endpoint, options = {}, dependencies = [], url='http://localhost:3001') {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (endpoint) {
            setLoading(true);
            fetch(url + endpoint, { 
                ...DEFAULT_OPTIONS,
                ...options
            })
                .then(res => {
                    if (res.ok) res.json().then(json => {
                        setData(json);
                        setError(false);
                    });
                    else if (res.status === 401) setData({authorisationFailed: true});
                    else setError(true);
                })
                .catch(e => {
                    console.log(e);
                    setError(true);
                })
                .finally(() => setLoading(false));
        }
    }, [url, endpoint, ...dependencies]);

    return { loading, data, error };
}