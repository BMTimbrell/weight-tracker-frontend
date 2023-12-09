import Header from '../Header/Header.js';
import { Outlet } from 'react-router-dom';
import { UserProvider } from '../../hooks/UserContext';
import { ThemeProvider } from '../../hooks/ThemeContext';

function Root() {

    return (
        <ThemeProvider>
            <UserProvider>
                <Header />
                <main>
                    <Outlet />
                </main>
            </UserProvider>
        </ThemeProvider> 
    );
}

export default Root;