// tests/login.test.js
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const CONFIG    = require('../config/config');

test.describe('Login', () => {

  test('login berhasil dengan kredensial valid', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      CONFIG.users.standard.username,
      CONFIG.users.standard.password
    );
    await expect(page).toHaveURL(/inventory/);
  });

  test('gagal login dengan akun terkunci', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      CONFIG.users.locked.username,
      CONFIG.users.locked.password
    );
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('locked out');
  });

  test('gagal login dengan password salah', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'wrongpassword');
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Username and password do not match');
  });

});
