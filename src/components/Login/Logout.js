import useLocalStorage from '../../hooks/useLocalStorage';
import { logoutUser } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Logout() {
    const [id, setId, removeId] = useLocalStorage('id');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    useState(() => {
        setLoading(true);
        logoutUser()
            .then(() => {
                removeId();
                setLoading(false);
                navigate('/login');
            })
            .catch(() => setError(true));
    }, []);
    
    useState(() => {
        if (!id) navigate('/');
    }, [id]);

    return <h1>{loading ? 'Logging Out...' : error ? 'Logout Failed' : ''}</h1>;
}