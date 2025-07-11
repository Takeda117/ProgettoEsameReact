import { useEffect, useState } from 'react'
import { CurrentUserManager } from '../utils/localStorage'
import { DashboardHeader } from '../components/dashboard/DashboardHeader'
import { MainStats } from '../components/dashboard/MainStats'
import { RecentCharacters } from '../components/dashboard/RecentCharacters'
import { AdminStats } from '../components/dashboard/AdminStats'
import { VersionInfo } from '../components/dashboard/VersionInfo'
import { getUserStats, getAdminStats } from '../utils/statsUtils'
import { initialStatsState } from '../constant/initialStates'

export const Dashboard = () => {
    const [stats, setStats] = useState(initialStatsState);

    const [loggedUser, _setLoggedUser] = useState(() => CurrentUserManager.getCurrentUser());

    useEffect(() => {
        if (!loggedUser) return;

        try {
            const isAdmin = CurrentUserManager.isCurrentUserAdmin();
            const userStats = getUserStats(loggedUser.email);
            const adminStats = isAdmin ? getAdminStats() : {};

            setStats({
                myCharacters: userStats.myCharactersCount,
                recentCharacters: userStats.recentCharacters,
                totalUsers: adminStats.totalUsers || 0,
                totalCharacters: adminStats.totalCharacters || 0,
                topRaces: adminStats.topRaces || [],
                topClasses: adminStats.topClasses || [],
                topFeats: adminStats.topFeats || [],
                userActivity: adminStats.userActivity || []
            });
        } catch (error) {
            console.error('Errore nel caricamento delle statistiche:', error);
        }
    }, [loggedUser]);

    if (!loggedUser) {
        return (
            <div className="page-container">
                <div className="dashboard-section">
                    <p className="text-body">⚠️ Errore: utente non trovato</p>
                </div>
            </div>
        );
    }

    const isAdmin = CurrentUserManager.isCurrentUserAdmin();

    return (
        <div className="dashboard-container">
            <DashboardHeader loggedUser={loggedUser} />
            <MainStats stats={stats} isAdmin={isAdmin} />
            <RecentCharacters characters={stats.recentCharacters} />
            {isAdmin && <AdminStats stats={stats} />}
            <VersionInfo stats={stats} isAdmin={isAdmin} />
        </div>
    );
};