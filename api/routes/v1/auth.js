import express from 'express';
import dbHelpers from '../../dbHelpers.js';

const router = express.Router();

router.post('/accounts', async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.json({ error: 'Must provide name and password fields to create an account.' });
  }

  const account = await dbHelpers.createAccount(name, password);

  return res.json(account);
});

router.get('/accounts/:token', async (req, res) => {
  const { token } = req.params;
  const account = await dbHelpers.getAccountByToken(token);
  return res.json(account);
});

export default router;
