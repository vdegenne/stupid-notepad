import {ReactiveController, state} from '@snar/lit';
import {saveToLocalStorage} from 'snar-save-to-local-storage';
import {app} from './app-shell/app-shell.js';
import {sleep} from './utils.js';

export enum Mode {
	VIEW,
	EDIT,
}

@saveToLocalStorage('stupid-notepad:store')
export class AppStore extends ReactiveController {
	@state() mode: Mode = Mode.VIEW;
	@state() content = '';

	update() {
		if (!this.hasUpdated) {
			this.mode = Mode.VIEW;
		}
	}

	async toggleMode() {
		if (this.mode === Mode.EDIT) {
			this.mode = Mode.VIEW;
		} else {
			this.mode = Mode.EDIT;

			await this.updateComplete;
			await app.updateComplete;
			await app.textfield.updateComplete;
			app.textfield.focus();
		}
	}
}

export const store = new AppStore();
