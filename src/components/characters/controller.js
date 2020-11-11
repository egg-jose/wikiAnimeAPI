import Character from './model';
import Anime from '../animes/model';
import Joi from 'joi';

const validateData = (data, update = false) => {
  if (!update) {
    return Joi.object({
      name: Joi.string().required(),
      status: Joi.string().required(),
      birthday: Joi.string(),
      anime: Joi.string().required(),
      specialAttacks: Joi.array(),
    }).validate(data);
  } else {
    return Joi.object({
      name: Joi.string(),
      status: Joi.string(),
      birthday: Joi.string(),
      anime: Joi.string(),
      specialAttacks: Joi.array(),
    }).validate(data);
  }
};

const create = async (req, res) => {
  const { error } = validateData(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (!req.admin) return res.status(401).send('Access denied');

  const character = new Character(req.body);
  try {
    Anime.findById(req.body.anime).then(async anime => {
      const savedCharacter = await character.save();
      anime.characters.push(savedCharacter);
      anime
        .save()
        .then(() => {
          res.send(savedCharacter);
        })
        .catch(err => {
          res.status(500).send({ error: `Error saving character ${err}` });
        });
    });
  } catch (err) {
    res.status(400).send({ error: `Error finding anime id ${err}` });
  }
};

const index = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = req.query.limit ? parseInt(req.query.limit) : 5;
  const order = req.query.order;

  const sort = order == 'desc' ? -1 : 1;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  if (page > 1) {
    results.preview = {
      page: page - 1,
      limit: limit,
    };
  }

  if (endIndex < (await Character.countDocuments().exec())) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }
  try {
    results.results = await Character.find({}, null, { sort: { name: sort } })
      .limit(limit)
      .skip(startIndex)
      .exec();
    res.send(results);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const find = async (req, res) => {
  const results = {};
  try {
    results.results = await Character.findById(req.params.id).exec();
    res.send(results);
  } catch (err) {
    res.status(404).send({ error: err });
  }
};

const update = async (req, res) => {
  const { error } = validateData(req.body, true);
  if (error) return res.status(400).send(error.details[0].message);

  if (!req.admin) return res.status(401).send('Access denied');

  const results = {};

  try {
    results.results = await Character.findByIdAndUpdate(
      req.params.id,
      req.body
    ).exec();
    res.status(202).send(results);
  } catch (err) {
    res.status(404).send({ error: err });
  }
};

const destroy = async (req, res) => {
  if (!req.admin) return res.status(401).send('Access denied');

  const results = {};

  try {
    results.results = await Character.findByIdAndRemove(req.params.id);
    res.status(202).send(results);
  } catch (err) {
    res.status(404).send({ error: err });
  }
};

export { create, index, find, update, destroy };
