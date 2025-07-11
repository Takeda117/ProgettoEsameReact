import { logout } from '../store/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@ui'

export const Navbar = ({ isAdmin }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentUser = useSelector((state) => state.auth?.currentUser)

    const handleLogout = () => {
        dispatch(logout())
        navigate('/auth')
    }

    return (
        <nav className="navbar">
            <div className="navbar-content">
                {/* Brand a sinistra */}
                <div>
                    <Link to={currentUser ? "/" : "/compendium"} className="navbar-brand">
                        🎲 D&D Character Creator
                    </Link>
                </div>

                {/* Links centralizzati */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1
                }}>
                    <ul className="navbar-links" style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 'var(--space-4)',
                        margin: 0,
                        padding: 0,
                        listStyle: 'none'
                    }}>
                        <li>
                            <Link to="/compendium" className="navbar-link">
                                📚 Compendium
                            </Link>
                        </li>

                        {currentUser ? (
                            // Links per utenti loggati
                            <>
                                <li>
                                    <Link to="/" className="navbar-link">
                                        🏠 Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/character-creation" className="navbar-link">
                                        ⚔️ Crea
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/my-characters" className="navbar-link">
                                        👥 I miei personaggi
                                    </Link>
                                </li>
                                {isAdmin && (
                                    <>
                                        <li>
                                            <Link to="/user-list" className="navbar-link">
                                                👤 Lista Utenti
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/character-list" className="navbar-link">
                                                📋 Lista Personaggi
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </>
                        ) : (
                            // Links per utenti non loggati
                            <li>
                                <Link to="/auth" className="navbar-link">
                                    🗝️ Accedi
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>

                {/* User info a destra */}
                <div className="navbar-user">
                    {currentUser ? (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-3)'
                        }}>
                            <span className="text-ui">
                                Ciao, <strong>{currentUser.email}</strong>
                            </span>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <Link to="/auth">
                            <Button variant="primary" size="sm">
                                Login / Registrati
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}