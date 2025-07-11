import { Routes, Route } from 'react-router-dom';
import { AuthPage } from '@pages/AuthPage';
import { Dashboard } from '@pages/Dashboard';
import CompendiumPage from '@pages/CompendiumPage';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { AppLayout } from '@layout/AppLayout';
import { CurrentUserManager } from '@utils/localStorage';
import CharacterWizard from '@pages/CharacterWizard';
import CharacterList from '@character/CharacterList';
import UserList from '@admin/UserList';
import CharacterEditPage from '@character/CharacterEditPage';

export const AppRouter = () => {
    const isAdmin = () => CurrentUserManager.isCurrentUserAdmin();

    return (
        <Routes>
            {/* Layout universale con navbar sempre presente */}
            <Route element={<AppLayout />}>
                {/* Pagina pubblica - Compendium accessibile a tutti */}
                <Route path="/compendium" element={<CompendiumPage />} />

                {/* Rotta pubblica - Auth */}
                <Route
                    path="/auth"
                    element={
                        <PublicRoute>
                            <AuthPage />
                        </PublicRoute>
                    }
                />

                {/* Rotte private - Solo utenti loggati */}
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/character-creation"
                    element={
                        <PrivateRoute>
                            <CharacterWizard />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/edit-character/:name"
                    element={
                        <PrivateRoute>
                            <CharacterWizard />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/edit-character/:email/:name"
                    element={
                        <PrivateRoute isAdmin={isAdmin()}>
                            <CharacterEditPage />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/my-characters"
                    element={
                        <PrivateRoute>
                            <CharacterList onlyCurrentUser={true} />
                        </PrivateRoute>
                    }
                />

                {/* Rotte admin */}
                <Route
                    path="/user-list"
                    element={
                        <PrivateRoute isAdmin={isAdmin()}>
                            <UserList />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/user-characters/:email"
                    element={
                        <PrivateRoute isAdmin={isAdmin()}>
                            <CharacterList onlyCurrentUser={false} />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/character-list"
                    element={
                        <PrivateRoute isAdmin={isAdmin()}>
                            <CharacterList onlyCurrentUser={false} />
                        </PrivateRoute>
                    }
                />
            </Route>
        </Routes>
    );
};