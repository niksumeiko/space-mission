import { defineConfig } from 'cypress';

export default defineConfig({
    env: {
        uncaughtCypressException: false,
        hideXhr: true,
    },
    chromeWebSecurity: false,
    // blockHosts: ['!*localhost*'],
    e2e: {
        baseUrl: 'http://localhost:3001',
        specPattern: 'src/**/__tests__/*.test.integration.ts',
        viewportWidth: 680,
        viewportHeight: 768,
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
});
