import Header from '../Header/Header.js';
import { Outlet } from 'react-router-dom';
import { UserProvider } from '../../hooks/UserContext';

function Root() {

    return (
        <UserProvider>
            <Header />
            <main>
                <Outlet />
            </main>
        </UserProvider>
    );
}

export default Root;