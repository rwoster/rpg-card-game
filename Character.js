import {
    getDiceRollArray,
    getDicePlaceholderHtml,
    getPercentage,
} from "./utils/utils.js";

function Character(data) {
    // clone character object from data.js
    Object.assign(this, data);

    this.maxHealth = this.health;

    this.diceHtml = getDicePlaceholderHtml(this.diceCount);

    // gameplay render
    this.getCharacterHtml = () => {
        const { name, avatar, health, diceHtml } = this;
        const healthBar = this.getHealthBarHtml();
        return `
        <div class="character-card">
            <h4 class="name">${name}</h4>
            <img class="avatar" src=${avatar} />
            <p class="health">health: <b>${health}</b></p>
            ${healthBar}
            <div class="dice-container">
                ${diceHtml}
            </div>
        </div>
        `;
    };

    // render dice scores
    this.setDiceHtml = () => {
        this.currentDiceScore = getDiceRollArray(this.diceCount);
        this.diceHtml = this.currentDiceScore
            .map((num) => `<div class='dice'>${num}</div>`)
            .join("");
    };

    this.takeDamage = (attackScoreArray) => {
        let totalAttackScore = attackScoreArray.reduce(
            (sum, nextDice) => sum + nextDice
        );

        // reduce this player's health by the attackScore of the opponent
        this.health -= totalAttackScore;
        if (this.health <= 0) {
            this.health = 0;
            this.dead = true;
        }
    };

    this.getHealthBarHtml = () => {
        const percent = getPercentage(this.health, this.maxHealth);
        const checkDanger = percent <= 25 ? "danger" : null;
        return `<div class="health-bar-outer">
                    <div class="health-bar-inner ${checkDanger} " 
                        style="width: ${percent}%;">
                    </div>
                </div>`;
    };
}

export default Character;
