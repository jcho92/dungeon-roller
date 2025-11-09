const diceRoll = (upperLimit: number): number => {
    return Math.floor(Math.random() * upperLimit) + 1;
};

export { diceRoll };
