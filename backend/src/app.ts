import express from 'express'
import cors from 'cors';
import morgan from 'morgan';
import noteRoutes from './routes/note.routes';
import {errorHandler} from './middleware/error.middleware'
import {notFoundHandler} from './middleware/notFound.middleware'

const app = express();

// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.use(noteRoutes);

app.get('/', (req, res) => {
  return res.send(`The API is at http://localhost:${app.get('port')}`);
})

app.use(errorHandler);
app.use(notFoundHandler);

const {PORT} = require('./config/portConfig')
const db = require('./config/db')
db.connect()
  .then(() => {
    console.log('database connected..')
    app.listen(PORT, () => {
      console.log(`Listening on http://localhost:${PORT} with typescript`);
    });
  });

module.exports = app;