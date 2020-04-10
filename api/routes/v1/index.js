import express from 'express';
import accountsRouter from './accounts.js';
import { getReportForCity } from '../../utils.js';

const DEFAULT_CITY = 'Reykjavik';
const v1Router = express.Router();

v1Router.use(accountsRouter);

v1Router.get('/weather', async (req, res) => {
  try {
    const city = req.query.city || DEFAULT_CITY;
    const report = await getReportForCity(city);
    res.json({ ...report, city });
  } catch (err) {
    res.status(500).json({
      error: "An error occurred... You'll just have to go look outside.",
    });
  }
});

export default v1Router;
