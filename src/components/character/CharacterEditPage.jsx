import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
    fetchArmors,
    fetchWeapons,
    fetchRaces,
    fetchClasses,
    fetchFeats
} from "@store/characterSlice";
import { CharacterManager } from "@utils/localStorage";
import { Input, Select, Button, Modal, Card } from "@ui";

const CharacterEditPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { email, name } = useParams();

    const { armors, weapons, races, classes, feats, loading } = useSelector((state) => state.character);

    const [character, setCharacter] = useState(null);
    const [originalName, setOriginalName] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Carica dati selezionabili
        dispatch(fetchArmors());
        dispatch(fetchWeapons());
        dispatch(fetchRaces());
        dispatch(fetchClasses());
        dispatch(fetchFeats());

        // Cerca il personaggio da modificare
        const allCharacters = CharacterManager.getAllCharacters();
        const decodedEmail = decodeURIComponent(email);
        const decodedName = decodeURIComponent(name);

        const foundCharacter = allCharacters.find(
            (char) => char.email === decodedEmail && char.name === decodedName
        );

        if (foundCharacter) {
            setCharacter(foundCharacter);
            setOriginalName(foundCharacter.name);
        } else {
            alert("Personaggio non trovato.");
            navigate("/user-list");
        }
    }, [dispatch, email, name, navigate]);

    const handleChange = (field, value) => {
        setCharacter((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    const saveCharacter = async () => {
        if (!character.name) {
            alert("Il nome del personaggio è obbligatorio.");
            return;
        }

        setIsLoading(true);
        try {
            const success = CharacterManager.updateCharacter(
                (char) => char.email === character.email && char.name === originalName,
                character
            );

            if (success) {
                alert("Personaggio aggiornato!");
                navigate(`/user-characters/${encodeURIComponent(character.email)}`);
            } else {
                alert("Errore durante il salvataggio.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const deleteCharacter = () => {
        CharacterManager.deleteCharacter(
            (char) => char.email === character.email && char.name === originalName
        );

        alert("Personaggio eliminato.");
        navigate(`/user-characters/${encodeURIComponent(character.email)}`);
        setDeleteModal(false);
    };

    if (loading || !character) {
        return (
            <div className="page-container">
                <div className="dashboard-section">
                    <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
                        <p className="text-body">🔄 Caricamento dati...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">✏️ Modifica Personaggio</h1>
                <p className="page-subtitle">Personalizza il tuo eroe</p>
            </div>

            <div className="form-container">
                <Card padding="lg" shadow="md" className="glow-effect">
                    <Card.Header>
                        <Card.Title>🎭 {character.name}</Card.Title>
                        <Card.Text>Modifica le caratteristiche del personaggio</Card.Text>
                    </Card.Header>

                    <Card.Body>
                        <div className="form-group">
                            <Input
                                label="🎭 Nome del Personaggio"
                                type="text"
                                value={character.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                                required
                                fullWidth
                            />
                        </div>

                        <div className="form-group">
                            <Select
                                label="🧝 Razza"
                                value={character.race}
                                onChange={(e) => handleChange("race", e.target.value)}
                                options={races}
                                placeholder="Seleziona una razza"
                                fullWidth
                            />
                        </div>

                        <div className="form-group">
                            <Select
                                label="⚔️ Classe"
                                value={character.class}
                                onChange={(e) => handleChange("class", e.target.value)}
                                options={classes}
                                placeholder="Seleziona una classe"
                                fullWidth
                            />
                        </div>

                        <div className="form-group">
                            <Select
                                label="✨ Talento"
                                value={character.feat}
                                onChange={(e) => handleChange("feat", e.target.value)}
                                options={feats}
                                placeholder="Seleziona un talento"
                                fullWidth
                            />
                        </div>

                        <div className="form-group">
                            <Select
                                label="🛡️ Armatura"
                                value={character.armor}
                                onChange={(e) => handleChange("armor", e.target.value)}
                                options={armors}
                                placeholder="Seleziona un'armatura"
                                fullWidth
                            />
                        </div>

                        <div className="form-group">
                            <Select
                                label="🗡️ Arma"
                                value={character.weapon}
                                onChange={(e) => handleChange("weapon", e.target.value)}
                                options={weapons}
                                placeholder="Seleziona un'arma"
                                fullWidth
                            />
                        </div>
                    </Card.Body>

                    <Card.Footer>
                        <div className="form-actions">
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={saveCharacter}
                                disabled={isLoading}
                                className="glow-effect"
                            >
                                {isLoading ? '🔄 Salvando...' : '💾 Salva Modifiche'}
                            </Button>

                            <Button
                                variant="danger"
                                size="lg"
                                onClick={() => setDeleteModal(true)}
                                disabled={isLoading}
                            >
                                🗑️ Elimina Personaggio
                            </Button>

                            <Button
                                variant="secondary"
                                size="lg"
                                onClick={() => navigate(`/user-characters/${encodeURIComponent(character.email)}`)}
                                disabled={isLoading}
                            >
                                ↩️ Annulla
                            </Button>
                        </div>
                    </Card.Footer>
                </Card>
            </div>

            {/* Modal di conferma eliminazione */}
            <Modal
                isOpen={deleteModal}
                onClose={() => setDeleteModal(false)}
                size="md"
            >
                <Modal.Header>
                    <Modal.Title>⚠️ Elimina Personaggio</Modal.Title>
                    <Modal.CloseButton onClick={() => setDeleteModal(false)} />
                </Modal.Header>

                <Modal.Body>
                    <p className="text-body">
                        Sei sicuro di voler eliminare il personaggio <strong>"{character.name}"</strong>?
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
                    <Button variant="secondary" onClick={() => setDeleteModal(false)}>
                        Annulla
                    </Button>
                    <Button variant="danger" onClick={deleteCharacter}>
                        🗑️ Elimina Definitivamente
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CharacterEditPage;