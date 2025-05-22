import gameSettings from "./gamesettings";


/**
 * 
 * @param {string} id - The ID to assign to the player icons container.
 * @returns {HTMLElement} A div element that serves as a container for player icons.
 */
function createPlayerIconsContainer(id) {
    const playerIconsContainer = document.createElement('div');
    playerIconsContainer.id = id;
    playerIconsContainer.style.display = 'grid';
    playerIconsContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(50px, 1fr))';
    playerIconsContainer.style.gap = '10px';
    playerIconsContainer.style.justifyItems = 'center';
    playerIconsContainer.style.alignItems = 'center';
    playerIconsContainer.style.backgroundColor = '#e6f0ff';
    playerIconsContainer.style.borderRadius = '6px';
    playerIconsContainer.style.padding = '10px';
    playerIconsContainer.style.flex = '1';
    playerIconsContainer.style.minHeight = '200px';

    return playerIconsContainer;
}

/**
 * 
 * @param {HTMLDivElement} iconContainer 
 * @param {number} count
 * @param {Array} roles
 */
function showPlayerIcons(iconContainer, count, roles) {

    // clear previous icons
    iconContainer.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const icon = document.createElement('div');
        icon.style.fontSize = '2rem';
        icon.style.margin = '8px 0';
        icon.id = `player-icon-${i}`;
        const { icon: icon_, color: color_ } = getRoleIconAndColor(roles[i]);
        icon.textContent = icon_;
        icon.style.color = color_;
        iconContainer.appendChild(icon);
    }
}


 // Helper to get icon and color for a role
function getRoleIconAndColor(role) {
    switch (role) {
        case 'Murderer 1':
        case 'Murderer 2':
            return { icon: '💀', color: 'red' };
        case 'Cop':
            return { icon: '👮', color: 'blue' };
        case 'BulletProof':
            return { icon: '🦺', color: 'orange' };
        case 'Snitch':
            return { icon: '🕵️', color: 'purple' };
        case 'Madness':
            return { icon: '🤪', color: 'green' };
        default:
            return { icon: '👤', color: 'black' };
    }
}


function showPlayerBox(parent, playerNameList) {
    const existingPlayerBox = document.getElementById('playerNameBox');
    if (existingPlayerBox) {
        existingPlayerBox.parentNode.removeChild(existingPlayerBox);
    }

    const playerBox = document.createElement('div');
    playerBox.id = 'playerNameBox';
    playerBox.style.minWidth = '150px';

    const title = document.createElement('h4');
    title.style.marginTop = '0';
    title.innerHTML = 'Players';
    playerBox.appendChild(title);

    const nameList = document.createElement('ul');
    nameList.id='playerNameList';
    nameList.style.listStyle = 'none';
    nameList.style.paddingLeft = '0';
    nameList.style.margin = '0';
    playerBox.appendChild(nameList);

    for (let i = 0; i < playerNameList.length; i++) {
        const li = document.createElement('li');
        li.textContent = playerNameList[i];
        nameList.appendChild(li);
    }

    parent.appendChild(playerBox);
    return playerBox;
}

function getActivePlayers() {
    const playerNameList = [];
    for (let i = 0; i < gameSettings.playerList.length; i++) {
        if (gameSettings.playerList[i].alive || !gameSettings.playerList[i].votedOut) {
            playerNameList.push(gameSettings.playerList[i].name);
        }
    }
    return playerNameList;
}

function getPlayerRoles() {
    const playerRoles = [];
    for (let i = 0; i < gameSettings.playerList.length; i++) {
        if (gameSettings.playerList[i].alive || !gameSettings.playerList[i].votedOut) {
            playerRoles.push(gameSettings.playerList[i].role);
        }
    }
    return playerRoles;
}

function isGameOver() {
    // MADNESS
    const votedOutMadness = gameSettings.playerList.some(
        player => player.votedOut && player.role === "Madness"
    );

    if (votedOutMadness) {
        return true;
    }

    var activePlayers = getActivePlayers();
    var activePlayersRoles = getPlayerRoles();

    var goodPlayers = 0;
    var badPlayers = 0;
    var numMurderers = 0;

    for (let i = 0; i < activePlayersRoles.length; i++) {
        switch (activePlayersRoles[i]) {
            case 'Murderer 1':
                badPlayers++;
                numMurderers++;
                break;
            case 'Murderer 2':
                badPlayers++;
                numMurderers++;
                break;
            case 'Snitch':
                badPlayers++;
            default:
                goodPlayers++;
                break;
        }
    }

    // If Both Murderers are dead
    if (numMurderers == 0) {
        return true;
    }

    // If number of players == 4 and active bad == 2
    if (activePlayers.length == 4 && badPlayers ==  2) {
        return true;
    }

    // If number of players == 5 and active bad == 3
    if (activePlayers.length == 5 && badPlayers == 3) {
        return true;
    }
}

export { createPlayerIconsContainer, showPlayerIcons, showPlayerBox };