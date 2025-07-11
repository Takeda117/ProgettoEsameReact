import { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchRaces,
    fetchClasses,
    fetchFeats,
    fetchWeapons,
    fetchArmors
} from '@store/characterSlice';
import CompendiumNavigation from '@compendium/CompendiumNavigation';
import CompendiumList from '@compendium/CompendiumList';
import CompendiumDetails from '@compendium/CompendiumDetails';
import { Container } from '@ui';

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
    }, []);

    const handleItemSelect = useCallback((item) => {
        setSelectedItem(item);
    }, []);

    const handleCloseDetails = useCallback(() => {
        setSelectedItem(null);
    }, []);

    const renderActiveSection = useCallback(() => {
        if (loading) {
            return (
                <div className="dashboard-section">
                    <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
                        <p className="text-body">🔄 Caricamento del compendio...</p>
                    </div>
                </div>
            );
        }

        const currentSection = sections.find(s => s.id === activeSection);
        if (!currentSection) {
            return (
                <div className="dashboard-section">
                    <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
                        <p className="text-body">⚠️ Sezione non trovata</p>
                    </div>
                </div>
            );
        }

        return (
            <CompendiumList
                items={currentSection.data}
                title={`${currentSection.icon} ${currentSection.label} D&D`}
                onItemSelect={handleItemSelect}
                section={activeSection}
            />
        );
    }, [loading, sections, activeSection, handleItemSelect]);

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
                <div className={`grid ${selectedItem ? 'grid-2' : 'grid-1'}`} style={{ gap: 'var(--space-6)' }}>
                    {/* Main Content */}
                    <div>
                        {renderActiveSection()}
                    </div>

                    {/* Details Sidebar */}
                    {selectedItem && (
                        <div>
                            <CompendiumDetails
                                item={selectedItem}
                                section={activeSection}
                                onClose={handleCloseDetails}
                            />
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default CompendiumPage;