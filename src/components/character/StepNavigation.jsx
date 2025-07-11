const StepNavigation = ({ steps, canGoTo, setStep, currentStep }) => {
    return (
        <div className="wizard-steps">
            {steps.map((s, i) => (
                <div
                    key={s.field}
                    className={`wizard-step ${i === currentStep ? 'active' :
                        canGoTo(i) ? 'completed' : 'disabled'
                        }`}
                    onClick={canGoTo(i) ? () => setStep(i) : undefined}
                >
                    {i + 1}. {s.label}
                </div>
            ))}
        </div>
    );
};

export default StepNavigation;