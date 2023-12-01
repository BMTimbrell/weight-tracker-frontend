import Header from '../Header/Header.js';
import { Outlet } from 'react-router-dom';

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