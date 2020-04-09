import express from 'express';
import authRouter from './auth.js';
import { getOwmReportForCity, owmToWeatherPeek } from '../../utils.js';

const DEFAULT_CITY = 'Reykjavik';
const v1Router = express.Router();

v1Router.use(authRouter);

v1Router.get('/weather', async (req, res) => {
  const city = req.query.city || DEFAULT_CITY;
  try {
    const owmReport = await getOwmReportForCity(city);
    const weatherPeekReport = owmToWeatherPeek(owmReport);
    res.json({ ...weatherPeekReport, city });
  } catch (err) {
    res.json({
      error: "An error occurred... You'll just have to go look outside.",
    });
  }
});

export default v1Router;
