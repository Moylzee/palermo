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
export { BasePhase };