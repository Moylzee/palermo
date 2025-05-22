import { getActivePlayers } from "../common";

class KillPhase {
    constructor() {
        this.activePlayers = getActivePlayers();
    }

    handleSelect(playerName) {
        if (this.selected) return;

        const player = this.activePlayers.find(p => p.name === playerName);
        const isBulletproof = player.role === 'bulletproof';

        // Update buttons
        const buttons = this.container.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.disabled = true;
            if (btn.textContent === playerName) {
                btn.style.background = isBulletproof ? 'orange' : 'red';
            }
        });

        const result = document.createElement('div');
        result.style.marginTop = '1em';
        result.style.fontWeight = 'bold';

        if (isBulletproof) {
            result.style.color = 'orange';
            result.textContent = `${player.name} was bulletproof and survived the attack!`;
        } else {
            result.style.color = 'red';
            result.textContent = `${player.name} has been killed.`;

            player.die();
        }

        this.container.appendChild(result);

        const proceedButton = document.createElement('button');
        proceedButton.textContent = "Proceed";
        proceedButton.style = "margin-top: 2rem; font-size: 1.2rem;";
        proceedButton.addEventListener('click', () => {
            container.remove();
            this.nextPhase();
        });

        this.container.appendChild(proceedButton);
    }

    showKillScreen() {
        this.container.innerHTML = '';

        const title = document.createElement('h2');
        title.textContent = 'Kill Phase';
        this.container.appendChild(title);

        const instruction = document.createElement('p');
        instruction.textContent = 'Murderers, choose someone to kill:';
        this.container.appendChild(instruction);

        const grid = document.createElement('div');
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
        grid.style.gap = '10px';

        this.activePlayers.forEach(player => {
            const btn = document.createElement('button');
            btn.textContent = player.name;
            btn.style.padding = '1em';
            btn.style.background = '#eee';

            btn.addEventListener('click', () => this.handleSelect(player.name));
            grid.appendChild(btn);
        });

        this.container.appendChild(grid);
    }

    render() {
        if (this.container) this.container.remove();

        this.container = document.createElement('div');
        this.container.style.textAlign = 'center';

        const prompt = document.createElement('p');
        prompt.textContent = 'It is Night Time in Palermo. Murderers, open your eyes and choose someone to kill.';
        this.container.appendChild(prompt);

        const startBtn = document.createElement('button');
        startBtn.textContent = 'Begin Kill Phase';
        startBtn.style.marginTop = '1em';
        startBtn.addEventListener('click', () => {
            this.showKillScreen();
        });

        this.container.appendChild(startBtn);

        document.body.appendChild(this.container);
    }
}


export { KillPhase };