class Player {
    constructor(name, role) {
        this.name = name;
        this.role = role;
        this.alive = true;
        this.votedOut = false;
        this.votes = 0;
    }

    voteOut() {
        this.votedOut = true;
    }

    die() {
        this.alive = false;
    }

    // Do we need this?
    revive() {
        this.alive = true;
    }
}

const playerList = [];

export { Player, playerList };