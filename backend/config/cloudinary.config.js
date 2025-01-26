import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';

const connectCloudinary = async () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    console.log('Cloudinary is connected!!!');
  } catch (error) {
    console.log('Cloudinary connection error: ' + error);
  }
};

export default connectCloudinary;
