import RegistrationForm from './RegistrationForm';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../hooks/UserContext';

function Register() {
    const { user } = useUserContext();
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