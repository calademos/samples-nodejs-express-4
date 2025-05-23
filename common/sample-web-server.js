/*
 * Copyright (c) 2018, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

/**
 * A simple web server that initializes the OIDC Middleware library with the
 * given options, and attaches route handlers for the example profile page
 * and logout functionality.
 */

const express = require('express');
const session = require('express-session');
const mustacheExpress = require('mustache-express');
const path = require('path');
const { ExpressOIDC } = require('@okta/oidc-middleware');

const templateDir = path.join(__dirname, '..', 'common', 'views');
const frontendDir = path.join(__dirname, '..', 'common', 'assets');

module.exports = function SampleWebServer(sampleConfig, extraOidcOptions, homePageTemplateName) {

  const oidc = new ExpressOIDC(Object.assign({
    issuer: sampleConfig.oidc.issuer,
    client_id: sampleConfig.oidc.clientId,
    client_secret: sampleConfig.oidc.clientSecret,
    appBaseUrl: sampleConfig.oidc.appBaseUrl,
    scope: sampleConfig.oidc.scope,
    testing: sampleConfig.oidc.testing
  }, extraOidcOptions || {}));

  const app = express();

  app.use(session({
    secret: 'this-should-be-very-random',
    resave: true,
    saveUninitialized: false
  }));

  const displayConfig = Object.assign(
    {},
    sampleConfig.oidc,
    {
      clientSecret: '****' + sampleConfig.oidc.clientSecret.substr(sampleConfig.oidc.clientSecret.length - 4, 4)
    }
  );

  app.locals.oidcConfig = displayConfig;

  app.use('/assets', express.static(frontendDir));
  app.engine('mustache', mustacheExpress());
  app.set('view engine', 'mustache');
  app.set('views', templateDir);

  app.use(oidc.router);

  app.get('/', (req, res) => {
    const template = homePageTemplateName || 'home';
    const userinfo = req.userContext && req.userContext.userinfo;
    res.render(template, {
      isLoggedIn: !!userinfo,
      userinfo: userinfo
    });
  });

  app.get('/profile', oidc.ensureAuthenticated(), (req, res) => {
    const userinfo = req.userContext && req.userContext.userinfo;
    const attributes = Object.entries(userinfo);
    res.render('profile', {
      isLoggedIn: !!userinfo,
      userinfo: userinfo,
      attributes
    });
  });

  app.get('/signed-out', (req, res) => {
    res.send(`
      <html>
        <head><title>Signed Out</title></head>
        <body style="text-align:center; font-family:sans-serif; margin-top:50px;">
          <h1>👋 You’ve successfully signed out</h1>
          <p>Thank you for using the LATAM Internal Portal.</p>
          <a href="/">🔁 Log in again</a>
        </body>
      </html>
    `);
  });

  oidc.on('ready', () => {
    app.listen(sampleConfig.port, () => console.log(`App started on port ${sampleConfig.port}`));
  });

  oidc.on('error', err => {
    console.error('OIDC ERROR: ', err);
  });
};
