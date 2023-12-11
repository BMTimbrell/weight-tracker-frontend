import { logoutUser } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUserContext } from '../../hooks/UserContext';

export default function Logout() {
    const { user, removeUser } = useUserContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate('/');
    }, [navigate]);

    useEffect(() => {
        setLoading(true);
        logoutUser()
            .then(() => {
                removeUser();
                navigate('/login');
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, [navigate]);
    
    return <h1 className={!error ? 'h1' : 'error'}>{loading ? 'Logging Out...' : error ? 'Logout Failed' : ''}</h1>;
}