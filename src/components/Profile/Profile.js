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
    const { loading, data: userData, error } = useFetch(user && `/users/${user?.id}`, {}, [submitting]);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [formError, setFormError] = useState('');

    /*useEffect(() => {
        if (!user) navigate('/login');
    }, [user]);*/

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
        <div>
            <h1 className="h1 align-left">{userData?.name || user['name']}'s Profile</h1>
            <h2 className="h2">User Details</h2>
            {loading && <p className="p align-left">Loading...</p>}
            {error && <p className="error align-left">Failed to load data</p>}
            {userData && !loading && !error && !editing && (
                <>
                    <p className="p align-left">Name: {userData.name}</p>
                    <p className="p align-left margin-bottom-small">Email: {userData.email}</p>
                </>
            )}
            {editing && 
                <form className="form" onSubmit={handleSubmit} style={{marginBottom: '0.625rem'}}>
                    <p className={formError ? 'error' : 'hidden'}>{formError}</p>
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
                </form>
            }
            <button 
                className={`${theme} btn`}
                style={editing ? {width: '100%', marginTop: '-1.25rem'} : {}} 
                onClick={() => {
                    setEditing(!editing);
                    !editing && setFormError('');
                }}
            >
                {!editing ? 'Edit Details' : 'Cancel'}
            </button>

            <div className="flex margin-top">
                <label htmlFor="theme">Choose theme: </label>
                <select className={`${theme} select`} value={theme} id="theme" onChange={handleThemeChange}>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                </select>
            </div>
        </div>
    );

    return (
        <>
            <h1 className="h1">Profile</h1>
            <p className="p">You must be <Link className="link" to="/login">logged in</Link> to view this page.</p>
        </>
    );
}