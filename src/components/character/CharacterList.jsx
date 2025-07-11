import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { CharacterManager, CurrentUserManager } from "@utils/localStorage";
import { Button, Modal } from "@ui";
import styles from '@ui/styles/table.module.css';

const CharactersList = ({ onlyCurrentUser = false }) => {
    const [characters, setCharacters] = useState([]);
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, character: null });
    const navigate = useNavigate();
    const { email } = useParams();

    const currentUser = useSelector((state) => state.auth?.currentUser);
    const isAdmin = CurrentUserManager.isCurrentUserAdmin();

    useEffect(() => {
        const allCharacters = CharacterManager.getAllCharacters();

        if (onlyCurrentUser && currentUser?.email) {
            const myCharacters = allCharacters.filter(
                (char) => char.email === currentUser.email
            );
            setCharacters(myCharacters);
        } else if (email) {
            const userCharacters = allCharacters.filter(
                (char) => char.email === email
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

    return (
        <div className="page-container">
            <div className="page-header">
                <h2 className="page-title">
                    {onlyCurrentUser
                        ? "⚔️ I Miei Personaggi"
                        : email
                            ? `👥 Personaggi di ${email}`
                            : "📋 Tutti i Personaggi"}
                </h2>
            </div>

            <div className="dashboard-section">
                {characters.length === 0 ? (
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
                    <table className={styles.adminTable}>
                        <thead>
                            <tr>
                                <th>👤 Utente</th>
                                <th>🎭 Nome</th>
                                <th>🧝 Razza</th>
                                <th>⚔️ Classe</th>
                                <th>✨ Talento</th>
                                <th>🛡️ Armatura</th>
                                <th>🗡️ Arma</th>
                                <th>🔧 Azioni</th>
                            </tr>
                        </thead>
                        <tbody>
                            {characters.map((char, index) => (
                                <tr key={index}>
                                    <td>{char.email}</td>
                                    <td><strong>{char.name}</strong></td>
                                    <td>{char.race}</td>
                                    <td>{char.class}</td>
                                    <td>{char.feat}</td>
                                    <td>{char.armor}</td>
                                    <td>{char.weapon}</td>
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