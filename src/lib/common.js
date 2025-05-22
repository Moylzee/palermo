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
}

export { createPlayerIconsContainer, showPlayerIcons, showPlayerBox };