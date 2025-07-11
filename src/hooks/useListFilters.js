// src/hooks/useListFilters.js - SOSTITUISCI TUTTO
import { useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useListFilters = (data, config) => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Funzione per leggere i filtri dall'URL
    const readFiltersFromURL = useCallback(() => {
        const urlFilters = {};

        // Leggi tutti i possibili filtri dai searchParams
        for (const [key, value] of searchParams.entries()) {
            if (key !== 'search' && key !== 'sortBy' && key !== 'sortOrder') {
                urlFilters[key] = value;
            }
        }

        return urlFilters;
    }, [searchParams]);

    // Stato locale sincronizzato con URL
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
    const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || config.defaultSort || 'name');
    const [sortOrder, setSortOrder] = useState(searchParams.get('sortOrder') || 'asc');
    const [filters, setFilters] = useState(readFiltersFromURL);

    // Sincronizza stato con URL quando cambiano i searchParams
    useEffect(() => {
        setSearchTerm(searchParams.get('search') || '');
        setSortBy(searchParams.get('sortBy') || config.defaultSort || 'name');
        setSortOrder(searchParams.get('sortOrder') || 'asc');
        setFilters(readFiltersFromURL());
    }, [searchParams, config.defaultSort, readFiltersFromURL]);

    // Aggiorna URL quando cambiano i filtri (con debounce per evitare troppi aggiornamenti)
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const params = new URLSearchParams();

            // Aggiungi sempre tutti i parametri attivi
            if (searchTerm.trim()) {
                params.set('search', searchTerm.trim());
            }

            if (sortBy && sortBy !== (config.defaultSort || 'name')) {
                params.set('sortBy', sortBy);
            }

            if (sortOrder && sortOrder !== 'asc') {
                params.set('sortOrder', sortOrder);
            }

            // Aggiungi tutti i filtri attivi
            Object.entries(filters).forEach(([key, value]) => {
                if (value && value !== 'all' && value !== '') {
                    params.set(key, value);
                }
            });

            // Aggiorna URL solo se i parametri sono effettivamente cambiati
            const newParamsString = params.toString();
            const currentParamsString = searchParams.toString();

            if (newParamsString !== currentParamsString) {
                setSearchParams(params, { replace: true });
            }
        }, 100); // Debounce di 100ms

        return () => clearTimeout(timeoutId);
    }, [searchTerm, sortBy, sortOrder, filters, config.defaultSort, searchParams, setSearchParams]);

    // Funzione di ricerca migliorata
    const searchFunction = useMemo(() => {
        return (item) => {
            if (!searchTerm.trim()) return true;

            const searchLower = searchTerm.toLowerCase().trim();

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
                if (!value || value === 'all' || value === '') return true;

                const itemValue = item[key];
                return itemValue === value;
            });
        };
    }, [filters]);

    // Funzione di ordinamento migliorata
    const sortFunction = useMemo(() => {
        return (a, b) => {
            let aValue = a[sortBy];
            let bValue = b[sortBy];

            // Gestione valori undefined/null
            if (aValue == null && bValue == null) return 0;
            if (aValue == null) return sortOrder === 'asc' ? 1 : -1;
            if (bValue == null) return sortOrder === 'asc' ? -1 : 1;

            // Gestione date
            if (sortBy === 'createdAt') {
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            }
            // Gestione stringhe - ordinamento alfabetico
            else if (typeof aValue === 'string' && typeof bValue === 'string') {
                aValue = aValue.toLowerCase().trim();
                bValue = bValue.toLowerCase().trim();
            }
            // Gestione numeri
            else if (typeof aValue === 'number' && typeof bValue === 'number') {
                // I numeri rimangono come sono
            }
            // Conversione mista a stringhe
            else {
                aValue = String(aValue).toLowerCase().trim();
                bValue = String(bValue).toLowerCase().trim();
            }

            let comparison = 0;

            if (aValue < bValue) comparison = -1;
            if (aValue > bValue) comparison = 1;

            return sortOrder === 'desc' ? -comparison : comparison;
        };
    }, [sortBy, sortOrder]);

    // Dati processati con tutti i filtri applicati
    const processedData = useMemo(() => {
        return data
            .filter(searchFunction)
            .filter(filterFunction)
            .sort(sortFunction);
    }, [data, searchFunction, filterFunction, sortFunction]);

    // Funzioni helper
    const updateSearchTerm = useCallback((term) => {
        setSearchTerm(term || '');
    }, []);

    const updateFilter = useCallback((key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    }, []);

    const clearFilters = useCallback(() => {
        setSearchTerm('');
        setFilters({});
        setSortBy(config.defaultSort || 'name');
        setSortOrder('asc');
        // Cancella completamente i parametri URL
        setSearchParams({}, { replace: true });
    }, [config.defaultSort, setSearchParams]);

    const updateSort = useCallback((field, order) => {
        setSortBy(field);
        setSortOrder(order);
    }, []);

    // Helper per determinare se ci sono filtri attivi
    const hasActiveFilters = useMemo(() => {
        return searchTerm.trim() ||
            Object.values(filters).some(v => v && v !== 'all' && v !== '') ||
            sortBy !== (config.defaultSort || 'name') ||
            sortOrder !== 'asc';
    }, [searchTerm, filters, sortBy, sortOrder, config.defaultSort]);

    return {
        // Dati
        processedData,
        originalCount: data.length,
        filteredCount: processedData.length,

        // Stato corrente
        searchTerm,
        sortBy,
        sortOrder,
        filters,

        // Azioni
        updateSearchTerm,
        updateFilter,
        clearFilters,
        updateSort,

        // Helper
        hasActiveFilters,
        isEmpty: processedData.length === 0,

        // Funzioni per i componenti
        onSearchChange: updateSearchTerm,
        onFilterChange: updateFilter,
        onSortChange: updateSort,
        onClearFilters: clearFilters
    };
};