import assert from 'assert';
import pg from 'pg';
import dbHelpers from '../dbHelpers.js';

describe('dbHelpers', function() {
  const pool = new pg.Pool();
  before(async function() {
    await pool.connect();
    await pool.query('DELETE FROM accounts WHERE name=$1', ['foo']);
  });

  after(async function() {
    await pool.query('DELETE FROM accounts WHERE name=$1', ['foo']);
  });

  describe('createAccount', function() {
    it('creates an account and a token when passed a valid name and password', async function() {
      let accountExists = (await pool.query("SELECT * FROM accounts WHERE name='foo'")).rows.length > 0;
      assert(!accountExists);

      const returnedAccount = await dbHelpers.createAccount('foo', 'bar');
      assert(returnedAccount && returnedAccount.name === 'foo');

      accountExists = (await pool.query("SELECT * FROM accounts WHERE name='foo'")).rows.length > 0;
      assert(accountExists);

      const tokenExists = (await pool.query("SELECT * FROM tokens WHERE token=$1", [returnedAccount.token])).rows.length > 0;
      assert(tokenExists);
    });

    it('does not create an account if account name exists', async function() {
      const accountExists = (await pool.query("SELECT * FROM accounts WHERE name='foo'")).rows.length > 0;
      assert(accountExists);

      const returnedAccount = await dbHelpers.createAccount('foo', 'bar');
      assert(returnedAccount && returnedAccount.error === 'Account was not created!');
    });
  });

  describe('getAccountByCredentials', function() {
    beforeEach(async function() {
      await pool.query('DELETE FROM accounts WHERE name=$1', ['foo']);
      await dbHelpers.createAccount('foo', 'bar');
    });

    after(async function() {
      await pool.query('DELETE FROM accounts WHERE name=$1', ['foo']);
    });

    it('finds an account that exists when given valid credentials', async function() {
      const account = await dbHelpers.getAccountByCredentials('foo', 'bar');
      assert(!account.error);
      assert(account.name);
    });

    it('errors when passed a name that doesn\'t exist', async function() {
      const account = await dbHelpers.getAccountByCredentials('fuzz', 'bar');
      assert(account.error === 'No account matches that name and password');
      assert(!account.name);
    });

    it('errors when passed the wrong password', async function() {
      const account = await dbHelpers.getAccountByCredentials('foo', 'hunter2');
      assert(account.error === 'No account matches that name and password');
      assert(!account.name);
    });
  });

  describe('getAccountByToken', function() {
    let token;
    before(async function() {
      await pool.query('DELETE FROM accounts WHERE name=$1', ['foo']);
      token = (await dbHelpers.createAccount('foo', 'bar')).token;
    });
    after(async function() {
      await pool.query('DELETE FROM accounts WHERE name=$1', ['foo']);
    });

    it('finds an account that exists when given a valid token', async function() {
      const account = await dbHelpers.getAccountByToken(token);
      assert(!account.error);
      assert(account.name === 'foo');
    });

    it('errors when passed a token that doesn\'t exist', async function() {
      const account = await dbHelpers.getAccountByToken('boop');
      assert(account.error === 'Invalid token');
      assert(!account.name);
    });
  });

  describe('addCityToAccount', function() {
    let token;
    beforeEach(async function() {
      await pool.query('DELETE FROM accounts WHERE name=$1', ['foo']);
      token = (await dbHelpers.createAccount('foo', 'bar')).token;
    });
    after(async function() {
      await pool.query('DELETE FROM accounts WHERE name=$1', ['foo']);
    });

    it('adds Vancouver and Moncton to the account\'s list of cities', async function() {
      let account = await dbHelpers.getAccountByToken(token);
      assert(account.cities.length === 0);

      const vancouver = await dbHelpers.addCityToAccount('Vancouver', token);
      assert(vancouver === 'Vancouver');
      const moncton = await dbHelpers.addCityToAccount('Moncton', token);
      assert(moncton === 'Moncton');

      account = await dbHelpers.getAccountByToken(token);
      assert(account.cities.length === 2);
      assert(account.cities.includes('Vancouver') && account.cities.includes('Moncton'));
    });
  });


  describe('deleteCityFromAccount', function() {
    let token;
    beforeEach(async function() {
      await pool.query('DELETE FROM accounts WHERE name=$1', ['foo']);
      token = (await dbHelpers.createAccount('foo', 'bar')).token;
      await dbHelpers.addCityToAccount('Vancouver', token);
      await dbHelpers.addCityToAccount('Moncton', token);
    });
    after(async function() {
      await pool.query('DELETE FROM accounts WHERE name=$1', ['foo']);
    });

    it('deletes Vancouver but keeps Moncton', async function() {
      let account = await dbHelpers.getAccountByToken(token);
      assert(account.cities.length === 2);

      const success = await dbHelpers.deleteCityFromAccount('Vancouver', token);
      assert(success);

      account = await dbHelpers.getAccountByToken(token);
      assert(account.cities.length === 1);
      assert(!account.cities.includes('Vancouver') && account.cities.includes('Moncton'));
    });
  });
});
