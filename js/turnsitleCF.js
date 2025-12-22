// src/js/services/turnstile.js
import { config, initializeConfig } from '../config.js';

export class TurnstileService {
    static isInitialized = false;

    static async init() {
        if (this.isInitialized) return;

        await initializeConfig();
        const sitekey = config.cfTr;

        if (!sitekey || !sitekey.startsWith('0x')) {
            console.error('Turnstile sitekey missing or invalid');
            return;
        }

        await this.loadScript();
        this.render(sitekey);

        this.isInitialized = true;
    }

    static loadScript() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
            script.async = true;
            script.defer = true;

            script.onload = resolve;
            script.onerror = reject;

            document.head.appendChild(script);
        });
    }

    static render(sitekey) {
        const container = document.getElementById('turnstileContainer');
        if (!container) {
            console.error('Turnstile container not found');
            return;
        }

        window.turnstile.render(container, {
            sitekey,
            callback: (token) => {
                window.lastTurnstileToken = token;
                this.enableSubmitButton();
            },
            'error-callback': () => {
                window.lastTurnstileToken = null;
                this.disableSubmitButton();
            },
            'expired-callback': () => {
                window.lastTurnstileToken = null;
                this.disableSubmitButton();
            }
        });
    }

    static enableSubmitButton() {
        const btn = document.getElementById('createNoteBtn');
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-lock"></i> Create Secure Note';
        }
    }

    static disableSubmitButton() {
        const btn = document.getElementById('createNoteBtn');
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-lock"></i> Complete CAPTCHA';
        }
    }
}

// Auto‑init
document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', () => TurnstileService.init())
    : TurnstileService.init();