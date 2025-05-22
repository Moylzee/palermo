const baseRoles = [
    'Murderer 1',
    'Murderer 2',
    'Cop',
    'Madness',    
    'BulletProof',
    'Snitch',
];

const players = [
    'Player 1',
    'Player 2',
    'Player 3',
    'Player 4',
    'Player 5',
    'Player 6',
    'Player 7',
    'Player 8',
    'Player 9',
    'Player 10',
];

function buttonPressed() {
    console.log('Button pressed: app.js works!');
    assignRoles();
}

function assignRoles() {
    const numCivilians = 3;
    let rolesToAssign = [...baseRoles];

    if (rolesToAssign.length + numCivilians > players.length) {
        console.error("Too many unique roles for the number of players.");
        return;
    }

    // Add exactly numCivilians 'Civilian' roles
    for (let i = 0; i < numCivilians; i++) {
        rolesToAssign.push('Civilian');
    }

    // If roles are still less than players, fill with extra Civilians
    while (rolesToAssign.length < players.length) {
        rolesToAssign.push('Civilian');
    }

    // Shuffle the roles
    for (let i = rolesToAssign.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [rolesToAssign[i], rolesToAssign[j]] = [rolesToAssign[j], rolesToAssign[i]];
    }

    const assignments = {};
    players.forEach((player, idx) => {
        assignments[player] = rolesToAssign[idx];
    });

    console.log(assignments);
}
