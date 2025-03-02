import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.cy.ts", // ✅ Ensures Cypress finds TypeScript tests
    setupNodeEvents(on, config) {
      config.baseUrl = 'http://localhost:4200'
    },
    
  },
});