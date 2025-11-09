import React, { useEffect } from "react";
import { diceRoll } from "./roller";

interface DamageProps {
    id: number;
    name: string;
    dmgModifier: number;
    attackModifier: number;
    removeComponent?: (index: number) => void;
}

const ModDamageComponent: React.FC<DamageProps> = ({
    id,
    name,
    dmgModifier,
    attackModifier,
    removeComponent,
}) => {

    return (
        <div>
            <h3>{name}</h3>

            {<div>Damage Modifier: {dmgModifier}</div>}
            {<div>Attack Modifier: {attackModifier}</div>}
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
