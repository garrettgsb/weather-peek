import express from 'express';
import dbHelpers from '../../dbHelpers.js';

const router = express.Router();

/* Get token from credentials */
router.post('/authenticate', async (req, res, next) => {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      return res.json({ error: 'Must provide name and password fields to create an account.' });
    }
    const account = await dbHelpers.getAccountByCredentials(name, password);
    if (account.tokens.length) {
      return res.json({ token: account.tokens[0] });
    }

    return res.json(account);
  } catch (err) {
    next(err);
  }
});


/* Create account */
router.post('/accounts', async (req, res, next) => {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      return res.json({ error: 'Must provide name and password fields to create an account.' });
    }

    const account = await dbHelpers.createAccount(name, password);

    return res.json(account);
  } catch (err) {
    next(err);
  }
});

/* Get account by token */
router.get('/accounts/:token', async (req, res, next) => {
  try {
    const { token } = req.params;
    const account = await dbHelpers.getAccountByToken(token);
    return res.json(account);
  } catch (err) {
    next(err);
  }
});

/* Add city-favorite to account */
router.post('/accounts/:token/cities/:city', async (req, res, next) => {
  try {
    const { token, city } = req.params;
    const persistedCity = await dbHelpers.addCityToAccount(city, token);
    res.json({ city: persistedCity });
  } catch (err) {
    next(err);
  }
});

/* Remove city-favorite fom account */
router.post('/accounts/:token/cities/:city/delete', async (req, res, next) => {
  try {
    const { token, city } = req.params;
    const success = await dbHelpers.deleteCityFromAccount(city, token);
    res.json({ success });
  } catch (err) {
    next(err);
  }
});

export default router;
