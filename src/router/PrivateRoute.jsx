import { Navigate } from 'react-router-dom'
import { CurrentUserManager } from '../utils/localStorage'

export const PrivateRoute = ({ children, isAdmin = false }) => {
    const user = CurrentUserManager.getCurrentUser()

    if (!user) {
        return <Navigate to="/auth" replace />
    }

    if (isAdmin && !CurrentUserManager.isCurrentUserAdmin()) {
        return <Navigate to="/" replace />
    }

    return children
}
