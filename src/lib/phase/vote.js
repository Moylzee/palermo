class VotePhase {
constructor(numberOfPlayers) {
    this.numberOfPlayers = numberOfPlayers;
    this.columns = Math.ceil(Math.sqrt(numberOfPlayers));
    this.rows = Math.ceil(numberOfPlayers / this.columns);
    this.container = null;
    this.header = null;
    this.gridContainer = null;
}

createHeader() {
    const header = document.createElement('div');
    header.id = 'header';
    header.textContent = `Player 1, Vote A Player Out`;
    return header;
}

createGridBox(index) {
    const box = document.createElement('div');
    box.className = 'gridBox';
    box.textContent = `Player ${index + 1}`;
    box.style.cursor = 'pointer';

    box.addEventListener('click', () => {
    alert(`You voted out Player ${index + 1}`);
    // TODO: Implement voting 
    });

    return box;
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
    this.gridContainer.style.height = `calc(100vh - 60px)`; // subtract header height

    // Add player boxes
    for (let i = 0; i < this.numberOfPlayers; i++) {
    const box = this.createGridBox(i);
    this.gridContainer.appendChild(box);
    }

    this.container.appendChild(this.gridContainer);
    document.body.appendChild(this.container);
}
}

export { VotePhase };