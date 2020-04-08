import Express from 'express';
import BodyParser from 'body-parser';
import { getOwmReportForCity, owmToWeatherPeek } from './utils.js';
const App = Express();
const PORT = 8080;
const DEFAULT_CITY = 'Reykjavik';

App.use(BodyParser.urlencoded({ extended: false }));
App.use(Express.static('public'));

App.get('/v1/weather', async (req, res) => {
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

App.listen(PORT, () => {
  console.info(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
