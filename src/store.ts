import {ReactiveController, state} from '@snar/lit';
import {saveToLocalStorage} from 'snar-save-to-local-storage';

export enum Mode {
	VIEW,
	EDIT,
}

@saveToLocalStorage('stupid-notepad:store')
export class AppStore extends ReactiveController {
	@state() mode: Mode = Mode.VIEW;
	@state() content = '';

	update() {
		// this.mode = Mode.EDIT;
	}

	toggleMode() {
		if (this.mode === Mode.EDIT) {
			this.mode = Mode.VIEW;
		} else {
			this.mode = Mode.EDIT;
		}
	}
}

export const store = new AppStore();
