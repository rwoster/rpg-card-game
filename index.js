import characterData from "./data/data.js";
import Character from "./Character.js";
import { getDicePlaceholderHtml } from "./utils/utils.js";

const attackBtn = document.getElementById("attack-button");

let monstersArray = ["orc", "demon", "goblin"];

function getNewMonster() {
    const nextMonsterData = characterData[monstersArray.shift()];
    return nextMonsterData ? new Character(nextMonsterData) : {};
}

// create player instance
const wizard = new Character(characterData.hero);
let monster = getNewMonster();

// render players
function render() {
    document.getElementById("hero").innerHTML =
        wizard.getCharacterHtml();
    document.getElementById("monster").innerHTML =
        monster.getCharacterHtml();
}
render();

function attack() {
    wizard.setDiceHtml();
    monster.setDiceHtml();
    wizard.takeDamage(monster.currentDiceScore);
    monster.takeDamage(wizard.currentDiceScore);
    render();

    if (wizard.dead || (monster.dead && !monstersArray.length)) {
        attackBtn.style.display = "none";
        endGame();
    } else if (monster.dead && monstersArray.length) {
        attackBtn.style.display = "none";
        monster = getNewMonster();
        wizard.diceArray = getDicePlaceholderHtml(wizard.diceCount);
        setTimeout(() => {
            attackBtn.style.display = "block";
            render();
        }, 1000);
    }
}

function endGame() {
    let endMessage =
        wizard.dead && monster.dead
            ? "Everyone is dead. <br> There are no winners here."
            : monster.dead
            ? "The Wizard wins!"
            : "The monsters win!";
    let endEmoji = wizard.health > 0 ? "🔮" : "☠️";

    setTimeout(() => {
        document.body.innerHTML = `
                <div class="end-game">
                    <h2>Game Over</h2>
                    <h3>${endMessage}</h3>
                    <p class="end-emoji">${endEmoji}</p>
                </div>`;
    }, 1500);
}

//
// event listener
//
document
    .getElementById("attack-button")
    .addEventListener("click", () => {
        attack();
    });
