import { NavLink, Link } from 'react-router-dom';
import { useUserContext } from '../../hooks/UserContext';
import { useThemeContext } from '../../hooks/ThemeContext';

function Header() {
    const { user } = useUserContext();
    const [theme] = useThemeContext();

    return (
        <header className={theme}>
            <div className={'header-content'}>
                <Link className="logo" to="/">Weight Tracker</Link>
                <nav>
                    <ul>
                        <li key="home">
                            <NavLink 
                                to="/" 
                                className={({isActive}) => 
                                    isActive ? 'nav-link nav-link-active' : 'nav-link'
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li key="profile">
                            <NavLink 
                                to="/profile"
                                className={({isActive}) => 
                                    isActive ? 'nav-link nav-link-active' : 'nav-link'
                                }
                            >
                                Profile
                            </NavLink>
                        </li>
                        {!user && (
                            <li key="login">
                            <NavLink 
                                to="/login"
                                className={({isActive}) => 
                                    isActive ? 'nav-link nav-link-active' : 'nav-link'
                                }
                            >
                                Login
                            </NavLink>
                        </li>
                        )}
                        {user && (
                            <li key="logout">
                            <NavLink 
                                to="/logout"
                                className={({isActive}) => 
                                    isActive ? 'nav-link nav-link-active' : 'nav-link'
                                }
                            >
                                Logout
                            </NavLink>
                        </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;