import {withController} from '@snar/lit';
import {LitElement, html} from 'lit';
import {withStyles} from 'lit-with-styles';
import {customElement, query} from 'lit/decorators.js';
import {materialShellLoadingOff} from 'material-shell';
import {bindInput} from 'relit';
import {Mode, store} from '../store.js';
import styles from './app-shell.css?inline';
import type {MdOutlinedTextField} from '@material/web/all.js';

declare global {
	interface Window {
		app: AppShell;
	}
	interface HTMLElementTagNameMap {
		'app-shell': AppShell;
	}
}

@customElement('app-shell')
@withStyles(styles)
@withController(store)
export class AppShell extends LitElement {
	@query('#textfield') textfield?: MdOutlinedTextField;

	firstUpdated() {
		materialShellLoadingOff.call(this);
	}

	render() {
		return html`<!-- -->
			${store.mode === Mode.VIEW
				? html`<pre class="p-5 m-0" style="font-family: Roboto;">
${store.content}</pre
					>`
				: null}
			${store.mode === Mode.EDIT
				? html`<!-- -->
						<md-outlined-text-field
							id="textfield"
							type="textarea"
							class="h-full m-2"
							${bindInput(store, 'content')}
						></md-outlined-text-field>
						<!-- -->`
				: null}
			<md-fab
				size="large"
				class="absolute bottom-8 right-8"
				@click="${() => store.toggleMode()}"
			>
				${store.mode === Mode.VIEW
					? html`<md-icon slot="icon">edit</md-icon>`
					: html`<md-icon slot="icon">check</md-icon>`}
			</md-fab>
			<!-- -->`;
	}
}

export const app = (window.app = new AppShell());
