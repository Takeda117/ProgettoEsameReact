import { useState, useMemo } from 'react';

export const useListFilters = (data, config) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState(config.defaultSort || 'name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [filters, setFilters] = useState({});

    // Funzione di ricerca
    const searchFunction = useMemo(() => {
        return (item) => {
            if (!searchTerm) return true;

            const searchLower = searchTerm.toLowerCase();

            // Cerca in tutti i campi configurati
            return config.searchFields.some(field => {
                const value = typeof field === 'function'
                    ? field(item)
                    : item[field];
                return value?.toString().toLowerCase().includes(searchLower);
            });
        };
    }, [searchTerm, config.searchFields]);

    // Funzione di filtro
    const filterFunction = useMemo(() => {
        return (item) => {
            return Object.entries(filters).every(([key, value]) => {
                if (!value || value === 'all') return true;

                const itemValue = item[key];
                return itemValue === value;
            });
        };
    }, [filters]);

    // Funzione di ordinamento
    const sortFunction = useMemo(() => {
        return (a, b) => {
            let aValue = a[sortBy];
            let bValue = b[sortBy];

            // Gestione date
            if (sortBy === 'createdAt') {
                aValue = new Date(aValue || 0);
                bValue = new Date(bValue || 0);
            }

            // Gestione stringhe
            if (typeof aValue === 'string') {
                aValue = aValue.toLowerCase();
            }
            if (typeof bValue === 'string') {
                bValue = bValue.toLowerCase();
            }

            let comparison = 0;

            if (aValue < bValue) comparison = -1;
            if (aValue > bValue) comparison = 1;

            return sortOrder === 'desc' ? -comparison : comparison;
        };
    }, [sortBy, sortOrder]);

    // Dati filtrati, cercati e ordinati
    const processedData = useMemo(() => {
        return data
            .filter(searchFunction)
            .filter(filterFunction)
            .sort(sortFunction);
    }, [data, searchFunction, filterFunction, sortFunction]);

    // Funzioni helper
    const updateFilter = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const clearFilters = () => {
        setSearchTerm('');
        setFilters({});
        setSortBy(config.defaultSort || 'name');
        setSortOrder('asc');
    };

    const updateSort = (field, order) => {
        setSortBy(field);
        setSortOrder(order);
    };

    return {
        // Dati
        processedData,
        originalCount: data.length,
        filteredCount: processedData.length,

        // Stato
        searchTerm,
        sortBy,
        sortOrder,
        filters,

        // Azioni
        setSearchTerm,
        updateFilter,
        clearFilters,
        updateSort,

        // Helper
        hasActiveFilters: searchTerm || Object.values(filters).some(v => v && v !== 'all'),
        isEmpty: processedData.length === 0
    };
};

