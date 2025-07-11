export const VersionInfo = ({ stats, isAdmin }) => (
    <div className="dashboard-section">
        <div className="text-body" style={{ textAlign: 'center' }}>
            <p className="text-heading">🎲 D&D Character Creator v2.0</p>
            <p className="text-ui">Sistema di gestione personaggi fantasy</p>
            <p className="text-body">
                👥 Utenti registrati: <strong>{stats.totalUsers}</strong> |
                ⚔️ Personaggi creati: <strong>{stats.totalCharacters}</strong>
                {isAdmin && ` | 🏠 Tuoi personaggi: ${stats.myCharacters}`}
            </p>
        </div>
    </div>
)