class VotePhase {
    constructor(numberOfPlayers) {
        this.numberOfPlayers = numberOfPlayers;
        this.columns = Math.ceil(Math.sqrt(numberOfPlayers));
        this.rows = Math.ceil(numberOfPlayers / this.columns);
        this.container = null;
        this.header = null;
        this.gridContainer = null;

        this.currentVoter = 0; // index of current player voting
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

        header.textContent = `Player ${this.currentVoter + 1}, Vote A Player Out`;
        return header;
    }

    createGridBox(index) {
        const box = document.createElement('div');
        box.className = 'gridBox';
        box.textContent = `Player ${index + 1}`;
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
        if (index === this.currentVoter) {
            alert("You can't vote for yourself!");
            return;
        }
        this.registerVote(index);
        });

        return box;
    }

    registerVote(votedIndex) {
        // Register the vote
        this.votes[votedIndex]++;
        
        // Move to next voter
        this.currentVoter++;

        if (this.currentVoter < this.numberOfPlayers) {
        // Update header for next voter
        this.header.textContent = `Player ${this.currentVoter + 1}, Vote A Player Out`;
        } else {
        // Voting complete, show results
        this.showResults();
        }
    }

    showResults() {
        // Find the player(s) with the highest votes
        const maxVotes = Math.max(...this.votes);
        const votedOutPlayers = this.votes
        .map((v, i) => ({ player: i + 1, votes: v }))
        .filter(({ votes }) => votes === maxVotes)
        .map(({ player }) => player);

        let message;
        if (votedOutPlayers.length === 1) {
            message = `Player ${votedOutPlayers[0]} is voted out with ${maxVotes} votes!`;
        } else {
            message = `Tie! Players ${votedOutPlayers.join(', ')} have ${maxVotes} votes each.`;
        }

        alert(message);

        const proceedButton = document.createElement('button');
        proceedButton.textContent = "Proceed";
        proceedButton.style = "margin-top: 2rem; font-size: 1.2rem;";
        proceedButton.addEventListener('click', () => {
            container.remove();
            this.nextPhase();
        });
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

        // Add player boxes
        for (let i = 0; i < this.numberOfPlayers; i++) {
        const box = this.createGridBox(i);
        this.gridContainer.appendChild(box);
        }

        this.container.appendChild(this.gridContainer);
        document.body.appendChild(this.container);
    }
}
