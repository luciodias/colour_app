import './pwa.js';
import { initDashboard } from './dashboard.js';
import { initConfig } from './config.js';

const page = document.body.dataset.page;

if (page === 'dashboard') {
    initDashboard();
} else if (page === 'config') {
    initConfig();
}
