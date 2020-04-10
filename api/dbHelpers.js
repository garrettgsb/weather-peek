import pg from 'pg';
import uuid from 'uuid';

const dbHelpers = () => {
  const dbParams = process.env.DATABASE_URL ? { connectionString: process.env.DATABASE_URL } : undefined;
  const pool = new pg.Pool(dbParams);
  pool.connect();
  return {
    createAccount: async (name, password) => {
      try {
        const account = (await pool.query(`
          INSERT INTO accounts
          (name, password_digest)
          VALUES ($1, md5($2))
          RETURNING id, name`,
          [name, password]
        )).rows[0];

        if (!account) throw new Error('Account was not created!');

        const token = (await pool.query(`
          INSERT INTO tokens
          (account_id, token)
          VALUES ($1, $2)
          RETURNING token
          `,
          [account.id, generateToken()]
        )).rows[0];

        return {
          name: account.name,
          token: token.token,
        };
      } catch (err) {
        return {
          error: 'Account was not created!',
        }
      }
    },

    getAccountByCredentials: async (name, password) => {
      const account = (await pool.query(`
        SELECT
          a.name,
          array_remove(array_agg(t.token), NULL) as tokens,
          array_remove(array_agg(c.city), NULL) as cities
        FROM accounts AS a
        LEFT JOIN tokens AS t
        ON t.account_id = a.id
        LEFT JOIN city_favorites AS c
        ON a.id = c.account_id
        WHERE a.name=$1
        AND a.password_digest=md5($2)
        GROUP BY a.id;
      `, [name, password])).rows[0];

      if (!account) return { error: 'No account matches that name and password' };
      return account;
    },

    getAccountByToken: async (token) => {
      const account = (await pool.query(`
        SELECT
          a.name,
          t.token,
          array_remove(array_agg(c.city), NULL) as cities
        FROM accounts AS a
        LEFT JOIN tokens AS t
        ON t.account_id = a.id
        LEFT JOIN city_favorites AS c
        ON a.id = c.account_id
        WHERE t.token=$1
        GROUP BY t.token, a.name;
      `, [token])).rows[0];

      if (!account) return { error: 'Invalid token' };
      return account;
    },

    addCityToAccount: async (city, token) => {
        const persistedCity = (await pool.query(`
          INSERT INTO city_favorites
          (city, account_id)
          VALUES
          ($1, (
              SELECT a.id
              FROM accounts AS a
              JOIN tokens AS t
              ON a.id=t.account_id
              WHERE t.token=$2
            )
          )
          RETURNING city;
          `,
          [city, token]
        )).rows[0].city;

        return persistedCity;
    },

    deleteCityFromAccount: async (token, city) => {
      await pool.query(`
        DELETE FROM city_favorites
        WHERE city ilike $1
        AND account_id=(
          SELECT a.id
          FROM accounts AS a
          JOIN tokens AS t
          ON a.id=t.account_id
          WHERE t.token=$2
        )`,
        [token, city]
      );
      return true;
    },
  };
};

function generateToken() {
  return uuid.v4();
}

export default dbHelpers();
