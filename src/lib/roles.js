const optionalRoles = {
    cop: 'Cop',
    madness: 'Madness',
    bulletproof: 'BulletProof',
    snitch: 'Snitch'
}


const roleThresholds = [
    { role: optionalRoles.cop, minPlayers: 7 },
    { role: optionalRoles.snitch, minPlayers: 8 },
    { role: optionalRoles.bulletproof, minPlayers: 8 },
    { role: optionalRoles.madness, minPlayers: 9 }
]

function getAvailableRoles(totalPlayers) {
    return roleThresholds
        .filter(r => totalPlayers >= r.minPlayers)
        .map(r => r.role);
}

export { optionalRoles, getAvailableRoles };