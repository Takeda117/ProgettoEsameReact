import styles from './styles/filter.module.css';

const Filter = ({
    filters = [],
    activeFilters = {},
    onFilterChange,
    clearable = true,
    className = '',
    ...props
}) => {
    const filterClasses = [
        styles.filterContainer,
        className
    ].filter(Boolean).join(' ');

    const handleFilterChange = (filterKey, value) => {
        const newFilters = { ...activeFilters };

        if (value === '' || value === null) {
            delete newFilters[filterKey];
        } else {
            newFilters[filterKey] = value;
        }

        onFilterChange(newFilters);
    };

    const handleClearAll = () => {
        onFilterChange({});
    };

    const hasActiveFilters = Object.keys(activeFilters).length > 0;

    return (
        <div className={filterClasses} {...props}>
            {filters.map((filter) => (
                <div key={filter.key} className={styles.filterGroup}>
                    <label className={styles.filterLabel}>
                        {filter.label}
                    </label>

                    <select
                        value={activeFilters[filter.key] || ''}
                        onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                        className={styles.filterSelect}
                    >
                        <option value="">Tutti</option>
                        {filter.options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            ))}

            {hasActiveFilters && (
                <div className={styles.activeFilters}>
                    {Object.entries(activeFilters).map(([key, value]) => {
                        const filter = filters.find(f => f.key === key);
                        const option = filter?.options.find(o => o.value === value);

                        return (
                            <div key={key} className={styles.filterTag}>
                                <span>{filter?.label}: {option?.label || value}</span>
                                <button
                                    className={styles.removeFilter}
                                    onClick={() => handleFilterChange(key, '')}
                                    aria-label={`Remove ${filter?.label} filter`}
                                >
                                    ✕
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}

            {hasActiveFilters && clearable && (
                <button
                    className={styles.clearAll}
                    onClick={handleClearAll}
                >
                    Cancella tutti
                </button>
            )}
        </div>
    );
};

export default Filter;