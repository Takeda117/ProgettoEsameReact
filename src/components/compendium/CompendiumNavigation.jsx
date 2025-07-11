import { Button } from '@ui';

const CompendiumNavigation = ({ sections, activeSection, onSectionChange }) => {
    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-3)',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <h3 className="dashboard-section-title" style={{
                marginRight: 'var(--space-4)',
                marginBottom: 0
            }}>
                🗂️ Categorie:
            </h3>

            {sections.map((section) => (
                <Button
                    key={section.id}
                    variant={activeSection === section.id ? "primary" : "secondary"}
                    size="md"
                    onClick={() => onSectionChange(section.id)}
                    className={activeSection === section.id ? "glow-effect" : ""}
                >
                    {section.icon} {section.label}
                </Button>
            ))}
        </div>
    );
};

export default CompendiumNavigation;