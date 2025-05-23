import { BasePhase } from "./phase";
import { Player, playerList } from "../entity";
import { showPlayerBox } from "../common";
import { MonologuePhase } from "./monologue";

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

    start(numberOfPlayers, roles) {
        this.numberOfPlayers = numberOfPlayers;
        this.roles = roles;
        // assert roles and number of players are set
        if (this.roles == undefined || this.numberOfPlayers == undefined ) {
            console.error("Roles or number of players is undefined");
        }

        // define the role pool
        this.rolePool = ['Murderer 1', 'Murderer 2', ...this.roles];

        // Add minimum 3 civilians
        for (let i = 0; i < 3; i++) this.rolePool.push('Civilian');

        // Fill remained with civilians
        while (this.rolePool.length < this.numberOfPlayers) {
            this.rolePool.push('Civilian');
        }

        // Shuffle roles
        for (let i = this.rolePool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.rolePool[i], this.rolePool[j]] = [this.rolePool[j], this.rolePool[i]]
        }
        // Get player names and assigne roles.
        this.showNextPlayerInput();
    }

    showNextPlayerInput() {
        if (this.playerIndex >= this.numberOfPlayers) {
            console.log("All roles assigned!");

            // clear all elements from the body
            const existingContainer = document.getElementById('playerNameEntry');
            if (existingContainer) {
                existingContainer.parentNode.removeChild(existingContainer);
            }

            this.playerBox = showPlayerBox(document.body, playerList.map(player => player.name));

            const nextPhaseButton = document.createElement('button');
            nextPhaseButton.textContent = 'Start Game';
            nextPhaseButton.addEventListener('click', () => {
                this.playerBox.parentNode.removeChild(this.playerBox);
                nextPhaseButton.parentNode.removeChild(nextPhaseButton);
                this.showNextPhase();
            });
            document.body.appendChild(nextPhaseButton);
            return;
        }

        
        const existingContainer = document.getElementById('playerNameEntry');
        if (existingContainer) {
            existingContainer.parentNode.removeChild(existingContainer);
        }

        this.playerBox = showPlayerBox(document.body, playerList.map(player => player.name));



        // create div for player input
        const container = document.createElement('div');
        container.id = 'playerNameEntry';
        container.innerHTML = `
        <h3>Player ${this.playerIndex + 1} Name:</h3>
        `;
        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'playerNameInput';
        input.placeholder = 'Player Name';
        container.appendChild(input);

        // Create players and assign roles
        const button = document.createElement('button');
        button.textContent = 'Assign Role';
        button.addEventListener('click', () => {
            const enteredName = input.value.trim();
            const isDuplicate = playerList.some(player => player.name.toLowerCase() === enteredName.toLowerCase());
        
            if (isDuplicate) {
                alert("This name has already been taken. Please choose a different name.");
                return;
            }
        
            const playerRole = this.assignRoleToCurrentPlayer(this.playerIndex);
            const player = new Player(enteredName, playerRole);
            playerList.push(player);
        
            // show the assigned role
            const roleLabel = document.createElement('h3');
            roleLabel.textContent = `${enteredName}, your role is: ${playerRole}`;
            container.appendChild(roleLabel);
        
            // create button for next player
            const nextButton = document.createElement('button');
            nextButton.textContent = 'OK';
            nextButton.addEventListener('click', () => {
                this.playerIndex++;
                this.showNextPlayerInput();
            });
            container.appendChild(nextButton);
        
            // Disable input and assign button after successful input
            input.disabled = true;
            button.disabled = true;
        });  
        container.appendChild(button);
        document.body.appendChild(container);
    }

    assignRoleToCurrentPlayer(index) {
        const assignedRole = this.rolePool[index];
        return assignedRole;
    }

    showNextPhase() {
        // TODO: Add next button to start the next phase [monologue phase]
        const monologue = new MonologuePhase(this.roles);
        monologue.start();
    }


}

const roleSelectionPhase = new RoleSelectionPhase();
export { roleSelectionPhase, RoleSelectionPhase };