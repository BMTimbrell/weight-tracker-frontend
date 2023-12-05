import RegistrationForm from './RegistrationForm';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/UserContext';

function Register() {
    const { user } = useUser();
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