import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { CharacterManager, CurrentUserManager } from "@utils/localStorage";
import { useListFilters } from "@hooks/useListFilters";
import ListControls from "@components/ListControls";
import { Button, Modal } from "@ui";
import styles from '@ui/styles/table.module.css';

const CharactersList = ({ onlyCurrentUser = false }) => {
    const [characters, setCharacters] = useState([]);
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, character: null });
    const navigate = useNavigate();
    const { email } = useParams();

    const currentUser = useSelector((state) => state.auth?.currentUser);
    const isAdmin = CurrentUserManager.isCurrentUserAdmin();

    // Configurazione filtri
    const filterConfig = {
        searchFields: ['name', 'race', 'class', 'feat', 'armor', 'weapon', 'email'],
        defaultSort: 'name',
        filterOptions: []
    };

    // Genera opzioni filtro dinamicamente
    if (characters.length > 0) {
        const createFilterOption = (key, label, icon) => {
            const uniqueValues = [...new Set(characters.map(char => char[key]))]
                .filter(Boolean)
                .sort();

            if (uniqueValues.length > 1) {
                return {
                    key,
                    label: `${icon} ${label}`,
                    options: uniqueValues.map(value => ({ value, label: value }))
                };
            }
            return null;
        };

        filterConfig.filterOptions = [
            createFilterOption('race', 'Razza', '🧝'),
            createFilterOption('class', 'Classe', '⚔️'),
            createFilterOption('feat', 'Talento', '✨'),
            createFilterOption('armor', 'Armatura', '🛡️'),
            createFilterOption('weapon', 'Arma', '🗡️')
        ].filter(Boolean);

        // Solo per admin - aggiungi filtro utente se non siamo in una pagina specifica utente
        if (isAdmin && !onlyCurrentUser && !email) {
            const userOptions = [...new Set(characters.map(char => char.email))]
                .filter(Boolean)
                .sort()
                .map(email => ({ value: email, label: email }));

            if (userOptions.length > 1) {
                filterConfig.filterOptions.unshift({
                    key: 'email',
                    label: '👤 Utente',
                    options: userOptions
                });
            }
        }
    }

    // Hook per filtri con persistenza URL
    const {
        processedData: filteredCharacters,
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
    } = useListFilters(characters, filterConfig);

    useEffect(() => {
        const allCharacters = CharacterManager.getAllCharacters();

        if (onlyCurrentUser && currentUser?.email) {
            const myCharacters = allCharacters.filter(
                (char) => char.email === currentUser.email
            );
            setCharacters(myCharacters);
        } else if (email) {
            const decodedEmail = decodeURIComponent(email);
            const userCharacters = allCharacters.filter(
                (char) => char.email === decodedEmail
            );
            setCharacters(userCharacters);
        } else {
            setCharacters(allCharacters);
        }
    }, [onlyCurrentUser, currentUser?.email, email]);

    const handleEdit = (char) => {
        const encodedEmail = encodeURIComponent(char.email);
        const encodedName = encodeURIComponent(char.name);

        if (onlyCurrentUser) {
            navigate(`/edit-character/${encodedName}`);
        } else {
            navigate(`/edit-character/${encodedEmail}/${encodedName}`);
        }
    };

    const handleDeleteClick = (char) => {
        setDeleteModal({ isOpen: true, character: char });
    };

    const handleDeleteConfirm = () => {
        const char = deleteModal.character;
        CharacterManager.deleteCharacter(
            (c) => c.email === char.email && c.name === char.name
        );

        setCharacters((prev) =>
            prev.filter((c) => !(c.email === char.email && c.name === char.name))
        );

        setDeleteModal({ isOpen: false, character: null });
    };

    const handleDeleteCancel = () => {
        setDeleteModal({ isOpen: false, character: null });
    };

    // Determina il titolo in base al contesto
    const getPageTitle = () => {
        if (onlyCurrentUser) return "⚔️ I Miei Personaggi";
        if (email) return `👥 Personaggi di ${decodeURIComponent(email)}`;
        return "📋 Tutti i Personaggi";
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
                <h2 className="page-title">{getPageTitle()}</h2>
                <p className="page-subtitle">
                    {onlyCurrentUser
                        ? "Gestisci i tuoi eroi"
                        : email
                            ? "Visualizza i personaggi di questo utente"
                            : "Panoramica di tutti i personaggi nel regno"
                    }
                </p>
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
                placeholder="Cerca per nome, razza, classe, talento..."
                title="Filtri Personaggi"
                quickSortFields={['name', 'createdAt', 'race', 'class']}
            />

            <div className="dashboard-section">
                {filteredCharacters.length === 0 && originalCount === 0 ? (
                    <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
                        <p className="text-body">
                            <em>🏰 Nessun personaggio creato ancora.</em>
                        </p>
                        {onlyCurrentUser && (
                            <Button
                                variant="primary"
                                onClick={() => navigate('/character-creation')}
                                style={{ marginTop: 'var(--space-4)' }}
                                className="glow-effect"
                            >
                                ✨ Crea il tuo primo personaggio
                            </Button>
                        )}
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table className={styles.adminTable}>
                            <thead>
                                <tr>
                                    {!onlyCurrentUser && !email && createSortableHeader('email', '👤', 'Utente')}
                                    {createSortableHeader('name', '🎭', 'Nome')}
                                    {createSortableHeader('race', '🧝', 'Razza')}
                                    {createSortableHeader('class', '⚔️', 'Classe')}
                                    {createSortableHeader('feat', '✨', 'Talento')}
                                    {createSortableHeader('armor', '🛡️', 'Armatura')}
                                    {createSortableHeader('weapon', '🗡️', 'Arma')}
                                    {createSortableHeader('createdAt', '📅', 'Creato')}
                                    <th>🔧 Azioni</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCharacters.map((char, index) => (
                                    <tr key={index}>
                                        {!onlyCurrentUser && !email && <td>{char.email}</td>}
                                        <td><strong>{char.name}</strong></td>
                                        <td>{char.race}</td>
                                        <td>{char.class}</td>
                                        <td>{char.feat}</td>
                                        <td>{char.armor}</td>
                                        <td>{char.weapon}</td>
                                        <td>
                                            {char.createdAt
                                                ? new Date(char.createdAt).toLocaleDateString('it-IT')
                                                : '-'
                                            }
                                        </td>
                                        <td>
                                            {(onlyCurrentUser || isAdmin) && (
                                                <div style={{
                                                    display: 'flex',
                                                    gap: 'var(--space-2)',
                                                    flexWrap: 'wrap'
                                                }}>
                                                    <Button
                                                        variant="secondary"
                                                        size="sm"
                                                        onClick={() => handleEdit(char)}
                                                    >
                                                        ✏️ Modifica
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => handleDeleteClick(char)}
                                                    >
                                                        🗑️ Elimina
                                                    </Button>
                                                </div>
                                            )}
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
                    <Modal.Title>⚠️ Conferma Eliminazione</Modal.Title>
                    <Modal.CloseButton onClick={handleDeleteCancel} />
                </Modal.Header>

                <Modal.Body>
                    <p className="text-body">
                        Sei sicuro di voler eliminare il personaggio <strong>"{deleteModal.character?.name}"</strong>?
                    </p>
                    <p className="text-body" style={{
                        color: 'var(--color-danger)',
                        fontStyle: 'italic',
                        marginTop: 'var(--space-3)'
                    }}>
                        ⚠️ Questa azione non può essere annullata.
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

export default CharactersList;