import { settingsPhase } from "./lib/phase/settings";
import { timerPhase } from "./lib/phase/timer";

const optionalRoles = ['Cop', 'Madness', 'BulletProof', 'Snitch'];
const roleRules = {
    7: ['Cop'],
    8: ['Cop', 'Snitch', 'BulletProof'],
    9: ['Cop', 'Snitch', 'BulletProof', 'Madness']
};

let totalPlayers = 0;
let currentPlayerIndex = 0;
let rolePool = [];
let playerAssignments = [];

settingsPhase.showPlayerCounter();

// document.getElementById('submitPlayers').addEventListener('click', () => {
//     console.log('User clicked continue');
//     totalPlayers = parseInt(document.getElementById('numPlayers').value, 10);
//     console.log('Total players:', totalPlayers);
//     const availableRoles = roleRules[totalPlayers] || [];

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
//     document.getElementById('startAssignment').classList.remove('hidden');
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

//     document.getElementById('roleSelection').classList.add('hidden');
//     document.getElementById('startAssignment').classList.add('hidden');
//     document.getElementById('playerNameEntry').classList.remove('hidden');

//     showNextPlayerInput();
// });

// function showNextPlayerInput() {
//     if (currentPlayerIndex >= totalPlayers) {
//         document.getElementById('playerNameEntry').innerHTML = "<h3>All roles assigned!</h3>";

//         // Show start button for next phase
//         monologuePhase.startPhaseButton(document.getElementById('playerNameEntry'));
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

// function assignRoleToCurrentPlayer() {
//     const nameInput = document.getElementById('playerNameInput');
//     const playerName = nameInput.value.trim() || `Player ${currentPlayerIndex + 1}`;

//     const assignedRole = rolePool[currentPlayerIndex];
//     playerAssignments.push({ name: playerName, role: assignedRole });

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
