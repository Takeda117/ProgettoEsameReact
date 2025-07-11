import { Navigate } from 'react-router-dom'
import { CurrentUserManager } from '../utils/localStorage'

export const PublicRoute = ({ children, redirectTo = "/" }) => {
    const user = CurrentUserManager.getCurrentUser()
    return !user ? children : <Navigate to={redirectTo} replace />
}