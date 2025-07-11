import { Card, SearchBar } from '@ui';
import { useState, useMemo } from 'react';

const CompendiumList = ({ items, title, onItemSelect, section }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Filtra gli elementi in base al termine di ricerca
    const filteredItems = useMemo(() => {
        if (!searchTerm) return items;
        return items.filter(item =>
            item.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [items, searchTerm]);

    const getSectionEmoji = (section) => {
        const emojiMap = {
            races: '🧝',
            classes: '⚔️',
            feats: '✨',
            weapons: '🗡️',
            armors: '🛡️'
        };
        return emojiMap[section] || '📜';
    };

    return (
        <div className="dashboard-section">
            <div className="dashboard-section-title" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--space-6)'
            }}>
                <h2>{title}</h2>
                <span className="text-body">
                    {filteredItems.length} elementi
                </span>
            </div>

            {/* Barra di ricerca */}
            <div style={{ marginBottom: 'var(--space-6)' }}>
                <SearchBar
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder={`Cerca in ${title.toLowerCase()}...`}
                    suggestions={items}
                />
            </div>

            {/* Lista elementi */}
            {filteredItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
                    <p className="text-body">
                        {searchTerm ?
                            `🔍 Nessun risultato trovato per "${searchTerm}"` :
                            '📭 Nessun elemento disponibile'
                        }
                    </p>
                </div>
            ) : (
                <div className="grid grid-auto">
                    {filteredItems.map((item, index) => (
                        <Card
                            key={index}
                            padding="md"
                            shadow="sm"
                            hoverable
                            clickable
                            onClick={() => onItemSelect(item)}
                            className="ornate-border"
                        >
                            <Card.Body style={{ textAlign: 'center' }}>
                                <div style={{
                                    fontSize: 'var(--font-size-2xl)',
                                    marginBottom: 'var(--space-2)'
                                }}>
                                    {getSectionEmoji(section)}
                                </div>
                                <Card.Title as="h4" style={{
                                    margin: 0,
                                    fontSize: 'var(--font-size-lg)'
                                }}>
                                    {item}
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CompendiumList;