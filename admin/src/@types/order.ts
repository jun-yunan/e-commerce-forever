import { ProductType } from './product';

export type Address = {
  city: string;
  country: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  state: string;
  street: string;
  zipcode: string;
};

export type OrderType = {
  _id: string;
  address: Address;
  amount: number;
  date: number;
  items: ProductType[];
  payment: boolean;
  status: string;
  paymentMethod: string;
  userId: string;
};
