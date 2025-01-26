import OrderModel from '../models/order.model.js';
import UserModel from '../models/user.model.js';
import Stripe from 'stripe';
import Razorpay from 'razorpay';

// global variables
const currency = 'usd';
const deliveryCharge = 10;

// Gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: 'COD',
      payment: false,
      date: Date.now(),
    };

    const newOrder = new OrderModel(orderData);

    await newOrder.save();

    await UserModel.findByIdAndUpdate(userId, { cartData: {} });

    return res.json({ success: true, message: 'Order Placed' });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: 'Internal server error' });
  }
};

const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: 'Stripe',
      payment: false,
      date: Date.now(),
    };

    const newOrder = new OrderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: 'Delivery Charges',
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: 'payment',
    });

    return res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: 'Internal server error' });
  }
};

// verify payment stripe
const verifyPaymentStripe = async (req, res) => {
  try {
    const { orderId, success, userId } = req.body;

    if (success) {
      await Promise.all([
        OrderModel.findByIdAndUpdate(orderId, { payment: true }),
        UserModel.findByIdAndUpdate(userId, { cartData: {} }),
      ]);

      return res.json({ success: true, message: 'Payment Success' });
    } else {
      await OrderModel.findByIdAndDelete(orderId);

      return res.json({ success: false, message: 'Payment Failed' });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: 'Internal server error' });
  }
};

const placeOrderRazorpay = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: 'Internal server error' });
  }
};

const allOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({});

    return res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: 'Internal server error' });
  }
};

const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await OrderModel.find({ userId });

    return res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: 'Internal server error' });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    const order = await OrderModel.findByIdAndUpdate(orderId, { status });

    if (!order) {
      return res.json({ success: false, message: 'Order not found' });
    }

    return res.json({ success: true, message: 'Status updated' });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: 'Internal server error' });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  verifyPaymentStripe,
};
