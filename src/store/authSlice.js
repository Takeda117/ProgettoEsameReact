import { createSlice } from '@reduxjs/toolkit';
import { UserManager, CurrentUserManager } from '../utils/localStorage';

const initialState = {
    currentUser: CurrentUserManager.getCurrentUser(),
    loading: false,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            try {
                const user = UserManager.validateLogin(action.payload.email, action.payload.password);

                if (user) {
                    CurrentUserManager.setCurrentUser(user);
                    state.currentUser = user;
                    state.error = null;
                } else {
                    state.error = 'Credenziali non valide';
                    alert('User not found');
                }
            } catch (error) {
                state.error = error.message;
                console.error('Errore durante il login:', error);
            }
        },

        logout: (state) => {
            CurrentUserManager.clearCurrentUser();
            state.currentUser = null;
            state.error = null;
        },

        register: (state, action) => {
            try {
                UserManager.registerUser(action.payload);
                state.error = null;
            } catch (error) {
                state.error = error.message;
                alert(error.message === 'User already exists' ? 'User already exists' : 'Errore durante la registrazione');
            }
        },

        clearError: (state) => {
            state.error = null;
        },

        updateCurrentUser: (state, action) => {
            try {
                const updatedUser = action.payload;
                CurrentUserManager.setCurrentUser(updatedUser);
                state.currentUser = updatedUser;
            } catch (error) {
                state.error = error.message;
                console.error('Errore nell\'aggiornamento dell\'utente corrente:', error);
            }
        }
    }
});

export const { login, logout, register, clearError, updateCurrentUser } = authSlice.actions;
export default authSlice.reducer;
