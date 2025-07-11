import { SearchBar, Select, Button } from '@ui';

const ListControls = ({
    searchTerm,
    onSearchChange,
    sortBy,
    sortOrder,
    onSortChange,
    filters,
    onFilterChange,
    onClearFilters,
    hasActiveFilters,
    originalCount,
    filteredCount,
    sortOptions = [],
    filterOptions = [],
    placeholder = "Cerca...",
    title = "Filtri e Ricerca",
    showQuickSorts = true,
    quickSortFields = ['name', 'email', 'createdAt']
}) => {
    // Opzioni di ordinamento predefinite
    const defaultSortOptions = quickSortFields.map(field => {
        const labels = {
            name: 'Nome',
            email: 'Email',
            createdAt: 'Data creazione',
            race: 'Razza',
            class: 'Classe',
            feat: 'Talento',
            armor: 'Armatura',
            weapon: 'Arma'
        };

        return {
            value: field,
            label: labels[field] || field.charAt(0).toUpperCase() + field.slice(1)
        };
    });

    const allSortOptions = [...defaultSortOptions, ...sortOptions];

    return (
        <div className="dashboard-section" style={{ marginBottom: 'var(--space-6)' }}>
            {/* Header con contatori */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--space-4)',
                flexWrap: 'wrap',
                gap: 'var(--space-2)'
            }}>
                <h3 className="dashboard-section-title" style={{ margin: 0 }}>
                    🔍 {title}
                </h3>
                <div className="text-body" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-3)',
                    flexWrap: 'wrap'
                }}>
                    {/* Contatori risultati */}
                    <span>
                        {filteredCount === originalCount ? (
                            <span><strong>{originalCount}</strong> elementi</span>
                        ) : (
                            <span><strong>{filteredCount}</strong> di <strong>{originalCount}</strong> elementi</span>
                        )}
                    </span>

                    {/* Quick sort buttons */}
                    {showQuickSorts && (
                        <div style={{
                            display: 'flex',
                            gap: 'var(--space-1)',
                            alignItems: 'center'
                        }}>
                            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-iron)' }}>
                                Ordina:
                            </span>
                            <Button
                                variant={sortBy === 'name' && sortOrder === 'asc' ? 'primary' : 'ghost'}
                                size="sm"
                                onClick={() => onSortChange('name', 'asc')}
                                style={{ padding: 'var(--space-1) var(--space-2)' }}
                            >
                                A-Z
                            </Button>
                            <Button
                                variant={sortBy === 'name' && sortOrder === 'desc' ? 'primary' : 'ghost'}
                                size="sm"
                                onClick={() => onSortChange('name', 'desc')}
                                style={{ padding: 'var(--space-1) var(--space-2)' }}
                            >
                                Z-A
                            </Button>
                            {quickSortFields.includes('createdAt') && (
                                <Button
                                    variant={sortBy === 'createdAt' && sortOrder === 'desc' ? 'primary' : 'ghost'}
                                    size="sm"
                                    onClick={() => onSortChange('createdAt', 'desc')}
                                    style={{ padding: 'var(--space-1) var(--space-2)' }}
                                >
                                    📅 Recenti
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Controlli principali */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: 'var(--space-4)',
                alignItems: 'end'
            }}>
                {/* Barra di ricerca */}
                <div>
                    <SearchBar
                        value={searchTerm}
                        onChange={onSearchChange}
                        placeholder={placeholder}
                    />
                </div>

                {/* Ordinamento avanzato */}
                {allSortOptions.length > 0 && (
                    <div>
                        <Select
                            label="📊 Ordina per"
                            value={`${sortBy}-${sortOrder}`}
                            onChange={(e) => {
                                const [field, order] = e.target.value.split('-');
                                onSortChange(field, order);
                            }}
                            options={allSortOptions.flatMap(option => [
                                { value: `${option.value}-asc`, label: `${option.label} ↑` },
                                { value: `${option.value}-desc`, label: `${option.label} ↓` }
                            ])}
                            size="sm"
                            fullWidth
                        />
                    </div>
                )}

                {/* Filtri personalizzati */}
                {filterOptions.map((filterOption) => (
                    <div key={filterOption.key}>
                        <Select
                            label={filterOption.label}
                            value={filters[filterOption.key] || 'all'}
                            onChange={(e) => onFilterChange(filterOption.key, e.target.value)}
                            options={[
                                { value: 'all', label: 'Tutti' },
                                ...filterOption.options
                            ]}
                            size="sm"
                            fullWidth
                        />
                    </div>
                ))}

                {/* Pulsante reset */}
                {hasActiveFilters && (
                    <div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClearFilters}
                            fullWidth
                        >
                            🔄 Pulisci Filtri
                        </Button>
                    </div>
                )}
            </div>

            {/* Filtri attivi visualizzati come tag */}
            {hasActiveFilters && (
                <div style={{
                    marginTop: 'var(--space-4)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 'var(--space-2)',
                    alignItems: 'center'
                }}>
                    <span style={{
                        fontSize: 'var(--font-size-xs)',
                        color: 'var(--color-iron)',
                        fontWeight: 'var(--font-weight-medium)'
                    }}>
                        Filtri attivi:
                    </span>

                    {/* Tag ricerca */}
                    {searchTerm && (
                        <div style={{
                            background: 'var(--gradient-gold)',
                            color: 'var(--color-void)',
                            padding: 'var(--space-1) var(--space-3)',
                            borderRadius: 'var(--radius-full)',
                            fontSize: 'var(--font-size-xs)',
                            fontWeight: 'var(--font-weight-medium)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-1)'
                        }}>
                            🔍 "{searchTerm}"
                            <button
                                onClick={() => onSearchChange('')}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'inherit',
                                    cursor: 'pointer',
                                    padding: 0,
                                    marginLeft: 'var(--space-1)'
                                }}
                                aria-label="Rimuovi ricerca"
                            >
                                ✕
                            </button>
                        </div>
                    )}

                    {/* Tag ordinamento */}
                    {(sortBy !== 'name' || sortOrder !== 'asc') && (
                        <div style={{
                            background: 'var(--gradient-magic)',
                            color: 'white',
                            padding: 'var(--space-1) var(--space-3)',
                            borderRadius: 'var(--radius-full)',
                            fontSize: 'var(--font-size-xs)',
                            fontWeight: 'var(--font-weight-medium)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-1)'
                        }}>
                            📊 {allSortOptions.find(opt => opt.value === sortBy)?.label || sortBy} {sortOrder === 'desc' ? '↓' : '↑'}
                            <button
                                onClick={() => onSortChange('name', 'asc')}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'inherit',
                                    cursor: 'pointer',
                                    padding: 0,
                                    marginLeft: 'var(--space-1)'
                                }}
                                aria-label="Reset ordinamento"
                            >
                                ✕
                            </button>
                        </div>
                    )}

                    {/* Tag filtri */}
                    {Object.entries(filters).map(([key, value]) => {
                        if (!value || value === 'all') return null;

                        const filterOption = filterOptions.find(f => f.key === key);
                        const option = filterOption?.options.find(o => o.value === value);

                        return (
                            <div key={key} style={{
                                background: 'var(--color-info)',
                                color: 'white',
                                padding: 'var(--space-1) var(--space-3)',
                                borderRadius: 'var(--radius-full)',
                                fontSize: 'var(--font-size-xs)',
                                fontWeight: 'var(--font-weight-medium)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--space-1)'
                            }}>
                                {filterOption?.label}: {option?.label || value}
                                <button
                                    onClick={() => onFilterChange(key, 'all')}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: 'inherit',
                                        cursor: 'pointer',
                                        padding: 0,
                                        marginLeft: 'var(--space-1)'
                                    }}
                                    aria-label={`Rimuovi filtro ${filterOption?.label}`}
                                >
                                    ✕
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Messaggio nessun risultato */}
            {filteredCount === 0 && originalCount > 0 && (
                <div style={{
                    marginTop: 'var(--space-4)',
                    padding: 'var(--space-4)',
                    background: 'var(--color-warning-light)',
                    border: '2px solid var(--color-warning)',
                    borderRadius: 'var(--radius-lg)',
                    textAlign: 'center'
                }}>
                    <p className="text-body" style={{ color: 'var(--color-warning)', margin: 0 }}>
                        🔍 Nessun risultato trovato con i filtri applicati.
                    </p>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClearFilters}
                        style={{ marginTop: 'var(--space-2)' }}
                    >
                        Rimuovi tutti i filtri
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ListControls;