import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { UserManager, CharacterManager, CurrentUserManager } from "@utils/localStorage";
import { Button, Modal } from "@ui";
import styles from '@ui/styles/table.module.css';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, user: null });
    const currentUser = CurrentUserManager.getCurrentUser();
    const navigate = useNavigate();

    const loadUsers = useCallback(() => {
        const all = UserManager.getAllUsers();
        const filtered = all.filter(user => user.email !== currentUser.email);
        setUsers(filtered);
    }, [currentUser.email]);

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    const handleDeleteClick = (user) => {
        setDeleteModal({ isOpen: true, user });
    };

    const handleDeleteConfirm = () => {
        const user = deleteModal.user;
        try {
            CharacterManager.deleteCharactersByUser(user.email);
            UserManager.deleteUser(user.email);
            loadUsers();
            setDeleteModal({ isOpen: false, user: null });
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteModal({ isOpen: false, user: null });
    };

    const getRoleIcon = (role) => {
        return role === 'admin' ? '👑' : '⚔️';
    };

    const getRoleLabel = (role) => {
        return role === 'admin' ? 'Amministratore' : 'Avventuriero';
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h2 className="page-title">👥 Gestione Utenti</h2>
                <p className="page-subtitle">Amministra gli avventurieri del regno</p>
            </div>

            <div className="dashboard-section">
                <div className="dashboard-section-title" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 'var(--space-6)'
                }}>
                    <h3>📋 Lista Utenti Registrati</h3>
                    <span className="text-body">
                        {users.length} utenti
                    </span>
                </div>

                {users.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
                        <p className="text-body">
                            <em>🏰 Nessun altro utente registrato nel regno.</em>
                        </p>
                    </div>
                ) : (
                    <table className={styles.adminTable}>
                        <thead>
                            <tr>
                                <th>📧 Email</th>
                                <th>🎭 Ruolo</th>
                                <th>🔧 Azioni</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.email}>
                                    <td>{user.email}</td>
                                    <td>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                            {getRoleIcon(user.role)}
                                            {getRoleLabel(user.role)}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{
                                            display: 'flex',
                                            gap: 'var(--space-2)',
                                            flexWrap: 'wrap'
                                        }}>
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={() => navigate(`/user-characters/${encodeURIComponent(user.email)}`)}
                                            >
                                                👁️ Vedi personaggi
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleDeleteClick(user)}
                                            >
                                                🗑️ Elimina
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Modal di conferma eliminazione */}
            <Modal
                isOpen={deleteModal.isOpen}
                onClose={handleDeleteCancel}
                size="md"
            >
                <Modal.Header>
                    <Modal.Title>⚠️ Conferma Eliminazione Utente</Modal.Title>
                    <Modal.CloseButton onClick={handleDeleteCancel} />
                </Modal.Header>

                <Modal.Body>
                    <p className="text-body">
                        Sei sicuro di voler eliminare l'utente <strong>{deleteModal.user?.email}</strong>?
                    </p>
                    <p className="text-body" style={{
                        color: 'var(--color-warning)',
                        fontStyle: 'italic',
                        marginTop: 'var(--space-3)'
                    }}>
                        ⚠️ Questa azione eliminerà anche tutti i personaggi creati dall'utente.
                    </p>
                    <p className="text-body" style={{
                        color: 'var(--color-danger)',
                        fontWeight: 'bold',
                        marginTop: 'var(--space-3)'
                    }}>
                        🚨 L'azione non può essere annullata.
                    </p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDeleteCancel}>
                        Annulla
                    </Button>
                    <Button variant="danger" onClick={handleDeleteConfirm}>
                        🗑️ Elimina Definitivamente
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UserList;