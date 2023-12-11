import { useState } from 'react';
import { registerUser } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../hooks/UserContext';
import { useThemeContext } from '../../hooks/ThemeContext';

function RegistrationForm() {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
        reEnteredPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useUserContext();
    const [theme] = useThemeContext();

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
        const user = await registerUser(formData.name, formData.email, formData.password);
        if (user?.emailExists) {
            setError('User already registered with this email');
            return;
        }
        if (user) {
            setUser({
                id: user.id,
                name: user.name
            });
            navigate('/');
        } else {
            setError('Registration Failed');
        }

        setLoading(false);
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <input
                className={`${theme} input`} 
                type="email" 
                name="email" 
                onChange={handleChange} 
                placeholder="Enter Email" 
                required 
            />
            <input
                className={`${theme} input`}  
                type="name" 
                name="name" 
                onChange={handleChange} 
                placeholder="Enter Name" 
                required 
            />
            <input
                className={`${theme} input`}  
                type="password" 
                name="password" 
                onChange={handleChange} 
                placeholder="Enter Password" 
                required 
                />
            <input
                className={`${theme} input`}  
                type="password" 
                name="reEnteredPassword" 
                onChange={handleChange} 
                placeholder="Enter Password Again" 
                required 
                />
            <button className={`${theme} btn`} type="submit" disabled={loading}>Register</button>   
            <p className={error ? 'error' : 'hidden'}>{error}</p>
        </form>
    );
}

export default RegistrationForm;