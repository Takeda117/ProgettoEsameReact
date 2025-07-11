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
    title = "Filtri e Ricerca"
}) => {
    return (
        <div className="dashboard-section" style={{ marginBottom: 'var(--space-6)' }}>
            {/* Header con contatori */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--space-4)'
            }}>
                <h3 className="dashboard-section-title" style={{ margin: 0 }}>
                    🔍 {title}
                </h3>
                <div className="text-body">
                    {filteredCount === originalCount ? (
                        <span><strong>{originalCount}</strong> elementi</span>
                    ) : (
                        <span><strong>{filteredCount}</strong> di <strong>{originalCount}</strong> elementi</span>
                    )}
                </div>
            </div>

            {/* Controlli */}
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

                {/* Ordinamento */}
                {sortOptions.length > 0 && (
                    <div>
                        <Select
                            label="📊 Ordina per"
                            value={`${sortBy}-${sortOrder}`}
                            onChange={(e) => {
                                const [field, order] = e.target.value.split('-');
                                onSortChange(field, order);
                            }}
                            options={sortOptions.flatMap(option => [
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

            {/* Filtri attivi */}
            {hasActiveFilters && (
                <div style={{
                    marginTop: 'var(--space-4)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 'var(--space-2)'
                }}>
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

                    {Object.entries(filters).map(([key, value]) => {
                        if (!value || value === 'all') return null;

                        const filterOption = filterOptions.find(f => f.key === key);
                        const option = filterOption?.options.find(o => o.value === value);

                        return (
                            <div key={key} style={{
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
        </div>
    );
};

export default ListControls;