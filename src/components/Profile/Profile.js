import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { useUser } from '../../hooks/UserContext';

export default function Profile() {
    const { user} = useUser();
    const navigate = useNavigate();
    const { loading, data: userData, error } = useFetch(`/users/${user?.id}`);

    useEffect(() => {
        if (!user) navigate('/login');
    }, [user]);

    useEffect(() => {
        if (userData?.authorisationFailed) navigate('/logout');
    }, [userData]);

    if (!user) return (
        <>
            <h1>Profile</h1>
            <p>You must be <Link to="/login">logged in</Link> to view this page.</p>
        </>
    );

    return (
        <>
            <h1>{userData?.name || user['name']}'s Profile</h1>
            <h2>User Details</h2>
            {loading && <p>Loading...</p>}
            {error && <p>Failed to load data</p>}
            {userData && !loading && !error && (
                <>
                    <p>Name: {userData.name}</p>
                    <p>Email: {userData.email}</p>
                </>
            )}
            <h2>Your Weight</h2>
            <p>Track your weight <Link to="weight">here</Link></p>
        </>
    );
}