import { useState } from 'react';
import { loginUser } from '../../api/api';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = e => {
        if (e.target.name === 'email')
            setFormData(prev => ({...prev, email: e.target.value}));
        else if (e.target.name === 'password')
            setFormData(prev => ({...prev, password: e.target.value}));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        const user = await loginUser(formData.email, formData.password);

        if (user) {
            localStorage.setItem('user', JSON.stringify({
                id: user.id,
                name: user.name
            }));
            navigate('/');
        } else {
            setError('Login Failed');
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" onChange={handleChange} placeholder="Enter Email" required />
            <input type="password" name="password" onChange={handleChange} placeholder="Enter Password" required />
            <button type="submit" disabled={loading}>{!loading ? 'Login' : 'Logging in...'}</button>
            {error}
        </form>
    );
}

export default LoginForm;