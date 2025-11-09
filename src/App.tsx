import React, { JSX, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { diceRoll } from "./modules/roller";
import DiceDamageComponent from "./modules/DiceDamage";
import ModDamageComponent from "./modules/modDamage";

function App() {
    const [damageComponents, setDamageComponents] = useState<
        { id: number; name: string; dice: number; numOfDice: number }[]
    >([]);

    const [modDamageComponents, setModDamageComponents] = useState<
        {
            id: number;
            name: string;
            dmgModifier: number;
            attackModifier: number;
        }[]
    >([]);

    const [name, setName] = useState<string>("");
    const [number, setNumber] = useState<number>(0);
    const [numberOfDice, setNumberOfDice] = useState<number>(1);

    const [modName, setModName] = useState<string>("");
    const [dmgModifier, setDmgModifier] = useState<number>(0);
    const [attackModifier, setAttackModifier] = useState<number>(0);

    const addDamageComponent = () => {
        const newComponent = {
            id: Date.now(),
            name: `${name}`,
            dice: number,
            numOfDice: numberOfDice,
        };
        setDamageComponents([...damageComponents, newComponent]);
    };

    const removeDamageComponent = (id: number) => {
        setDamageComponents(
            damageComponents.filter((component) => component.id !== id),
        );
    };

    const removeModDamageComponent = (id: number) => {
        setModDamageComponents(
            modDamageComponents.filter((component) => component.id !== id),
        );
    };
    const addModComponent = () => {
        const newComponent = {
            id: Date.now(), // Unique ID
            name: `${modName}`,
            dmgModifier: dmgModifier,
            attackModifier: attackModifier,
        };
        setModDamageComponents([...modDamageComponents, newComponent]);
    };

    const calculateAttackRoll = () => {
        let totalAttackModifier = modDamageComponents.reduce(
            (total, component) => total + component.attackModifier,
            0
        );

        const attackRoll = diceRoll(20)
        totalAttackModifier += attackRoll;
        console.log("Total Attack Modifiers:", totalAttackModifier);

        return totalAttackModifier;

    };

    const calculateDamageRoll = () => {
        let  totalDmgModifier = modDamageComponents.reduce(
            (total, component) => total + component.dmgModifier,
            0,
        );
        console.log("Total Damage Modifier:", totalDmgModifier);

        return totalDmgModifier;
    }

    return (
        <div className="App">
            <div>
                <div>
                    <h2>add a dice modifier</h2>
                    <input
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <p> set dice face</p>
                    <input
                        type="number"
                        placeholder="Enter number"
                        value={number}
                        onChange={(e) => setNumber(Number(e.target.value))}
                    />
                    <p> set number of dice</p>
                    <input
                        type="number"
                        placeholder="Enter number of dice"
                        value={numberOfDice}
                        onChange={(e) =>
                            setNumberOfDice(Number(e.target.value))
                        }
                    />
                    <button onClick={addDamageComponent}>
                        Add Damage Component
                    </button>
                </div>

                <div>
                    <h2> add a static damage modifier</h2>
                    <input
                        type="text"
                        placeholder="Enter name"
                        value={modName}
                        onChange={(e) => setModName(e.target.value)}
                    />
                    <p>set damage modifier</p>
                    <input
                        type="number"
                        placeholder="Enter number"
                        value={dmgModifier}
                        onChange={(e) => setDmgModifier(Number(e.target.value))}
                    />
                    <p>set attack Modifier</p>
                    <input
                        type="number"
                        placeholder="Enter number"
                        value={attackModifier}
                        onChange={(e) =>
                            setAttackModifier(Number(e.target.value))
                        }
                    />
                    <button onClick={addModComponent}>
                        Add Static Damage Component
                    </button>
                </div>
                <div>
                    {damageComponents.map((component) => (
                        <DiceDamageComponent
                            key={component.id}
                            id={component.id}
                            name={component.name}
                            dice={component.dice}
                            numOfDice={component.numOfDice}
                            removeComponent={removeDamageComponent}
                        />
                    ))}
                    {modDamageComponents.map((component) => (
                        <ModDamageComponent
                            key={component.id}
                            id={component.id}
                            name={component.name}
                            dmgModifier={component.dmgModifier}
                            attackModifier={component.attackModifier}
                            removeComponent={removeModDamageComponent}
                        />
                    ))}
                </div>
            </div>

            <div>
                <button onClick={calculateAttackRoll}>calculateAttackRoll</button>
                <button onClick = {calculateDamageRoll}>calculateDamageRoll</button>
            </div>
        </div>
    );
}

export default App;
