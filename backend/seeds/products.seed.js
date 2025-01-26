import connectDb from '../config/mongodb.config.js';
import { products as ProductsIncludeId } from '../seeds/data/products/assets.js';
import ProductModel from '../models/product.model.js';
import 'dotenv/config';
import connectCloudinary from '../config/cloudinary.config.js';
import { v2 as cloudinary } from 'cloudinary';
const productsSeed = async () => {
  const products = ProductsIncludeId.map(({ _id, ...rest }) => rest);
  try {
    await connectDb();
    connectCloudinary();

    await ProductModel.deleteMany({});
    console.log('All products deleted');

    // Duyệt qua từng sản phẩm và upload ảnh lên Cloudinary
    for (const product of products) {
      const uploadedImages = [];

      // Duyệt qua từng ảnh trong mảng `image` của sản phẩm
      for (const imagePath of product.image) {
        // Upload ảnh lên Cloudinary
        const { secure_url } = await cloudinary.uploader.upload(
          `${process.cwd()}/seeds/data/products/${imagePath.slice(2)}`,
          {
            folder: 'e-commerce',
          },
        );

        // Lưu URL ảnh vào mảng
        uploadedImages.push(secure_url);
      }

      // Cập nhật mảng `image` của sản phẩm với URL từ Cloudinary
      product.image = uploadedImages;
    }

    // Thêm tất cả sản phẩm vào MongoDB
    await ProductModel.insertMany(products);
    console.log('Products added successfully');

    // Kết thúc script
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

// Chạy script seed
productsSeed();
