import { useState } from 'react';
import { registerUser } from '../../api/api';

function RegistrationForm() {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
        reEnteredPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = e => {
        switch (e.target.name) {
            case 'email':
                setFormData(prev => ({...prev, email: e.target.value}));
                break;
            case 'name':
                setFormData(prev => ({...prev, name: e.target.value}));
                break;
            case 'password':
                setFormData(prev => ({...prev, password: e.target.value}));
                break;
            case 'reEnteredPassword':
                setFormData(prev => ({...prev, reEnteredPassword: e.target.value}));
                break;
            default:
                break;
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();

        if (formData.password !== formData.reEnteredPassword) {
            setError('Passwords must match');
            return;
        }
        setLoading(true);
        await registerUser(formData.name, formData.email, formData.password);
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" onChange={handleChange} placeholder="Enter Email" />
            <input type="name" name="name" onChange={handleChange} placeholder="Enter Name" />
            <input type="password" name="password" onChange={handleChange} placeholder="Enter Password" />
            <input type="password" name="reEnteredPassword" onChange={handleChange} placeholder="Re-enter Password" />
            <button type="submit" disabled={loading}>Register</button>
            {error}
        </form>
    );
}

export default RegistrationForm;