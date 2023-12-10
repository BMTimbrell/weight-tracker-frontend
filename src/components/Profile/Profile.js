import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { useThemeContext } from '../../hooks/ThemeContext';
import { useUserContext } from '../../hooks/UserContext';
import { updateUser } from '../../api/api';

export default function Profile() {
    const [theme, setTheme] = useThemeContext();
    const { user} = useUserContext();
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const { loading, data: userData, error } = useFetch(`/users/${user?.id}`, {}, [submitting]);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [formError, setFormError] = useState('');

    useEffect(() => {
        if (!user) navigate('/login');
    }, [user]);

    useEffect(() => {
        if (userData?.authorisationFailed) navigate('/logout');
    }, [userData]);

    const handleSubmit = async e => {
        e.preventDefault();
        setSubmitting(true);
        const result = await updateUser(
            userData?.id, 
            formData.name, 
            formData.email, 
            formData.password
        );
        setSubmitting(false);
        setFormData({name: '', email: '', password: ''});
        if (!result) {
            setFormError('Failed to save changes');
            return;
        }
        if (result.emailExists) {
            setFormError('User already exists with this email');
            return;
        }
        setFormError('');
        setEditing(false);
    };

    const handleThemeChange = e => {
        setTheme(prev => {
            const result = {};
            for (const type in prev) {
                if (type === e.target.value) {
                    result[type] = true;
                } else {
                    result[type] = false;
                }
            }
            return result;
        });
    };

    if (user) return (
        <>
            <h1>{userData?.name || user['name']}'s Profile</h1>
            <h2>User Details</h2>
            {loading && <p>Loading...</p>}
            {error && <p>Failed to load data</p>}
            {userData && !error && !editing && (
                <>
                    <p>Name: {userData.name}</p>
                    <p>Email: {userData.email}</p>
                </>
            )}
            {editing && 
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        className={`${theme} input`}
                        onChange={e => setFormData(prev => (
                            {...prev, name: e.target.value}
                        ))} 
                        placeholder="name"
                    />
                    <input 
                        type="email"
                        className={`${theme} input`}
                        onChange={e => setFormData(prev => (
                            {...prev, email: e.target.value}
                        ))} 
                        placeholder="email" 
                    />
                    <input 
                        type="password"
                        className={`${theme} input`}
                        onChange={e => setFormData(prev => (
                            {...prev, password: e.target.value}
                        ))} 
                        placeholder="password" 
                    />
                    <button 
                        className={`${theme} btn`} 
                        type="submit"
                        disabled={submitting}
                    >
                        {submitting ? 'Saving...' : 'Save Changes'}
                    </button>
                    {formError}
                </form>
            }
            <button className={`${theme} btn`} onClick={() => setEditing(!editing)}>{!editing ? 'Edit Details' : 'Cancel'}</button>
            <label htmlFor="theme">Choose theme: </label>
            <select className={`${theme} select`} value={theme} id="theme" onChange={handleThemeChange}>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
            </select>
            <h2>Your Weight</h2>
            <p>Track your weight <Link className="link" to="/">here</Link></p>
        </>
    );
}