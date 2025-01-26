import { useContext, useEffect, useState } from 'react';
import { ProductItemType, ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

type Props = {};

const LatestCollection = (props: Props) => {
  const { products } = useContext(ShopContext);

  const [latestProducts, setLatestProducts] = useState<ProductItemType[]>([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={'LATEST'} text2={'COLLECTION'} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-500">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </p>
      </div>

      {/* {Latest Collection} */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((product) => (
          <ProductItem
            id={product._id}
            image={product.image}
            name={product.name}
            price={product.price}
            key={product._id}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
