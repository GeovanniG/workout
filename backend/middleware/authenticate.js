const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.ACCESSTOKENSECRET);
    const id = decodedToken.id;
    if (req.body.id && req.body.id !== id) {
      throw 'Invalid ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: 'User not authorized/authenticated'
    });
  }
};