import Header from '../Header/Header.js';
import { Outlet } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';

function Root() {

    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default Root;