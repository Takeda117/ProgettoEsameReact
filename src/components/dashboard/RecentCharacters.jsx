import { Card } from "@ui"

export const RecentCharacters = ({ characters }) => {
    if (characters.length === 0) return null

    return (
        <div className="dashboard-section">
            <h3 className="dashboard-section-title">⚔️ I tuoi personaggi recenti</h3>
            <div className="grid grid-auto">
                {characters.map((char, index) => (
                    <Card key={index} padding="md" shadow="md" hoverable className="ornate-border">
                        <Card.Header>
                            <Card.Title as="h4">
                                {char.name}
                            </Card.Title>
                            <Card.Text>
                                {char.race} {char.class}
                            </Card.Text>
                        </Card.Header>

                        <Card.Body>
                            <Card.Text>
                                <strong>📅 Creato:</strong> {char.createdAt &&
                                    new Date(char.createdAt).toLocaleDateString('it-IT')}
                            </Card.Text>
                            <Card.Text>
                                <strong>✨ Talento:</strong> {char.feat}
                            </Card.Text>
                            <Card.Text>
                                <strong>🛡️ Armatura:</strong> {char.armor}
                            </Card.Text>
                            <Card.Text>
                                <strong>⚔️ Arma:</strong> {char.weapon}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    )
}