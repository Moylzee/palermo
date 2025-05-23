import { isGameOver } from "../common";
import { KillPhase } from "./kill";
import { playerList, getPlayerByName } from "../entity";
import { getActivePlayers } from "../common";

class VotePhase {
    constructor(numberOfPlayers) {
        this.numberOfPlayers = numberOfPlayers;
        this.columns = Math.ceil(Math.sqrt(numberOfPlayers));
        this.rows = Math.ceil(numberOfPlayers / this.columns);
        this.container = null;
        this.header = null;
        this.gridContainer = null;

        this.currentVoter = 0; // index of current player voting
        this.currentVoterObject = getActivePlayers()[0];
        this.votes = new Array(numberOfPlayers).fill(0); // votes received by each player
    }

    createHeader() {
        const header = document.createElement('div');
        header.id = 'header';
        header.style.height = '60px';
        header.style.backgroundColor = '#222';
        header.style.color = 'white';
        header.style.fontSize = '1.5rem';
        header.style.display = 'flex';
        header.style.justifyContent = 'center';
        header.style.alignItems = 'center';
        header.style.userSelect = 'none';

        header.textContent = `${this.currentVoterObject.name}, Vote A Player Out`;
        return header;
    }

    createGridBox(index, name) {
        const box = document.createElement('div');
        box.className = 'gridBox';
        box.textContent = `${name}`;
        box.style.cursor = 'pointer';
        box.style.border = '1px solid white';
        box.style.display = 'flex';
        box.style.justifyContent = 'center';
        box.style.alignItems = 'center';
        box.style.fontSize = '1.25rem';
        box.style.userSelect = 'none';
        box.style.backgroundColor = 'lightblue';

        // Clicking votes for this player if it's current voter's turn
        box.addEventListener('click', () => {
            // Can't vote for yourself
            if (name === this.currentVoterObject.name) {
                alert("You can't vote for yourself!");
                return;
            }
            this.registerVote(index, name);
        });

        return box;
    }

    registerVote(votedIndex, voteName) {
        // Register the vote
        this.votes[votedIndex]++;
        
        console.log(`There are ${getActivePlayers().length} players left.`);

        // Move to next voter
        this.currentVoter++;
        this.currentVoterObject = getActivePlayers()[this.currentVoter];
        const player = getPlayerByName(voteName);
        player.votes++;
        console.log(`Player ${player.name} received a vote. Total votes: ${player.votes}`);
        if (this.currentVoter < getActivePlayers().length) {
        // Update header for next voter
            this.header.textContent = `${this.currentVoterObject.name}, Vote A Player Out`;
        } else {
            // Voting complete, show results
            this.showResults();
        }
    }

    showResults() {
        // Find the player(s) with the highest votes
        const maxVotes = Math.max(...playerList.map(p => p.votes));
        const votedOutPlayers = playerList
            .filter(p => p.votes === maxVotes);

        let message;
        if (votedOutPlayers.length === 1) {
            message = `${votedOutPlayers[0].name} is voted out with ${maxVotes} votes!`;
            // set the player who war voted out to voted out state
            const index = playerList.indexOf(votedOutPlayers[0]);
            playerList[index].votedOut = true;
            console.log(`Player ${playerList[index].name} is voted out!. Status: ${playerList[index].votedOut}`);
        } else {
            message = `Tie! Players ${votedOutPlayers.map(p => p.name).join(', ')} have ${maxVotes} votes each.`;
        }

        alert(message);

        const gameOver = isGameOver();
        console.log("Game Over: " + gameOver);

        if (!gameOver) {
            const proceedButton = document.createElement('button');
            proceedButton.textContent = "Proceed";
            proceedButton.style = "margin-top: 2rem; font-size: 1.2rem;";
            proceedButton.addEventListener('click', () => {
                this.container.remove();
                this.nextPhase();
            });
            this.container.innerHTML = '';
            this.container.appendChild(proceedButton);
        } else {
            // TODO: game over.
            alert("Game Over!");
        }

    }

    render() {
        // Remove existing container if exists
        if (this.container) {
            this.container.remove();
        }

        this.container = document.createElement('div');

        this.header = this.createHeader();
        this.container.appendChild(this.header);

        this.gridContainer = document.createElement('div');
        this.gridContainer.id = 'gridContainer';

        // Setup CSS grid styles
        this.gridContainer.style.display = 'grid';
        this.gridContainer.style.gridTemplateColumns = `repeat(${this.columns}, 1fr)`;
        this.gridContainer.style.gridTemplateRows = `repeat(${this.rows}, 1fr)`;
        this.gridContainer.style.width = '100vw';
        this.gridContainer.style.height = `calc(100vh - 60px)`;
        this.gridContainer.style.borderTop = '2px solid white';

        // Add player boxes for the active players for voting phase
        console.log('\n');
        console.log('Active players:');
        const activePlayers = getActivePlayers();
        activePlayers.forEach(p => {
            console.log(`Player ${p.name}, Role: ${p.role}, VotedOut: ${p.votedOut}, Killed: ${!p.alive}`);
            if (p.votedOut || !p.alive) return;
            const box = this.createGridBox(playerList.indexOf(p), p.name);
            this.gridContainer.appendChild(box);
        })


        this.container.appendChild(this.gridContainer);
        document.body.appendChild(this.container);
    }

    nextPhase() {
        // TODO: Move to kill phase

        playerList.forEach(player => {
            player.votes = 0; // Reset votes for next round
        });

        const killPhase = new KillPhase();
        killPhase.render();
    }
}


export { VotePhase };