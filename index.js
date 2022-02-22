let attackBtn = document.getElementById("attack-button");

let hero = {
    elementId: "hero",
    name: "Wizard",
    avatar: "./images/wizard.png",
    health: 100,
    diceCount: 3,
};

let monster = {
    elementId: "monster",
    name: "Orc",
    avatar: "./images/orc.png",
    health: 100,
    diceCount: 3,
};

let turn = true;
attackBtn.addEventListener("click", () => {
    if (turn) {
        turn = false;
        renderCharacter(hero);
    } else {
        turn = true;
        renderCharacter(monster);
    }
});

function renderCharacter(data) {
    const { elementId, name, avatar, health, diceCount } = data;

    const diceHtml = getDiceHtml(diceCount);

    document.getElementById(elementId).innerHTML = `
        <div class="character-card">
            <h4 class="name">${name}</h4>
            <img class="avatar" src=${avatar} />
            <p class="health">health: <b>${health}</b></p>
            <div class="dice-container">
                ${diceHtml}
            </div>
        </div>
    `;
}

renderCharacter(hero);
renderCharacter(monster);

function getDiceRollArray(diceCount) {
    const newDiceRolls = new Array(diceCount).fill("0").map(() => {
        return Math.floor(Math.random() * 6) + 1;
    });
    return newDiceRolls;
}

function getDiceHtml(diceCount) {
    return getDiceRollArray(diceCount)
        .map((dice) => {
            return `<div class='dice'>${dice}</div>`;
        })
        .join("");
}
