import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { CurrentUserManager } from '../utils/localStorage'

export const AppLayout = () => {
    const isAdmin = CurrentUserManager.isCurrentUserAdmin()

    return (
        <div className="app">
            <Navbar isAdmin={isAdmin} />
            <main>
                <Outlet />
            </main>
        </div>
    )
}