export const DashboardHeader = ({ loggedUser }) => (
    <div className="dashboard-section">
        <div className="page-header">
            <h1 className="page-title">🏰 Dashboard</h1>
            <div className="page-subtitle">
                <h2 className="text-heading">Benvenuto, {loggedUser.email}!</h2>
                <span className="text-body">
                    {loggedUser.role === 'admin' ? '👑 Amministratore' : '⚔️ Avventuriero'}
                </span>
            </div>
        </div>
    </div>
)