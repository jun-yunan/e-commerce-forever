import UserModel from '../models/user.model.js';

const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    const userData = await UserModel.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: 'User not found' });
    }

    let cartData = await userData.cartData;

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await UserModel.findByIdAndUpdate(userId, { cartData });

    return res.json({ success: true, message: 'Item added to cart' });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: 'Internal server error' });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    const userData = await UserModel.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: 'User not found' });
    }

    let cartData = await userData.cartData;

    cartData[itemId][size] = quantity;

    await UserModel.findByIdAndUpdate(userId, { cartData });

    return res.json({ success: true, message: 'Cart updated' });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: 'Internal server error' });
  }
};

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await UserModel.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: 'User not found' });
    }

    let cartData = await userData.cartData;

    return res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: 'Internal server error' });
  }
};

export { addToCart, updateCart, getUserCart };
