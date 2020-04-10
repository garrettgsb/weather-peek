import Express from 'express';
import BodyParser from 'body-parser';
import path from 'path';
import v1Router from './routes/v1/index.js';

const App = Express();
const PORT = 8080;

App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static(path.join(path.resolve(), 'build')));

App.get('/', (req, res) => res.sendFile(path.join(path.resolve(), 'build', 'index.html')));
App.use('/v1', v1Router);

App.use((req, res) => { res.status(404).json({ error: 'Invalid route' }); });
App.use((error, req, res) => res.status(500).json({ error: 'Something terrible happened' }));

App.listen(PORT, () => {
  console.info(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
