import { Card } from '@ui';

const CompendiumDetails = ({ item, section }) => {
    const getSectionInfo = (section, item) => {
        const sectionMap = {
            races: {
                icon: '🧝',
                title: 'Razza',
                description: `La razza ${item} offre caratteristiche uniche e abilità speciali che influenzano il gameplay del personaggio.`,
                traits: [
                    'Bonus alle caratteristiche',
                    'Abilità razziali uniche',
                    'Resistenze specifiche',
                    'Linguaggi conosciuti'
                ]
            },
            classes: {
                icon: '⚔️',
                title: 'Classe',
                description: `La classe ${item} determina le abilità primarie, i punti ferita e lo stile di combattimento del personaggio.`,
                traits: [
                    'Punti ferita per livello',
                    'Competenze in armi e armature',
                    'Abilità di classe speciali',
                    'Progressione dei livelli'
                ]
            },
            feats: {
                icon: '✨',
                title: 'Talento',
                description: `Il talento ${item} conferisce al personaggio abilità speciali e bonus che migliorano le sue capacità.`,
                traits: [
                    'Prerequisiti richiesti',
                    'Benefici conferiti',
                    'Utilizzi per riposo',
                    'Sinergie con altre abilità'
                ]
            },
            weapons: {
                icon: '🗡️',
                title: 'Arma',
                description: `L'arma ${item} è uno strumento di combattimento con caratteristiche specifiche per il combattimento.`,
                traits: [
                    'Danno inferto',
                    'Proprietà speciali',
                    'Categoria di peso',
                    'Competenza richiesta'
                ]
            },
            armors: {
                icon: '🛡️',
                title: 'Armatura',
                description: `L'armatura ${item} fornisce protezione e modifica le statistiche difensive del personaggio.`,
                traits: [
                    'Classe Armatura (CA)',
                    'Bonus massimo Destrezza',
                    'Penalità ai controlli',
                    'Velocità di movimento'
                ]
            }
        };

        return sectionMap[section] || {
            icon: '📜',
            title: 'Elemento',
            description: `Informazioni su ${item}.`,
            traits: ['Caratteristiche base']
        };
    };

    const info = getSectionInfo(section, item);

    return (
        <div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                marginBottom: 'var(--space-4)'
            }}>
                <div style={{ fontSize: 'var(--font-size-3xl)' }}>
                    {info.icon}
                </div>
                <div style={{ flex: 1 }}>
                    <p style={{
                        margin: 0,
                        fontStyle: 'italic',
                        color: 'var(--color-iron)',
                        fontSize: 'var(--font-size-sm)'
                    }}>
                        {info.title}
                    </p>
                </div>
            </div>

            <Card.Text style={{ marginBottom: 'var(--space-4)' }}>
                {info.description}
            </Card.Text>

            <div style={{ marginBottom: 'var(--space-4)' }}>
                <h4 className="text-heading" style={{
                    fontSize: 'var(--font-size-lg)',
                    marginBottom: 'var(--space-3)',
                    color: 'var(--color-primary-600)'
                }}>
                    📋 Caratteristiche Principali:
                </h4>

                <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                }}>
                    {info.traits.map((trait, index) => (
                        <li key={index} style={{
                            padding: 'var(--space-2) 0',
                            borderBottom: '1px solid var(--color-stone)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-2)'
                        }}>
                            <span style={{ color: 'var(--color-primary-500)' }}>•</span>
                            <Card.Text style={{ margin: 0 }}>
                                {trait}
                            </Card.Text>
                        </li>
                    ))}
                </ul>
            </div>

            <div style={{
                background: 'var(--color-info-light)',
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                border: '2px solid var(--color-info)'
            }}>
                <Card.Text style={{
                    margin: 0,
                    fontStyle: 'italic',
                    color: 'var(--color-info)'
                }}>
                    💡 <strong>Suggerimento:</strong> Consulta il manuale del giocatore per informazioni dettagliate su regole specifiche e interazioni con altre abilità.
                </Card.Text>
            </div>
        </div>
    );
};

export default CompendiumDetails;