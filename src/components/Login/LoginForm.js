import { useState } from 'react';
import { loginUser } from '../../api/api';

function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

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
        console.log(user);
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" onChange={handleChange} placeholder="Enter Email" />
            <input type="password" name="password" onChange={handleChange} placeholder="Enter Password" />
            <button type="submit" disabled={loading}>Login</button>
        </form>
    );
}

export default LoginForm;