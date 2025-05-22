class KillPhase {
    constructor(activePlayers, murdererIds, onKill, onProceed) {
        this.activePlayers = activePlayers;
        this.murdererIds = murdererIds;     
        this.onKill = onKill;               
        this.onProceed = onProceed;         
        this.selected = null;
        this.container = null;
    }

    isMurderer(id) {
        return this.murdererIds.includes(id);
    }

    handleSelect(playerId) {
        if (this.selected || this.isMurderer(playerId)) return;

        this.selected = playerId;
        const player = this.activePlayers.find(p => p.id === playerId);
        const isBulletproof = player.role === 'bulletproof';

        // Update buttons
        const buttons = this.container.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.disabled = true;
            if (btn.dataset.id === playerId) {
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

            if (this.onKill) {
                this.onKill(playerId);
            }
        }

        this.container.appendChild(result);

        // Proceed button
        const proceedBtn = document.createElement('button');
        proceedBtn.textContent = 'Proceed';
        proceedBtn.style.marginTop = '1em';
        proceedBtn.addEventListener('click', () => {
            if (this.onProceed) this.onProceed();
        });

        this.container.appendChild(proceedBtn);
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
            btn.dataset.id = player.id;
            btn.style.padding = '1em';
            btn.style.background = '#eee';
            btn.style.cursor = this.isMurderer(player.id) ? 'not-allowed' : 'pointer';
            btn.style.opacity = this.isMurderer(player.id) ? 0.5 : 1;

            btn.addEventListener('click', () => this.handleSelect(player.id));
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
