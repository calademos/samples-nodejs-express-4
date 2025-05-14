const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');

// Read environment variables from "testenv" if it exists (used for local dev)
const TESTENV = path.resolve(__dirname, 'testenv');
if (fs.existsSync(TESTENV)) {
  const envConfig = dotenv.parse(fs.readFileSync(TESTENV));
  Object.keys(envConfig).forEach((k) => {
    process.env[k] = envConfig[k];
  });
}

// Assign values from environment or use placeholders for local fallback
const ISSUER = process.env.ISSUER || 'https://{yourOktaDomain}.com/oauth2/default';
const CLIENT_ID = process.env.CLIENT_ID || '{clientId}';
const CLIENT_SECRET = process.env.CLIENT_SECRET || '{clientSecret}';
const SPA_CLIENT_ID = process.env.SPA_CLIENT_ID || '{spaClientId}';
const OKTA_TESTING_DISABLEHTTPSCHECK = process.env.OKTA_TESTING_DISABLEHTTPSCHECK ? true : false;
const APP_BASE_URL = process.env.APP_BASE_URL || 'http://localhost:8080';
const PORT = process.env.PORT || 8080;

module.exports = {
  webServer: {
    port: PORT,
    oidc: {
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      issuer: ISSUER,
      appBaseUrl: APP_BASE_URL,
      scope: 'openid profile email',
      testing: {
        disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK
      }
    },
  },
  resourceServer: {
    port: 8000,
    oidc: {
      clientId: SPA_CLIENT_ID,
      issuer: ISSUER,
      testing: {
        disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK
      }
    },
    assertClaims: {
      aud: 'api://default',
      cid: SPA_CLIENT_ID
    }
  }
};
