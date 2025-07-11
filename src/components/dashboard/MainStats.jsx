import { Link } from 'react-router-dom'

export const MainStats = ({ stats, isAdmin }) => (
    <div className="dashboard-section">
        <h3 className="dashboard-section-title">📊 Statistiche</h3>
        <div className="stats-grid">
            <div className="stat-card">
                <h4 className="stat-number">{stats.myCharacters}</h4>
                <div className="stat-label">I tuoi personaggi</div>
                <Link to="/my-characters" className="navbar-link">
                    Visualizza tutti →
                </Link>
            </div>

            {isAdmin && (
                <>
                    <div className="stat-card">
                        <h4 className="stat-number">{stats.totalUsers}</h4>
                        <div className="stat-label">Utenti totali</div>
                        <Link to="/user-list" className="navbar-link">
                            Gestisci utenti →
                        </Link>
                    </div>
                    <div className="stat-card">
                        <h4 className="stat-number">{stats.totalCharacters}</h4>
                        <div className="stat-label">Personaggi totali</div>
                        <Link to="/character-list" className="navbar-link">
                            Visualizza tutti →
                        </Link>
                    </div>
                </>
            )}
        </div>
    </div>
)