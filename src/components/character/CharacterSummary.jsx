import { Card } from "@ui";

const CharacterSummary = ({ character }) => {
    if (!character) return null;

    return (
        <Card padding="md" shadow="md" className="ornate-border">
            <Card.Header>
                <Card.Title as="h3">📋 Riepilogo</Card.Title>
            </Card.Header>

            <Card.Body>
                <div className="grid grid-1" style={{ gap: 'var(--space-3)' }}>
                    <Card.Text>
                        <strong>🧝 Razza:</strong> {character.race || 'Non selezionata'}
                    </Card.Text>
                    <Card.Text>
                        <strong>⚔️ Classe:</strong> {character.class || 'Non selezionata'}
                    </Card.Text>
                    <Card.Text>
                        <strong>✨ Talento:</strong> {character.feat || 'Non selezionato'}
                    </Card.Text>
                    <Card.Text>
                        <strong>🛡️ Armatura:</strong> {character.armor || 'Non selezionata'}
                    </Card.Text>
                    <Card.Text>
                        <strong>⚔️ Arma:</strong> {character.weapon || 'Non selezionata'}
                    </Card.Text>
                </div>
            </Card.Body>
        </Card>
    );
};

export default CharacterSummary;