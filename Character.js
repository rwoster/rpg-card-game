import { getDiceRollArray } from "./utils/utils.js";

function Character(data) {
    Object.assign(this, data);

    this.getDiceHtml = function (diceCount) {
        return getDiceRollArray(diceCount)
            .map((dice) => {
                return `<div class='dice'>${dice}</div>`;
            })
            .join("");
    };

    this.getCharacterHtml = function () {
        const { name, avatar, health, diceCount } = this;
        let diceHtml = this.getDiceHtml(diceCount);
        return `
            <div class="character-card">
                <h4 class="name">${name}</h4>
                <img class="avatar" src=${avatar} />
                <p class="health">health: <b>${health}</b></p>
                <div class="dice-container">
                    ${diceHtml}
                </div>
            </div>
        `;
    };
}

export default Character;
