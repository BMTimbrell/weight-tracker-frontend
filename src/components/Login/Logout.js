import { logoutUser } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUser } from '../../hooks/UserContext';

export default function Logout() {
    //const user = localStorage.getItem('user');
    const { user, removeUser } = useUser();
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
                //localStorage.removeItem('user');
                removeUser();
                navigate('/login');
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, [navigate]);
    
    return <h1>{loading ? 'Logging Out...' : error ? 'Logout Failed' : ''}</h1>;
}