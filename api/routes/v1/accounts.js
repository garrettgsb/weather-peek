import express from 'express';
import dbHelpers from '../../dbHelpers.js';
import { cityNamesToReports } from '../../utils.js';

const router = express.Router();

/* Get token from credentials */
router.post('/authenticate', async (req, res, next) => {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      return res.json({ error: 'Must provide name and password fields to create an account.' });
    }
    const account = await dbHelpers.getAccountByCredentials(name, password);
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

    account.cities = await cityNamesToReports(account.cities);

    return res.json(account);
  } catch (err) {
    next(err);
  }
});

/* Add city-favorite to account */
router.post('/accounts/:token/cities', async (req, res, next) => {
  try {
    const { token } = req.params;
    const { city } = req.body;
    const persistedCity = await dbHelpers.addCityToAccount(city, token);
    res.json({ city: persistedCity, message: 'City added successfully' });
  } catch (err) {
    next(err);
  }
});

/* Remove city-favorite fom account */
router.post('/accounts/:token/cities/:city/delete', async (req, res, next) => {
  try {
    const { token, city } = req.params;
    const success = await dbHelpers.deleteCityFromAccount(city, token);
    if (!success) throw new Error('Could not delete city from account');
    res.json({ message: 'City successfully deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;
