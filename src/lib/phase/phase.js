class BasePhase {

    phaseUIElements = [];
    
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }

    clearPhase() {
        // Clear any UI elements related to this phase.
        this.phaseUIElements.forEach(element => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        });
        this.phaseUIElements = [];
    }

    showPhase() {
        console.log('Show the phase');
    }

    startPhaseButton(container) {
        const button = document.createElement('button');
        button.textContent = `Start ${this.name} Phase`;
        button.addEventListener('click', () => {
            this.showPhase();
        })
        container.appendChild(button);
    }
}

// class RoleSelectionPhase extends BasePhase {

//     constructor(numberOfPlayers) {
//         super('Role Selection', 'Players select their roles.');
//         this.numberOfPlayers = numberOfPlayers;

//     }
// }

class MonologuePhase extends BasePhase {
    constructor() {
        super('Monologue', 'The game begins with a monologue from the narrator.');
    }

    start() {
        // TODO: Add text-to-speech functionality for the monologue
    }

    stop() {
        // TODO: Stop the monologue
    }
}

class TimerPhase extends BasePhase {
    constructor(duration) {
        super('Timer', 'A timer phase where players can discuss and strategize.');
        this.duration = duration; // Duration in seconds
    }

    start() {
        // TODO: Start the timer
    }

    stop() {
        // TODO: Stop the timer
    }

    reset() {
        // TODO: Reset the timer
    }
}

class VotingPhase extends BasePhase {
    constructor() {
        super('Voting', 'Players vote on who they think are the murderers.');
    }

    vote(player) {
        // TODO: Increment vote count for player
    }

    resetVotes() {
        // TODO: Reset vote count for all players
    }
}

class KillPhase extends BasePhase {
    constructor() {
        super('Kill', 'The kill phase where the murders decide who to eliminate');
    }

    kill(player) {
        //TODO: Eliminate player
    }
}


export { BasePhase };