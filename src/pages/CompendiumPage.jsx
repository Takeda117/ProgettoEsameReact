// src/pages/CompendiumPage.jsx - SOSTITUISCI TUTTO
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchRaces,
    fetchClasses,
    fetchFeats,
    fetchWeapons,
    fetchArmors
} from '@store/characterSlice';
import { useListFilters } from '@hooks/useListFilters';
import ListControls from '@components/ListControls';
import CompendiumNavigation from '@compendium/CompendiumNavigation';
import CompendiumDetails from '@compendium/CompendiumDetails';
import { Container, Card, Modal } from '@ui';

const CompendiumPage = () => {
    const dispatch = useDispatch();
    const { races, classes, feats, weapons, armors, loading } = useSelector((state) => state.character);

    const [activeSection, setActiveSection] = useState('races');
    const [selectedItem, setSelectedItem] = useState(null);

    const sections = useMemo(() => [
        { id: 'races', label: 'Razze', data: races, fetchAction: fetchRaces, icon: '🧝' },
        { id: 'classes', label: 'Classi', data: classes, fetchAction: fetchClasses, icon: '⚔️' },
        { id: 'feats', label: 'Talenti', data: feats, fetchAction: fetchFeats, icon: '✨' },
        { id: 'weapons', label: 'Armi', data: weapons, fetchAction: fetchWeapons, icon: '🗡️' },
        { id: 'armors', label: 'Armature', data: armors, fetchAction: fetchArmors, icon: '🛡️' }
    ], [races, classes, feats, weapons, armors]);

    // Configurazione filtri per sezione attiva
    const filterConfig = useMemo(() => {
        return {
            searchFields: ['name'],
            defaultSort: 'name',
            filterOptions: []
        };
    }, []);

    // Dati della sezione attiva
    const currentData = useMemo(() => {
        const currentSection = sections.find(s => s.id === activeSection);
        return currentSection ? currentSection.data.map(name => ({ name, section: activeSection })) : [];
    }, [activeSection, sections]);

    // Hook per filtri con persistenza URL
    const {
        processedData: filteredItems,
        originalCount,
        filteredCount,
        searchTerm,
        sortBy,
        sortOrder,
        filters,
        hasActiveFilters,
        onSearchChange,
        onFilterChange,
        onSortChange,
        onClearFilters
    } = useListFilters(currentData, filterConfig);

    useEffect(() => {
        const currentSection = sections.find(s => s.id === activeSection);
        if (currentSection && currentSection.data.length === 0) {
            dispatch(currentSection.fetchAction());
        }
    }, [activeSection, sections, dispatch]);

    useEffect(() => {
        setSelectedItem(null);
    }, [activeSection]);

    const handleSectionChange = useCallback((sectionId) => {
        setActiveSection(sectionId);
        // Reset filtri quando cambia sezione
        onClearFilters();
    }, [onClearFilters]);

    const handleItemSelect = useCallback((itemName) => {
        setSelectedItem(itemName);
    }, []);

    const handleCloseDetails = useCallback(() => {
        setSelectedItem(null);
    }, []);

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

    const currentSection = sections.find(s => s.id === activeSection);
    const sectionTitle = currentSection ? `${currentSection.icon} ${currentSection.label} D&D` : 'Compendium';

    const renderContent = () => {
        if (loading) {
            return (
                <div className="dashboard-section">
                    <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
                        <p className="text-body">🔄 Caricamento del compendio...</p>
                    </div>
                </div>
            );
        }

        return (
            <>
                {/* Controlli di filtro */}
                <ListControls
                    searchTerm={searchTerm}
                    onSearchChange={onSearchChange}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    onSortChange={onSortChange}
                    filters={filters}
                    onFilterChange={onFilterChange}
                    onClearFilters={onClearFilters}
                    hasActiveFilters={hasActiveFilters}
                    originalCount={originalCount}
                    filteredCount={filteredCount}
                    filterOptions={filterConfig.filterOptions}
                    placeholder={`Cerca in ${currentSection?.label.toLowerCase()}...`}
                    title={`Ricerca ${currentSection?.label}`}
                    quickSortFields={['name']}
                    showQuickSorts={false}
                />

                {/* Lista elementi */}
                <div className="dashboard-section">
                    <div className="dashboard-section-title" style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 'var(--space-6)'
                    }}>
                        <h2>{sectionTitle}</h2>
                    </div>

                    {filteredItems.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
                            <p className="text-body">
                                {originalCount === 0
                                    ? '📭 Nessun elemento disponibile'
                                    : `🔍 Nessun risultato trovato per "${searchTerm}"`
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
                                    onClick={() => handleItemSelect(item.name)}
                                    className="ornate-border"
                                >
                                    <Card.Body style={{ textAlign: 'center' }}>
                                        <div style={{
                                            fontSize: 'var(--font-size-2xl)',
                                            marginBottom: 'var(--space-2)'
                                        }}>
                                            {getSectionEmoji(activeSection)}
                                        </div>
                                        <Card.Title as="h4" style={{
                                            margin: 0,
                                            fontSize: 'var(--font-size-lg)'
                                        }}>
                                            {item.name}
                                        </Card.Title>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </>
        );
    };

    return (
        <div className="page-container">
            {/* Header del Compendium */}
            <div className="page-header">
                <h1 className="page-title">📚 Compendium D&D</h1>
                <p className="page-subtitle">La tua biblioteca di conoscenze fantasy</p>
            </div>

            {/* Navigation */}
            <div className="dashboard-section">
                <CompendiumNavigation
                    sections={sections}
                    activeSection={activeSection}
                    onSectionChange={handleSectionChange}
                />
            </div>

            {/* Content Layout */}
            <Container maxWidth="full">
                <div className="grid grid-1" style={{ gap: 'var(--space-6)' }}>
                    {/* Main Content */}
                    <div>
                        {renderContent()}
                    </div>
                </div>
            </Container>

            {/* Details Modal */}
            <Modal
                isOpen={!!selectedItem}
                onClose={handleCloseDetails}
                size="lg"
            >
                <Modal.Header>
                    <Modal.Title>
                        {getSectionEmoji(activeSection)} {selectedItem}
                    </Modal.Title>
                    <Modal.CloseButton onClick={handleCloseDetails} />
                </Modal.Header>

                <Modal.Body>
                    {selectedItem && (
                        <CompendiumDetails
                            item={selectedItem}
                            section={activeSection}
                            onClose={handleCloseDetails}
                        />
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default CompendiumPage;