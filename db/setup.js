const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const dbParams = process.env.DATABASE_URL ? { connectionString: process.env.DATABASE_URL } : undefined;

async function blankSlate() {
  let setupPool;
  try {
    console.info(`Creating blank database "${process.env.PGDATABASE}"`);
    setupPool = await new Pool({
      database: 'postgres',
    });
    await setupPool.connect();
    await setupPool.query(`DROP DATABASE IF EXISTS ${process.env.PGDATABASE}`);
    await setupPool.query(`CREATE DATABASE ${process.env.PGDATABASE}`);
    setupPool.end();
    console.info(`Blank database "${process.env.PGDATABASE}" ready to go!`);
  } catch (err) {
    setupPool.end();
    console.error('Failure during blank slate phase:');
    throw err;
  }
}


async function buildSchema(queries) {
  if (!process.argv.includes('noclean')) {
    await blankSlate();
  }

  const pool = await new Pool(dbParams);

  try {
    for (const queryObj of queries) {
      const { label, query } = queryObj;
      try {
        await pool.query(query);
        console.info(`Query ${label} was successful!`);
      } catch (err) {
        console.error(`This query failed: ${label}`);
        console.error(`It complained about this: ${err.message}`);
      }
    }
    console.info('Done!');
    pool.end();
    process.exit();
  } catch (err) {
    console.error(err);
    pool.end();
    process.exit();
  }
}

const createAccountsQuery = `
  CREATE TABLE IF NOT EXISTS accounts (
    id serial PRIMARY KEY,
    name text UNIQUE NOT NULL,
    password_digest text NOT NULL
  );
`;

const createTokensQuery = `
  CREATE TABLE IF NOT EXISTS tokens (
    id serial PRIMARY KEY,
    account_id integer REFERENCES accounts ON DELETE CASCADE,
    token text NOT NULL
  );
`;

const createCityFavoritesQuery = `
  CREATE TABLE IF NOT EXISTS city_favorites (
    id serial PRIMARY KEY,
    account_id integer REFERENCES accounts ON DELETE CASCADE,
    city text NOT NULL
  );
`;

const queries = [
  { label: 'createAccounts', query: createAccountsQuery },
  { label: 'createTokens', query: createTokensQuery },
  { label: 'createCityFavorites', query: createCityFavoritesQuery },
];


buildSchema(queries);
