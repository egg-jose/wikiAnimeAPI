import { create, index, find, update, destroy } from './controller';
import express from 'express';
const router = express.Router();

router.route('/').post(create).get(index);

router.route('/:id').get(find).put(update).delete(destroy);

export default router;
