import mongoose from 'mongoose';
//MongoDB Schema for the characters
const characterSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  specialAttacks: {
    type: [{ type: String }],
  },
  birthday: {
    type: String,
  },
  status: {
    type: String,
  },
  anime: {
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Anime' },
  },
});

const Character = mongoose.model('Character', characterSchema);
export default Character;
