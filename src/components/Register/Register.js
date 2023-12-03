import RegistrationForm from './RegistrationForm';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const user = localStorage.getItem('user');
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate('/');
    }, [user]);

    return (
        <>
            <h1>Register</h1>
            <RegistrationForm />
        </>
    );
}

export default Register;