import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

type Props = {};

const Verify = (props: Props) => {
  const { token, navigate, setCartItems, backendUrl } = useContext(ShopContext);

  const [searchParams, setSearchParams] = useSearchParams();

  const success = useMemo(() => searchParams.get('success'), [searchParams]);
  const orderId = useMemo(() => searchParams.get('orderId'), [searchParams]);

  const verifyPayment = async () => {
    if (!token) return null;
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/verify-stripe`,
        { success, orderId },
        { headers: { token } },
      );

      if (response.data.success) {
        toast.success('Payment verified successfully');
        setCartItems({});
        navigate('/orders');
      } else {
        navigate('/cart');
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Payment verification failed');
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return <div>Verify</div>;
};

export default Verify;
