import express from 'express';
import env from './config/envioroment';
import auth from './middlewares/auth';

import db from './config/database';

//import routes
import animesRoutes from './components/animes/routes';
import categoriesRoutes from './components/categories/routes';
import charactersRoutes from './components/characters/routes';
import usersRoutes from './components/users/routes';

const app = express();

//Connect to database
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

//Middleware
app.use(express.json());

//Routes
app.use('/', usersRoutes);
app.use(auth);

app.use('/anime', animesRoutes);
app.use('/category', categoriesRoutes);
app.use('/character', charactersRoutes);

//Start API
const port = env.PORT || 3000;
app.listen(port, () => console.log(`http://localhost:${port}`));
