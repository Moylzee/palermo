import { BasePhase } from "./phase";
import { RoleSelectionPhase } from "./roleselection";
import { optionalRoles, getAvailableRoles } from "../roles";
import gameSettings from "../gamesettings";
import { createPlayerIconsContainer, showPlayerIcons } from "../common";


class SettingsPhase extends BasePhase {
    constructor() {
        super('Settings', 'Enter number of players and select optional roles.');
    }

    showPlayerCounter() {
        // make a container for the player counter and attach it to the body

        // Create DOM properties
        const container = document.createElement('div');
        container.id = 'playerCounter';
        container.innerHTML = `
            <h3>Number of Players:</h3>
        `;
        const playerCountInput = document.createElement('input');
        playerCountInput.type = 'number';
        playerCountInput.id = 'playerCountInput';
        playerCountInput.min = 4;
        playerCountInput.max = 20;
        playerCountInput.value = 4;
        container.appendChild(playerCountInput);

        const setPlayerCountButton = document.createElement('button');
        setPlayerCountButton.textContent = 'Set Player Count';
        
        // Set number of players and start role selection phase
        setPlayerCountButton.addEventListener('click', () => {
            // clear roleList if it exists
            this.clearPrevious();

            const playerCount = document.getElementById('playerCountInput').value;
            this.numberOfPlayers = parseInt(playerCount, 10);
            gameSettings.numberOfPlayers = this.numberOfPlayers;

            // show icons
            // create player icons div

            const playerIconsContainer = createPlayerIconsContainer('playerIcons');
            container.appendChild(playerIconsContainer);

            const availableRoles = getAvailableRoles(this.numberOfPlayers);
            const roleList = document.createElement('div');
            roleList.id = 'roleList';
            roleList.innerHTML = `
                <h3>Select Optional Roles:</h3>
            `;
            availableRoles.forEach(role => {
                const label = document.createElement('label');
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = role;
                checkbox.name = 'roleOption';
                checkbox.addEventListener('change', () => {
                    // redraw player icons based on selected roles
                    const selectedRoles = Array.from(roleList.querySelectorAll('input[name="roleOption"]:checked')).map(cb => cb.value);
                    let roles = ['Murderer 1', 'Murderer 2', ...selectedRoles];
                    while(roles.length < playerCount) {
                        roles.push('Civilian');
                    }
                    gameSettings.selectedRoles = roles;
                    showPlayerIcons(playerIconsContainer, this.numberOfPlayers, roles);
                });

                label.appendChild(checkbox);
                label.appendChild(document.createTextNode(role));
                roleList.appendChild(label);
                roleList.appendChild(document.createElement('br'));
            });
            container.appendChild(roleList);

            let roles = ['Murderer 1', 'Murderer 2'];
            while(roles.length < playerCount) {
                roles.push('Civilian');
            }
            gameSettings.selectedRoles = roles;
            showPlayerIcons(playerIconsContainer, this.numberOfPlayers, roles);

            const startAssignmentButton = document.createElement('button');
            startAssignmentButton.textContent = 'Confirm Player Count and Roles';
            startAssignmentButton.id = 'startAssignmentButton';
            startAssignmentButton.addEventListener('click', () => {
                const selectedOptionalRoles = Array.from(roleList.querySelectorAll('input[name="roleOption"]:checked')).map(cb => cb.value);
                const roleSelectionPhase = new RoleSelectionPhase();
                // clear container
                container.innerHTML = '';
                roleSelectionPhase.start(this.numberOfPlayers, selectedOptionalRoles);
            })
            container.appendChild(startAssignmentButton);
        });
        container.appendChild(setPlayerCountButton);

        document.body.appendChild(container);
        this.phaseUIElements.push(container);
    }

    clearPrevious() {
        const existingRoleList = document.getElementById('roleList');
        const existingAssignmentButton = document.getElementById('startAssignmentButton');
        const existingPlayerIcons = document.getElementById('playerIcons');
        if (existingRoleList) {
            existingRoleList.parentNode.removeChild(existingRoleList);
        }
        if (existingAssignmentButton) {
            existingAssignmentButton.parentNode.removeChild(existingAssignmentButton);
        }
        if (existingPlayerIcons) {
            existingPlayerIcons.parentNode.removeChild(existingPlayerIcons);
        }
    }

    deletePlayerCounter() {
        const container = document.getElementById('playerCounter');
        if (container) {
            container.parentNode.removeChild(container);
        }
    }
}

const settingsPhase = new SettingsPhase();
export { settingsPhase };