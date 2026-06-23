// utils/helpers.js
const LoginPage = require('../pages/LoginPage');
const CONFIG    = require('../config/config');

async function loginAs(page, userType = 'standard') {
  const { username, password } = CONFIG.users[userType];
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(username, password);
  await page.waitForURL('**/inventory.html');
}

async function logout(page) {
  await page.click('#react-burger-menu-btn');
  await page.waitForSelector('#logout_sidebar_link', { state: 'visible' });
  await page.click('#logout_sidebar_link');
  await page.waitForURL('**/');
}

module.exports = { loginAs, logout };
