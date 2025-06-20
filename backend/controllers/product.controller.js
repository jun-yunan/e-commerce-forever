import { v2 as cloudinary } from 'cloudinary';
import ProductModel from '../models/product.model.js';

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (image) => image !== undefined,
    );

    let imagesUrl = await Promise.all(
      images.map(async (image) => {
        let result = await cloudinary.uploader.upload(image.path, {
          resource_type: 'image',
          folder: 'products',
        });
        return result.secure_url;
      }),
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === 'true' ? true : false,
      image: imagesUrl,
      date: Date.now(),
    };

    const product = new ProductModel(productData);
    await product.save();

    return res.json({ success: true, message: 'Product Added' });
  } catch (error) {
    console.log(error);

    return res.json({ success: false, message: 'Internal server error' });
  }
};

const listProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();

    return res.json({ success: true, products });
  } catch (error) {
    console.log(error);

    return res.json({ success: false, message: 'Internal server error' });
  }
};

const removeProduct = async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.body.id);
    return res.json({ success: true, message: 'Product Removed' });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: 'Internal server error' });
  }
};

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.json({ success: false, message: 'Product not found' });
    }

    return res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: 'Internal server error' });
  }
};

const updateProduct = async (req, res) => {};

export {
  addProduct,
  listProducts,
  removeProduct,
  updateProduct,
  singleProduct,
};
