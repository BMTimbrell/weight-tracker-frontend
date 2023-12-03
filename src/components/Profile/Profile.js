import { Link } from 'react-router-dom';

export default function Profile() {
    const userJson = localStorage.getItem('user');
    const user = JSON.parse(userJson);

    if (!user) return (
        <>
            <h1>Profile</h1>
            <p>You must be <Link to="/login">logged in</Link> to view this page</p>
        </>
    );

    return (
        <>
            <h1>{user['name']}'s Profile</h1>
        </>
    );
}