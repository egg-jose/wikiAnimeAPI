import mongoose from 'mongoose';
//MongoDB Schema for the animes
const animeSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  description: {
    type: String,
  },
  amountOfEpisodes: {
    type: Number,
    required: [true, 'Amount of episodes is required'],
  },
  finished: {
    type: Boolean,
    default: false,
  },
  characters: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }],
  },
  categories: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  },
});

const Anime = mongoose.model('Anime', animeSchema);
export default Anime;
