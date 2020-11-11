import jwt from 'jsonwebtoken';
import env from '../config/envioroment';
import User from '../components/users/model';

const auth = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, env.TOKEN_SECRET);
    req.user = verified;
    const user = await User.findById(req.user);
    req.admin = user.admin;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};

export default auth;
