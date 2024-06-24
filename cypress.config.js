const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
  env: {
    email: 'test3@gmail.com',
    password: '12345678',
  },
});
