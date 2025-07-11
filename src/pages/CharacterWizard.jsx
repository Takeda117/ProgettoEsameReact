import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    fetchArmors, fetchWeapons, fetchRaces,
    fetchClasses, fetchFeats
} from "../store/characterSlice";
import { CharacterManager } from "../utils/localStorage";
import { initialCharacterState } from "../constant/initialStates";
import CharacterStep from "../components/character/CharacterStep";
import StepNavigation from "../components/character/StepNavigation";
import WizardControls from "../components/character/WizardControls";
import CharacterSummary from "../components/character/CharacterSummary";

const steps = [
    { label: "Razza", field: "race", fetch: fetchRaces },
    { label: "Classe", field: "class", fetch: fetchClasses },
    { label: "Talento", field: "feat", fetch: fetchFeats },
    { label: "Armatura", field: "armor", fetch: fetchArmors },
    { label: "Arma", field: "weapon", fetch: fetchWeapons },
    { label: "Nome", field: "name", fetch: null }
];

const CharacterWizard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.auth?.currentUser);
    const { armors, weapons, races, classes, feats, loading } = useSelector((state) => state.character);

    const [step, setStep] = useState(0);
    const [character, setCharacter] = useState(initialCharacterState);

    useEffect(() => {
        const fetch = steps[step]?.fetch;
        if (fetch) dispatch(fetch());
    }, [step, dispatch]);

    const handleSelect = (field, value) => {
        setCharacter((prev) => ({ ...prev, [field]: value }));
    };

    const canGoTo = (target) => {
        return steps.slice(0, target).every(({ field }) => character[field]);
    };

    const saveCharacter = () => {
        if (!character.name) return alert("Inserisci un nome.");
        CharacterManager.saveCharacter({ ...character, email: currentUser.email });
        alert("Personaggio salvato!");
        navigate("/my-characters");
    };

    const getOptions = {
        race: races, class: classes, feat: feats, armor: armors, weapon: weapons
    };

    const current = steps[step];

    return (
        <div>
            <h1>Creazione Personaggio</h1>

            <StepNavigation
                steps={steps}
                current={step}
                canGoTo={canGoTo}
                setStep={setStep}
            />

            {loading ? (
                <p>Caricamento...</p>
            ) : current.field === "name" ? (
                <div>
                    <h2>{step + 1}. {current.label}</h2>
                    <input
                        type="text"
                        value={character.name}
                        onChange={(e) =>
                            setCharacter((prev) => ({ ...prev, name: e.target.value }))
                        }
                    />
                    <CharacterSummary character={character} />
                </div>
            ) : (
                <CharacterStep
                    title={`${step + 1}. ${current.label}`}
                    field={current.field}
                    options={getOptions[current.field]}
                    selected={character[current.field]}
                    onSelect={(field, value) => {
                        handleSelect(field, value);
                        setTimeout(() => {
                            if (step < steps.length - 1) setStep((prev) => prev + 1);
                        }, 100);
                    }}

                />

            )}

            <WizardControls
                step={step}
                totalSteps={steps.length}
                character={character}
                setStep={setStep}
                onSave={saveCharacter}
            />
        </div>
    );
};

export default CharacterWizard;
