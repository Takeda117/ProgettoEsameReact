import { Button } from "@ui";

const CharacterStep = ({ title, field, options, onSelect, selectedValue }) => {
    return (
        <div className="wizard-content">
            <h2 className="text-heading" style={{
                textAlign: 'center',
                marginBottom: 'var(--space-6)',
                color: 'var(--color-primary-600)'
            }}>
                {title}
            </h2>

            <div className="grid grid-auto" style={{ gap: 'var(--space-4)' }}>
                {options.map((opt) => (
                    <Button
                        key={opt}
                        variant={selectedValue === opt ? "primary" : "secondary"}
                        size="lg"
                        onClick={() => onSelect(field, opt)}
                        className={selectedValue === opt ? "glow-effect" : ""}
                        style={{
                            padding: 'var(--space-4)',
                            textAlign: 'center',
                            minHeight: '60px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {opt}
                    </Button>
                ))}
            </div>

            {selectedValue && (
                <div style={{
                    textAlign: 'center',
                    marginTop: 'var(--space-6)',
                    padding: 'var(--space-4)',
                    background: 'var(--color-success-light)',
                    borderRadius: 'var(--radius-lg)',
                    border: '2px solid var(--color-success)'
                }}>
                    <p className="text-body" style={{ color: 'var(--color-success)', margin: 0 }}>
                        ✅ Hai selezionato: <strong>{selectedValue}</strong>
                    </p>
                </div>
            )}
        </div>
    );
};

export default CharacterStep;