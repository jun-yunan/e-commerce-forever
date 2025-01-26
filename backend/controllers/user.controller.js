import UserModel from '../models/user.model.js';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 });
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User doesn't exists" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.json({ success: false, message: 'Invalid credentials' });
    }

    const token = createToken(user._id);

    return res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);

    return res.json({ success: false, message: 'Internal server error' });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.json({ success: false, message: 'User already exists' });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'Invalid email address' });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: 'Password must be at least 8 characters',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    return res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);

    return res.json({ success: false, message: 'Internal server error' });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(email + password, process.env.JWT_SECRET);

    return res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);

    return res.json({ success: false, message: 'Internal server error' });
  }
};

export { loginUser, registerUser, adminLogin };
