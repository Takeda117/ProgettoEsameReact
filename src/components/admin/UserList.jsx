import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { UserManager, CharacterManager, CurrentUserManager } from "@utils/localStorage";
import { useListFilters } from "@hooks/useListFilters";
import ListControls from "@components/ListControls";
import { Button, Modal } from "@ui";
import styles from '@ui/styles/table.module.css';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, user: null });
    const currentUser = CurrentUserManager.getCurrentUser();
    const navigate = useNavigate();

    // Configurazione filtri
    const filterConfig = {
        searchFields: ['email', 'role'],
        defaultSort: 'email',
        filterOptions: [
            {
                key: 'role',
                label: '🎭 Ruolo',
                options: [
                    { value: 'admin', label: '👑 Amministratore' },
                    { value: 'user', label: '⚔️ Avventuriero' }
                ]
            }
        ]
    };

    // Hook per filtri con persistenza URL
    const {
        processedData: filteredUsers,
        originalCount,
        filteredCount,
        searchTerm,
        sortBy,
        sortOrder,
        filters,
        hasActiveFilters,
        onSearchChange,
        onFilterChange,
        onSortChange,
        onClearFilters
    } = useListFilters(users, filterConfig);

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

    const createSortableHeader = (field, icon, label) => (
        <th>
            <button
                onClick={() => onSortChange(field, sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc')}
                style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'inherit',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-1)',
                    font: 'inherit',
                    fontWeight: 'inherit'
                }}
            >
                {icon} {label}
                {sortBy === field && (
                    <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                )}
            </button>
        </th>
    );

    return (
        <div className="page-container">
            <div className="page-header">
                <h2 className="page-title">👥 Gestione Utenti</h2>
                <p className="page-subtitle">Amministra gli avventurieri del regno</p>
            </div>

            {/* Controlli di filtro */}
            <ListControls
                searchTerm={searchTerm}
                onSearchChange={onSearchChange}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={onSortChange}
                filters={filters}
                onFilterChange={onFilterChange}
                onClearFilters={onClearFilters}
                hasActiveFilters={hasActiveFilters}
                originalCount={originalCount}
                filteredCount={filteredCount}
                filterOptions={filterConfig.filterOptions}
                placeholder="Cerca per email o ruolo..."
                title="Filtri Utenti"
                quickSortFields={['email', 'role']}
            />

            <div className="dashboard-section">
                {filteredUsers.length === 0 && originalCount === 0 ? (
                    <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
                        <p className="text-body">
                            <em>🏰 Nessun altro utente registrato nel regno.</em>
                        </p>
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table className={styles.adminTable}>
                            <thead>
                                <tr>
                                    {createSortableHeader('email', '📧', 'Email')}
                                    {createSortableHeader('role', '🎭', 'Ruolo')}
                                    <th>🔧 Azioni</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
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
                    </div>
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