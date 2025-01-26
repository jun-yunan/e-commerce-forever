import mongoose from 'mongoose';

const connectDb = async () => {
  mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!');
  });
  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose is disconnected!!!');
  });
  mongoose.connection.on('error', (error) => {
    console.log('Mongoose connection error: ' + error);
  });

  await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`);
};

export default connectDb;
