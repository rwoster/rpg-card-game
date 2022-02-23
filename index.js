import characterData from "./data.js";
import Character from "./Character.js";

// create player instance
let wizard = new Character(characterData.wizard);
let orc = new Character(characterData.orc);

// render players
function renderPlayers() {
    document.getElementById("hero").innerHTML =
        wizard.getCharacterHtml();
    document.getElementById("monster").innerHTML =
        orc.getCharacterHtml();
}
renderPlayers();

//
// event listener
//
let attackBtn = document.getElementById("attack-button");
attackBtn.addEventListener("click", () => {
    renderPlayers();
});
