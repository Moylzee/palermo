import { BasePhase } from './phase';

class MonologuePhase extends BasePhase {
    constructor(selectedRoles = []) {
        super('Monologue');
        this.selectedRoles = selectedRoles;
    }

    generateMonologue() {
        const prompts = [
            'It is Night Time in Palermo.',
            'Everyone close your eyes.',
            'Both Murderers open your eyes and recognize each other.',
        ];

        if (this.selectedRoles.includes('Cop')) {
            prompts.push(
                'Murderer number 1, keep your eyes closed and raise your hand. Cop, open your eyes and recognize Murderer number 1.'
            );
        }

        if (this.selectedRoles.includes('Snitch')) {
            prompts.push(
                'Both Murderers, raise your hands. Snitch, open your eyes and recognize the 2 murderers.'
            );
        }

        prompts.push(
            'Everyone close your eyes.',
            'Everyone Lower your Hands',
            'It is Morning in Palermo.',
            'Everyone open your eyes.'
        );

        return prompts.join('\n');
    }

    start() {
        const container = document.createElement('div');
        container.id = 'monologueContainer';
        container.style = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: #222; color: #fff; padding: 2rem;
            display: flex; flex-direction: column; justify-content: center; align-items: center;
            font-size: 1.5rem; line-height: 2rem;
        `;

        const monologueText = document.createElement('p');
        monologueText.textContent = this.generateMonologue();
        container.appendChild(monologueText);

        const proceedButton = document.createElement('button');
        proceedButton.textContent = "Proceed";
        proceedButton.style = "margin-top: 2rem; font-size: 1.2rem;";
        proceedButton.addEventListener('click', () => {
            container.remove();
            this.nextPhase();
        });

        container.appendChild(proceedButton);
        document.body.appendChild(container);
    }
}

export { MonologuePhase };
