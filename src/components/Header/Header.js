import { NavLink, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUser } from '../../hooks/UserContext';

function Header() {
    const { user } = useUser();

    return (
        <header>
            <Link className="logo" to="/">Weight Tracker</Link>
            <nav>
                <ul>
                    <li key="home">
                        <NavLink to="/">
                            Home
                        </NavLink>
                    </li>
                    <li key="profile">
                        <NavLink to="/profile">
                            Profile
                        </NavLink>
                    </li>
                    {!user && (
                        <li key="login">
                        <NavLink to="/login">
                            Login
                        </NavLink>
                    </li>
                    )}
                    {user && (
                        <li key="logout">
                        <NavLink to="/logout">
                            Logout
                        </NavLink>
                    </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;