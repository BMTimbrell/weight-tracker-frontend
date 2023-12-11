import RegistrationForm from './RegistrationForm';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserContext } from '../../hooks/UserContext';

function Register() {
    const { user } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate('/');
    }, [user]);

    return (
        <>
            <h1 className="h1">Register</h1>
            <RegistrationForm />
            <p className="p">Already have an account? <Link className="link" to="/login">Click here</Link> to log in.</p>
        </>
    );
}

export default Register;