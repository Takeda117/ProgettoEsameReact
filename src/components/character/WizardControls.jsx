import { Button } from "@ui";

const WizardControls = ({ step, totalSteps, character, setStep, onSave }) => {
    const currentField = Object.keys(character)[step];

    return (
        <div className="wizard-controls">
            {step > 0 && (
                <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => setStep((s) => s - 1)}
                >
                    ← Indietro
                </Button>
            )}

            <div style={{ flex: 1 }}></div>

            {step < totalSteps - 1 && (
                <Button
                    variant="primary"
                    size="lg"
                    onClick={() => setStep((s) => s + 1)}
                    disabled={!character[currentField]}
                    className="glow-effect"
                >
                    Avanti →
                </Button>
            )}

            {step === totalSteps - 1 && (
                <Button
                    variant="primary"
                    size="lg"
                    onClick={onSave}
                    disabled={!character.name}
                    className="glow-effect"
                >
                    ✨ Salva Personaggio
                </Button>
            )}
        </div>
    );
};

export default WizardControls;