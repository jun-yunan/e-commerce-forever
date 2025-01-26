import jwt from 'jsonwebtoken';

const adminAuthMiddleware = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({ success: false, message: 'Unauthorized' });
    }

    const token_decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (
      token_decoded !==
      process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD
    ) {
      return res.json({ success: false, message: 'Unauthorized' });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: 'Internal server error' });
  }
};

export default adminAuthMiddleware;
