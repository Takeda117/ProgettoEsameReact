import styles from '@ui/styles/table.module.css';

export const AdminStats = ({ stats }) => (
    <div className="dashboard-section">
        <h3 className="dashboard-section-title">👑 Statistiche Amministratore</h3>

        {/* Razze più popolari */}
        <div className={styles.statsSection}>
            <h4 className={styles.statsTitle}>🧝 Razze più popolari</h4>
            <table className={styles.adminTable}>
                <thead>
                    <tr>
                        <th>Razza</th>
                        <th>Personaggi</th>
                        <th>Percentuale</th>
                    </tr>
                </thead>
                <tbody>
                    {stats.topRaces.map((race, index) => (
                        <tr key={index}>
                            <td>{race.name}</td>
                            <td>{race.count}</td>
                            <td>{stats.totalCharacters > 0 ? Math.round((race.count / stats.totalCharacters) * 100) : 0}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Classi più popolari */}
        <div className={styles.statsSection}>
            <h4 className={styles.statsTitle}>⚔️ Classi più popolari</h4>
            <table className={styles.adminTable}>
                <thead>
                    <tr>
                        <th>Classe</th>
                        <th>Personaggi</th>
                        <th>Percentuale</th>
                    </tr>
                </thead>
                <tbody>
                    {stats.topClasses.map((cls, index) => (
                        <tr key={index}>
                            <td>{cls.name}</td>
                            <td>{cls.count}</td>
                            <td>{stats.totalCharacters > 0 ? Math.round((cls.count / stats.totalCharacters) * 100) : 0}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Talenti più popolari */}
        <div className={styles.statsSection}>
            <h4 className={styles.statsTitle}>✨ Talenti più popolari</h4>
            <table className={styles.adminTable}>
                <thead>
                    <tr>
                        <th>Talento</th>
                        <th>Personaggi</th>
                        <th>Percentuale</th>
                    </tr>
                </thead>
                <tbody>
                    {stats.topFeats.map((feat, index) => (
                        <tr key={index}>
                            <td>{feat.name}</td>
                            <td>{feat.count}</td>
                            <td>{stats.totalCharacters > 0 ? Math.round((feat.count / stats.totalCharacters) * 100) : 0}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Attività utenti */}
        <div className={styles.statsSection}>
            <h4 className={styles.statsTitle}>👥 Utenti più attivi</h4>
            <table className={styles.adminTable}>
                <thead>
                    <tr>
                        <th>Utente</th>
                        <th>Personaggi creati</th>
                        <th>Azioni</th>
                    </tr>
                </thead>
                <tbody>
                    {stats.userActivity.map((user, index) => (
                        <tr key={index}>
                            <td>{user.email}</td>
                            <td>{user.count}</td>
                            <td>
                                <a
                                    href={`/user-details/${encodeURIComponent(user.email)}`}
                                    className={styles.tableLink}
                                >
                                    📋 Vedi personaggi
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
)