import React, { useEffect } from "react";
import { diceRoll } from "./roller";

interface DamageProps {
    id: number;
    name: string;
    dice: number;
    numOfDice: number;
    removeComponent: (index: number) => void;
}

const DiceDamageComponent: React.FC<DamageProps> = ({
    id,
    name,
    dice,
    numOfDice,
    removeComponent,
}) => {
    const [damageRoll, setDamageRoll] = React.useState<number>(0);
    useEffect(() => {}, [damageRoll]);

    const rollDamage = () => {
        let dmg = 0;
        for (let i = 0; i < numOfDice; i++) {
            dmg += diceRoll(dice);
        }
        setDamageRoll(dmg);
    }
    return (
        <div>
            {name}
            <button
                onClick={rollDamage}
            >
                Roll
            </button>
            {<div>Damage Rolled: {damageRoll}</div>}
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

export default DiceDamageComponent;
