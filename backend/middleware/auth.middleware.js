import jwt from 'jsonwebtoken';

const authUserMiddleware = (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({ success: false, message: 'Unauthorized ' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.body.userId = decoded.id;

    next();
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: 'Authentication failed' });
  }
};

export default authUserMiddleware;
