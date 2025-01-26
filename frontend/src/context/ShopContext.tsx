import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
// import { products } from '../assets/assets';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Định nghĩa kiểu dữ liệu cho một sản phẩm
export type ProductItemType = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  category: string;
  subCategory: string;
  sizes: string[];
  size?: string;
  paymentMethod?: string;
  quantity?: number;
  status?: string;
  date: number;
  bestseller: boolean;
};

// Định nghĩa kiểu dữ liệu cho context
type StoreShop = {
  products: ProductItemType[]; // products là một mảng các sản phẩm
  currency: string;
  delivery_fee: number;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  addToCart: (itemId: string, size: string) => void;
  cartItems: {
    [itemId: string]: { [size: string]: number };
  };
  setCartItems: React.Dispatch<
    React.SetStateAction<{
      [itemId: string]: {
        [size: string]: number;
      };
    }>
  >;
  getCartCount: () => number;
  updateQuantity: (itemId: string, size: string, quantity: number) => void;
  getCartAmount: () => number;
  navigate: NavigateFunction;
  backendUrl: string;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
};

const defaultContextValue: StoreShop = {
  products: [],
  currency: '$',
  delivery_fee: 10,
  search: '',
  setSearch: () => {},
  showSearch: true,
  setShowSearch: () => {},
  addToCart: () => {},
  cartItems: {},
  setCartItems: () => {},
  getCartCount: () => 0,
  updateQuantity: () => {},
  getCartAmount: () => 0,
  navigate: () => {},
  backendUrl: '',
  token: '',
  setToken: () => {},
};

type CartItemType = {
  itemId: string;
  size: string;
};

export const ShopContext = createContext<StoreShop>(defaultContextValue);

type Props = {
  children: React.ReactNode;
};

const ShopContextProvider = ({ children }: Props) => {
  const currency = '$';
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState<string>('');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<{
    [itemId: string]: { [size: string]: number };
  }>({});
  const [products, setProducts] = useState<ProductItemType[]>([]);
  const [token, setToken] = useState<string>('');
  const navigate = useNavigate();

  const addToCart = async (
    itemId: CartItemType['itemId'],
    size: CartItemType['size'],
  ) => {
    if (!size) {
      toast.error('Select Product Size');
      return;
    }

    const cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = { [size]: 1 };
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size },
          { headers: { token } },
        );
      } catch (error) {
        console.log(error);
        toast.error('Failed to add to cart');
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.error(error);
        }
      }
    }

    return totalCount;
  };

  const updateQuantity = async (
    itemId: string,
    size: string,
    quantity: number,
  ) => {
    const cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, size, quantity },
          { headers: { token } },
        );
      } catch (error) {
        console.log(error);
        toast.error('Failed to update cart');
      }
    }
  };

  const getUserCart = async (token: string) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { token } },
      );

      if (response.status === 200 && response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch cart items');
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      const itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0 && itemInfo) {
            totalAmount += itemInfo?.price * cartItems[items][item];
          }
        } catch (error) {
          console.error(error);
        }
      }
    }

    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);

      if (response.status === 200 && response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch products');
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token') as string);
      getUserCart(localStorage.getItem('token') as string);
    }
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    addToCart,
    cartItems,
    setCartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
