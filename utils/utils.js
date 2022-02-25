export function getDiceRollArray(diceCount) {
    return new Array(diceCount)
        .fill(0)
        .map(() => Math.floor(Math.random() * 6) + 1);
}

export function getDicePlaceholderHtml(diceCount) {
    return new Array(diceCount)
        .fill()
        .map(() => `<div class="placeholder-dice"></div>`)
        .join("");
}

export const getPercentage = (remainingHealth, maximumHealth) => {
    return (100 * remainingHealth) / maximumHealth;
};
