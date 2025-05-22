import { settingsPhase } from "./lib/phase/settings";
import { timerPhase } from "./lib/phase/timer";

settingsPhase.showPlayerCounter();

// let totalPlayers = 0;
// let currentPlayerIndex = 0;
// let rolePool = [];
// let playerAssignments = [];

// document.getElementById('submitPlayers').addEventListener('click', () => {
//     console.log('User clicked continue');
//     totalPlayers = parseInt(document.getElementById('numPlayers').value, 10);
//     console.log('Total players:', totalPlayers);
//     const availableRoles = roleRules[totalPlayers] || [];

//     // Render player icons as civilians initially, but always show 2 murderers with a different icon
//     const playerIconsContainer = document.getElementById('playerIcons');
//     playerIconsContainer.innerHTML = '';
//     for (let i = 0; i < totalPlayers; i++) {
//         const icon = document.createElement('div');
//         icon.style.fontSize = '2rem';
//         icon.style.margin = '8px 0';
//         icon.id = `player-icon-${i}`;
//         if (i < 2) {
//             icon.textContent = '💀'; // Murderer icon
//             icon.style.color = 'red';
//         } else {
//             icon.textContent = '👤'; // Civilian icon
//             icon.style.color = 'black';
//         }
//         playerIconsContainer.appendChild(icon);
//     }

//     const roleList = document.getElementById('roles');
//     roleList.innerHTML = '<h3>Select Optional Roles</h3>';

//     availableRoles.forEach(role => {
//         const label = document.createElement('label');
//         const checkbox = document.createElement('input');
//         checkbox.type = 'checkbox';
//         checkbox.value = role;
//         checkbox.name = 'roleOption';

//         label.appendChild(checkbox);
//         label.appendChild(document.createTextNode(role));
//         roleList.appendChild(label);
//         roleList.appendChild(document.createElement('br'));
//     });

//     document.getElementById('roleSelection').classList.remove('hidden');
//     document.getElementById('startAssignment').hidden = false;;
// });

// document.getElementById('startAssignment').addEventListener('click', () => {
//     const checkboxes = document.querySelectorAll('input[name="roleOption"]:checked');
//     const selectedOptionalRoles = Array.from(checkboxes).map(cb => cb.value);

//     rolePool = ['Murderer 1', 'Murderer 2', ...selectedOptionalRoles];

//     // Add minimum 3 Civilians
//     for (let i = 0; i < 3; i++) rolePool.push('Civilian');

//     // Fill remainder with civilians
//     while (rolePool.length < totalPlayers) {
//         rolePool.push('Civilian');
//     }

//     // Shuffle roles
//     for (let i = rolePool.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [rolePool[i], rolePool[j]] = [rolePool[j], rolePool[i]];
//     }

//     // Update all icons to match the shuffled roles (no names, just role icons/colors)
//     const playerIconsContainer = document.getElementById('playerIcons');
//     for (let i = 0; i < rolePool.length; i++) {
//         const iconDiv = document.getElementById(`player-icon-${i}`);
//         if (iconDiv) {
//             const { icon, color } = getRoleIconAndColor(rolePool[i]);
//             iconDiv.textContent = icon;
//             iconDiv.style.color = color;
//         }
//     }

//     document.getElementById('roleSelection').classList.add('hidden');
//     document.getElementById('playerNameEntry').classList.remove('hidden');
//     document.getElementById('startAssignment').hidden = false;

//     showNextPlayerInput();
// });

// function showNextPlayerInput() {
//     if (currentPlayerIndex >= totalPlayers) {
//         document.getElementById('playerNameEntry').innerHTML = "<h3>All roles assigned!</h3>";
//         return;
//     }

//     const container = document.getElementById('playerNameEntry');
//     container.innerHTML = `
//         <h3>Player ${currentPlayerIndex + 1}, enter your name:</h3>
//         <input type="text" id="playerNameInput" placeholder="Player Name" />
//     `;
//     const button = document.createElement('button');
//     button.textContent = 'See Role';
//     button.addEventListener('click', assignRoleToCurrentPlayer);
//     container.appendChild(button);
// }

// // Helper to get icon and color for a role
// function getRoleIconAndColor(role) {
//     switch (role) {
//         case 'Murderer 1':
//         case 'Murderer 2':
//             return { icon: '💀', color: 'red' };
//         case 'Cop':
//             return { icon: '👮', color: 'blue' };
//         case 'BulletProof':
//             return { icon: '🦺', color: 'orange' };
//         case 'Snitch':
//             return { icon: '🕵️', color: 'purple' };
//         case 'Madness':
//             return { icon: '🤪', color: 'green' };
//         default:
//             return { icon: '👤', color: 'black' };
//     }
// }

// function assignRoleToCurrentPlayer() {
//     const nameInput = document.getElementById('playerNameInput');
//     const playerName = nameInput.value.trim() || `Player ${currentPlayerIndex + 1}`;

//     const assignedRole = rolePool[currentPlayerIndex];
//     playerAssignments.push({ name: playerName, role: assignedRole });

//     // Add player name to the player names box (no indication of role)
//     const playerNamesList = document.getElementById('playerNamesList');
//     if (playerNamesList) {
//         const li = document.createElement('li');
//         li.textContent = playerName;
//         playerNamesList.appendChild(li);
//     }

//     // Update the icon for this player to match their role
//     const iconDiv = document.getElementById(`player-icon-${currentPlayerIndex}`);
//     if (iconDiv) {
//         const { icon, color } = getRoleIconAndColor(assignedRole);
//         iconDiv.textContent = icon;
//         iconDiv.style.color = color;
//     }

//     const container = document.getElementById('playerNameEntry');
//     container.innerHTML = `
//         <h3>${playerName}, your role is:</h3>
//         <p><strong>${assignedRole}</strong></p>
//     `;
//     const button = document.createElement('button');
//     button.textContent = 'OK';
//     button.addEventListener('click', nextPlayer);
//     container.appendChild(button);
// }

// function nextPlayer() {
//     currentPlayerIndex++;
//     showNextPlayerInput();
// }
