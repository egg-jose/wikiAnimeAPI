import mongoose from 'mongoose';
import env from './envioroment';

mongoose.set('useCreateIndex', true);
mongoose.connect(env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default mongoose.connection;
