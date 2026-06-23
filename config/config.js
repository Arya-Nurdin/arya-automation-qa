// config/config.js

const CONFIG = {
  baseURL: 'https://www.saucedemo.com',

  users: {
    standard: { username: 'standard_user', password: 'secret_sauce' },
    locked:   { username: 'locked_out_user', password: 'secret_sauce' },
    problem:  { username: 'problem_user', password: 'secret_sauce' },
  },

  checkout: {
    firstName: 'Arya',
    lastName:  'Nurdin',
    zipCode:   '12345',
  },

  products: [
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
  ],
};

module.exports = CONFIG;
