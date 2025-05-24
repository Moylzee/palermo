import { BasePhase } from "./phase";
import { RoleSelectionPhase } from "./roleselection";
import { getAvailableRoles } from "../roles";
import gameSettings from "../gamesettings";
import { createPlayerIconsContainer, showPlayerIcons } from "../common";

import '../../style/settingsPhase.css';

class SettingsPhase extends BasePhase {
    constructor() {
        super('Settings', 'Enter number of players and select optional roles.');
        loadSettingsPhaseStyle();
    }

    showPlayerCounter() {
        // Create the main wrapper with flex layout
        const wrapper = document.createElement('div');
        wrapper.id = 'settingsWrapper';
        wrapper.style.display = 'flex';
        wrapper.style.gap = '20px';
        wrapper.style.alignItems = 'flex-start';

        // Counter container
        const counterContainer = document.createElement('div');
        counterContainer.id = 'playerCounter';
        counterContainer.innerHTML = `<h3>Number of Players:</h3>`;

        const playerCountInput = document.createElement('input');
        playerCountInput.type = 'number';
        playerCountInput.id = 'playerCountInput';
        playerCountInput.min = 4;
        playerCountInput.max = 20;
        playerCountInput.value = 4;
        counterContainer.appendChild(playerCountInput);

        const setPlayerCountButton = document.createElement('button');
        setPlayerCountButton.textContent = 'Set Player Count';
        counterContainer.appendChild(setPlayerCountButton);

        // Role selection container
        const roleContainer = document.createElement('div');
        roleContainer.id = 'roleSelectionContainer';
        roleContainer.style.display = 'none';  // Hide initially

        // Add both to the wrapper
        wrapper.appendChild(counterContainer);
        wrapper.appendChild(roleContainer);

        // Append wrapper to body
        document.body.appendChild(wrapper);
        this.phaseUIElements.push(wrapper);

        // Handle button click
        setPlayerCountButton.addEventListener('click', () => {
            this.clearPrevious();
            counterContainer.style.display = 'none';
            const playerCount = parseInt(playerCountInput.value, 10);
            this.numberOfPlayers = playerCount;
            gameSettings.numberOfPlayers = playerCount;

            roleContainer.style.display = 'block'; 
            // Clear and rebuild role selection
            roleContainer.innerHTML = '';

            // Place roleList above icons
            const availableRoles = getAvailableRoles(playerCount);
            const roleList = document.createElement('div');
            roleList.id = 'roleList';
            roleList.style.position = 'relative';

            if (this.numberOfPlayers < 7) {
                roleList.innerHTML = `<h3>Not enough players for extra roles</h3>`;
            } else {
                roleList.innerHTML = `<h3>Select Optional Roles:</h3>`;
            }

            availableRoles.forEach(role => {
                const label = document.createElement('label');
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = role;
                checkbox.name = 'roleOption';
                checkbox.addEventListener('change', () => {
                    const selectedRoles = Array.from(roleList.querySelectorAll('input[name="roleOption"]:checked')).map(cb => cb.value);
                    let roles = ['Murderer 1', 'Murderer 2', ...selectedRoles];
                    while (roles.length < playerCount) roles.push('Civilian');
                    gameSettings.selectedRoles = roles;
                    showPlayerIcons(playerIconsContainer, playerCount, roles);
                });

                label.appendChild(checkbox);
                label.appendChild(document.createTextNode(role));
                roleList.appendChild(label);
                roleList.appendChild(document.createElement('br'));
            });

            // Place roleList before playerIconsContainer
            roleList.style.margin = '0 auto 1em auto';
            roleList.style.textAlign = 'center';
            roleContainer.appendChild(roleList);

            const playerIconsContainer = createPlayerIconsContainer('playerIcons');
            roleContainer.appendChild(playerIconsContainer);

            let roles = ['Murderer 1', 'Murderer 2'];
            while (roles.length < playerCount) roles.push('Civilian');
            gameSettings.selectedRoles = roles;
            showPlayerIcons(playerIconsContainer, playerCount, roles);

            const startAssignmentButton = document.createElement('button');
            startAssignmentButton.textContent = 'Confirm Player Count and Roles';
            startAssignmentButton.id = 'startAssignmentButton';
            // Center the button
            startAssignmentButton.style.display = 'block';
            startAssignmentButton.style.margin = '2em auto 0 auto';
            startAssignmentButton.addEventListener('click', () => {
                const selectedOptionalRoles = Array.from(roleList.querySelectorAll('input[name="roleOption"]:checked')).map(cb => cb.value);
                wrapper.innerHTML = '';
                const style = document.getElementById('settingsPhaseStyle');
                if (style) style.remove();
                const roleSelectionPhase = new RoleSelectionPhase();
                roleSelectionPhase.start(playerCount, selectedOptionalRoles);
            });
            roleContainer.appendChild(startAssignmentButton);
        });
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
        const wrapper = document.getElementById('settingsWrapper');
        if (wrapper) {
            wrapper.parentNode.removeChild(wrapper);
        }
    }
}

function loadSettingsPhaseStyle() {
    if (!document.getElementById('settingsPhaseStyle')) {
        const style = document.createElement('link');
        style.id = 'settingsPhaseStyle';
        style.rel = 'stylesheet';
        style.href = '/src/style/settingsPhase.css';
        document.head.appendChild(style);
    }
}

const settingsPhase = new SettingsPhase();
export { settingsPhase };
