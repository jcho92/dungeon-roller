import React, { Component, JSX, use, useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { diceRoll } from "./modules/roller";
import DiceDamageComponent, { DiceDamageRef } from "./modules/DiceDamage";
import ModDamageComponent from "./modules/modDamage";

function App() {
    const [damageComponents, setDamageComponents] = useState<
        { id: number; name: string; dice: number; numOfDice: number; toggle:boolean; canCrit: boolean }[]
    >([]);

    const [modDamageComponents, setModDamageComponents] = useState<
        {
            id: number;
            name: string;
            dmgModifier: number;
            attackModifier: number;
            toggle: boolean;
            canCrit: boolean;
        }[]
    >([]);

    const [name, setName] = useState<string>("");
    const [number, setNumber] = useState<number>(0);
    const [numberOfDice, setNumberOfDice] = useState<number>(1);

    const [modName, setModName] = useState<string>("");
    const [dmgModifier, setDmgModifier] = useState<number>(0);
    const [attackModifier, setAttackModifier] = useState<number>(0);
    const [totaldamage, setTotalDamage] = useState<number>(0);
    const [attackRollTotal, setAttackRollTotal] = useState<number|string>(0);
    const [canCritcalHitDice, setCanCriticalHitDice] = useState<boolean>(true);
    const [canCriticalHitMod, setCanCriticalHitMod] = useState<boolean>(true);

    const diceDamageRefs = useRef<(DiceDamageRef | null)[]>([]);
    const addDamageComponent = () => {
        const newComponent = {
            id: Date.now(),
            name: `${name}`,
            dice: number,
            numOfDice: numberOfDice,
            canCrit: canCritcalHitDice,
            toggle: true,
        };
        setDamageComponents([...damageComponents, newComponent]);
    };

    const addModComponent = () => {
        const newComponent = {
            id: Date.now(), // Unique ID
            name: `${modName}`,
            dmgModifier: dmgModifier,
            attackModifier: attackModifier,
            toggle: true,
            canCrit: canCriticalHitMod,
        };
        setModDamageComponents([...modDamageComponents, newComponent]);
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

    const calculateAttackRoll = () => {
        let totalAttackModifier = modDamageComponents.reduce(
            (total, component) => total + component.attackModifier,
            0,
        );

        const attackRoll = diceRoll(20);
        totalAttackModifier += attackRoll;
        attackRoll === 20 ? setAttackRollTotal("Critical Hit!") : setAttackRollTotal(totalAttackModifier);
        return totalAttackModifier;
    };

    const calculateDamageRoll = () => {
        let totalDmgModifier = modDamageComponents.reduce(
            (total, component) =>
                component.toggle ? total + component.dmgModifier : total,
            0,
        );

        let totalDamageFromDice = 0;
        diceDamageRefs.current.forEach((diceDamageRef) => {
            totalDamageFromDice += diceDamageRef?.rollDamage(false) || 0;
        });

        totalDmgModifier += totalDamageFromDice;
        setTotalDamage(totalDmgModifier);

        return totalDmgModifier;
    };


    const calculateCritDamageRoll = () => {
        let totalDmgModifier = modDamageComponents.reduce(
            (total, component) =>
                component.toggle ? total + component.dmgModifier : total,
            0,
        );

        totalDmgModifier = modDamageComponents.reduce(
            (total, component) =>
                component.toggle && component.canCrit ? total + component.dmgModifier : total,
            totalDmgModifier,
        );

        let totalDamageFromDice = 0;
        diceDamageRefs.current.forEach((diceDamageRef) => {
            totalDamageFromDice += diceDamageRef?.rollDamage(true) || 0;
        });



        totalDmgModifier += totalDamageFromDice;
        setTotalDamage(totalDmgModifier);
        console.log(totalDmgModifier)
        return totalDmgModifier;
    };

    const handleToggle = (id: number) => {
        console.log(id);
        setModDamageComponents((prevComponents) =>
            prevComponents.map((component) => {
                if (component.id === id) {
                    const value = { ...component, toggle: !component.toggle };
                    return value;
                }
                return component;
            }),
        );
    };


    const handleDiceToggle = (id: number) => {
        console.log(id);
        setDamageComponents((prevComponents) =>
            prevComponents.map((component) => {
                if (component.id === id) {
                    const value = { ...component, toggle: !component.toggle };
                    return value;
                }
                return component;
            }),
        );
    };

    useEffect(() => {}, [totaldamage, attackRollTotal]);

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
                    <p>can crit</p>
                    <input
                        type="checkbox"
                        checked={canCritcalHitDice} // Use `checked` for boolean values
                        onChange={(e) => setCanCriticalHitDice(e.target.checked)} // Update state with `e.target.checked`
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
                    <p>can crit</p>
                    <input
                        type="checkbox"
                        checked={canCriticalHitMod} // Use `checked` for boolean values
                        onChange={(e) => setCanCriticalHitMod(e.target.checked)} // Update state with `e.target.checked`
                    />
                    <button onClick={addModComponent}>
                        Add Static Damage Component
                    </button>
                </div>
                <div>
                    {damageComponents.map((component, index) => (
                        <DiceDamageComponent
                            key={component.id}
                            ref={(el) => {
                                diceDamageRefs.current[index] = el;
                            }}
                            id={component.id}
                            name={component.name}
                            dice={component.dice}
                            numOfDice={component.numOfDice}
                            removeComponent={removeDamageComponent}
                            canCrit={component.canCrit}
                            toggle={component.toggle}
                            onToggle={handleDiceToggle}
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
                            toggle={component.toggle}
                            onToggle={handleToggle}
                            canCrit={component.canCrit}
                        />
                    ))}
                </div>
            </div>
            
            <div>
                <button onClick={calculateAttackRoll}>
                    calculateAttackRoll
                </button>
                <h2>Total Attack Roll: {attackRollTotal}</h2>

                <button onClick={calculateDamageRoll}>
                    calculateDamageRoll
                </button>
                <button onClick={calculateCritDamageRoll}>
                    calculateCritDamageRoll
                </button>
                <h2>Total Damage: {totaldamage}</h2>
              
            </div>
        </div>
    );
}

export default App;
