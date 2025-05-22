import { BasePhase } from "./phase";
import { Player, playerList } from "../entity";

class RoleSelectionPhase extends BasePhase {
    constructor() {
        super('role selection', 'description');
        this.playerIndex = 0;
    }

    setOptionalRoles(roles) {
        this.roles = roles;
    }

    setNumberOfPlayers(count) {
        this.numberOfPlayers = count;
    }

    start() {
        // assert roles and number of players are set
        if (this.roles == undefined || this.numberOfPlayers == undefined ) {
            console.error("Roles or number of players is undefined");
        } 
        console.log("Herro?");

        // define the role pool
        this.rolePool = ['Murderer 1', 'Murderer 2', ...this.roles];

        // Add minimum 3 civilians
        for (let i = 0; i < 3; i++) this.rolePool.push('Civilian');

        // Fill remained with civilians
        while (this.rolePool.length < this.numberOfPlayers) {
            this.rolePool.push('Civilian');
        }

        console.log("1")

        // Shuffle roles
        for (let i = this.rolePool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.rolePool[i], this.rolePool[j]] = [this.rolePool[j], this.rolePool[i]]
        }

        // create a button to assign the name and the role of the next player
        for (let i = 0; i <= this.numberOfPlayers;) {
            const container = document.createElement('div');
            container.id = 'nameAndRoleSelection';
            container.innerHTML = `
                <h3>Player ${i+1}, enter your name: <h3>
            `;
            const nameInput = document.createElement('input');
            nameInput.type='text';
            nameInput.placeholder = 'Player Name';
            container.appendChild(nameInput);

            const nextPlayerButton = document.createElement('button');
            nextPlayerButton.textContent = 'OK';
            nextPlayerButton.addEventListener('click', () => { i++ });

            const seeRoleButton = document.createElement('button');
            seeRoleButton.textContent = 'See Role';
            seeRoleButton.addEventListener('click', () => {
                playerName, playerRole = this.assignRoleToCurrentPlayer(nameInput.value, i);

                const player = new Player(playerName, playerRole);
                playerList.push(player);

                container.innerHTML = `
                    <h3>${playerName}, your role is:</h3>
                    <p><strong>${playerRole}</strong></p>
                `;
                container.appendChild(nextPlayerButton);
                i++;
            });
            container.appendChild(seeRoleButton);

        }
    }

    assignRoleToCurrentPlayer(name, index) {
        const assignedRole = this.rolePool[index];
        const playerName = name.trim() || `Player ${index + 1}`;

        return playerName, assignedRole;
    }

    showNextPlayerInput() {

    }

}

const roleSelectionPhase = new RoleSelectionPhase();
export { roleSelectionPhase, RoleSelectionPhase };