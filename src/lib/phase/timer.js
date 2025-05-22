import { BasePhase } from "./phase";
import { VotePhase } from "./vote";
import gameSettings from "../gamesettings";

class TimerPhase extends BasePhase {
    constructor() {
        super('Timer', 'Discussion time countdown before proceeding.');
        this.timerContainer = null;
        this.timerInterval = null;
        this.timeLeft = 1 * 5; // Default 5 minutes
    }

    showTimer() {
        this.buildTimerUI();
        this.phaseUIElements.push(this.timerContainer); // Track for later removal
        document.body.appendChild(this.timerContainer);
        this.updateDisplay();
    }

    buildTimerUI() {
        // Container setup
        this.timerContainer = document.createElement('div');
        this.timerContainer.id = 'timerContainer';
        this.timerContainer.style = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.8); color: white; display: flex;
            flex-direction: column; align-items: center; justify-content: center;
            font-size: 2rem; z-index: 9999;
        `;

        // Timer UI elements
        const title = document.createElement('h3');
        title.textContent = 'Discussion Time';

        const timerDisplay = document.createElement('div');
        timerDisplay.id = 'timerDisplay';
        timerDisplay.textContent = '05:00';

        const startButton = document.createElement('button');
        startButton.id = 'startTimerButton';
        startButton.textContent = 'Start';
        startButton.addEventListener('click', () => this.startTimer());

        const audio = document.createElement('audio');
        audio.id = 'timerEndSound';
        audio.src = 'https://actions.google.com/sounds/v1/alarms/beep_short.ogg';
        audio.preload = 'auto';

        this.timerContainer.appendChild(title);
        this.timerContainer.appendChild(timerDisplay);
        this.timerContainer.appendChild(startButton);
        this.timerContainer.appendChild(audio);
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        const display = document.getElementById('timerDisplay');
        if (display) {
            display.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
    }

    startTimer() {
        const startButton = document.getElementById('startTimerButton');
        if (startButton) startButton.disabled = true;

        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();
            if (this.timeLeft <= 0) {
                this.endTimer();
            }
        }, 1000);
    }

    endTimer() {
        clearInterval(this.timerInterval);
        const audio = document.getElementById('timerEndSound');
        if (audio) audio.play();

        const proceedButton = document.createElement('button');
        proceedButton.textContent = "Proceed";
        proceedButton.style = "margin-top: 20px; font-size: 1.5rem;";
        proceedButton.addEventListener('click', () => {
            this.timerContainer.remove();
            this.nextPhase();
        });

        this.timerContainer.appendChild(proceedButton);
    }

    nextPhase() {
        const votePhase = new VotePhase(gameSettings.numberOfPlayers);
        votePhase.render();
    }

    deleteTimerUI() {
        if (this.timerContainer) {
            this.timerContainer.remove();
        }
    }
}

export { TimerPhase };
