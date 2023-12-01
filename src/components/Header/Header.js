import { NavLink, Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <Link className="logo" to="/">Weight Tracker</Link>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">
                            Home
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;