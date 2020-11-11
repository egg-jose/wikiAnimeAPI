import mongoose from 'mongoose';
//MongoDB Schema for the categories
const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: [true, 'Name must be unique'],
  },
  description: {
    type: String,
  },
});

const Category = mongoose.model('Category', categorySchema);
export default Category;
