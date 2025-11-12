import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState,
} from "react";
import { diceRoll } from "./roller";

export interface DiceDamageRef {
    rollDamage: (crit:boolean) => number;
}

interface DamageProps {
    id: number;
    name: string;
    dice: number;
    numOfDice: number;
    removeComponent: (id: number) => void;
    canCrit: boolean;
    toggle: boolean;
    onToggle: (id: number) => void;
}

const DiceDamageComponent = forwardRef<DiceDamageRef, DamageProps>(
    (
        {
            id,
            name,
            dice,
            numOfDice,
            removeComponent,
            canCrit,
            onToggle,
            toggle,
        },
        ref,
    ) => {
        const [diceRollDMG, setDiceRollDMG] = useState(0);
        const [isToggled, setIsToggled] = useState(toggle);
        const handleToggle = () => {
            onToggle(id);
            setIsToggled(!isToggled);
        };

        useEffect(() => {}, [diceRollDMG, isToggled]);

        const rollDamage = (crit: boolean) => {
            let totalDamage = 0;
            for (let i = 0; i < numOfDice; i++) {
                console.log(crit)
                totalDamage += diceRoll(dice);
                if(crit && canCrit){
                    totalDamage += diceRoll(dice);
                }
            }
            if(!toggle){
                totalDamage = 0;
            }
            setDiceRollDMG(totalDamage);
            return totalDamage;
        };

        useImperativeHandle(ref, () => ({
            rollDamage,
        }));

        return (
            <div>
                <h3>{name}</h3>
                <h2>diceDamage: {diceRollDMG}</h2>
                {canCrit && <div>Can Critical Hit</div>}
                <button onClick={() => rollDamage(false)}>Roll Damage</button>
                <button onClick={handleToggle}>
                    {isToggled ? "Disable" : "Enable"} Toggle
                </button>
                <button onClick={() => removeComponent(id)}>Remove</button>
            </div>
        );
    },
);

export default DiceDamageComponent;
