import React, { use, useEffect, useState } from "react";
import { diceRoll } from "./roller";
import { on } from "events";

interface DamageProps {
    id: number;
    name: string;
    dmgModifier: number;
    attackModifier: number;
    removeComponent?: (index: number) => void;
    toggle: boolean;
    onToggle: (id: number) => void;
    canCrit: boolean;
}

const ModDamageComponent: React.FC<DamageProps> = ({
    id,
    name,
    dmgModifier,
    attackModifier,
    removeComponent,
    toggle,
    onToggle,
    canCrit
}) => {
    const [isToggled, setIsToggled] = useState(toggle);
    const handleToggle = () => {
        onToggle(id);
        setIsToggled(!isToggled);
    };

    useEffect(() => {
    
    }, [isToggled]);

    return (
        <div>
            <h3>{name}</h3>

            {<div>Damage Modifier: {dmgModifier}</div>}
            {<div>Attack Modifier: {attackModifier}</div>}
            {canCrit && <div>Can Critical Hit</div>}
            <button onClick={handleToggle}>
                {isToggled ? "Disable" : "Enable"} Toggle
            </button>
            <button
                onClick={() => {
                    if (removeComponent) {
                        removeComponent(id);
                    }
                }}
            >
                Remove
            </button>
        </div>
    );
};

export default ModDamageComponent;
