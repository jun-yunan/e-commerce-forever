import { useState } from 'react';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';
import { backendUrl } from '../App';

type Props = {
  token: string;
};

const Add = ({ token }: Props) => {
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [image3, setImage3] = useState<File | null>(null);
  const [image4, setImage4] = useState<File | null>(null);

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [category, setCategory] = useState<'Men' | 'Women' | 'Kids'>('Men');
  const [subCategory, setSubCategory] = useState<
    'Topwear' | 'Bottomwear' | 'Winterwear'
  >('Topwear');
  const [bestseller, setBestseller] = useState<boolean>(false);
  const [sizes, setSizes] = useState<string[]>([]);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('bestseller', JSON.stringify(bestseller));
      formData.append('sizes', JSON.stringify(sizes));

      if (image1) {
        formData.append('image1', image1);
      }
      if (image2) {
        formData.append('image2', image2);
      }
      if (image3) {
        formData.append('image3', image3);
      }
      if (image4) {
        formData.append('image4', image4);
      }

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        { headers: { token } },
      );

      if (response.data.success) {
        toast.success('Product added successfully.');
        setName('');
        setDescription('');
        setPrice('');
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={image1 ? URL.createObjectURL(image1) : assets.upload_area}
              alt=""
            />
            <input
              hidden
              type="file"
              onChange={(e) => setImage1(e.target.files![0])}
              accept="image/*"
              id="image1"
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20"
              src={image2 ? URL.createObjectURL(image2) : assets.upload_area}
              alt=""
            />
            <input
              hidden
              type="file"
              onChange={(e) => setImage2(e.target.files![0])}
              accept="image/*"
              id="image2"
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20"
              src={image3 ? URL.createObjectURL(image3) : assets.upload_area}
              alt=""
            />
            <input
              hidden
              type="file"
              onChange={(e) => setImage3(e.target.files![0])}
              accept="image/*"
              id="image3"
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20"
              src={image4 ? URL.createObjectURL(image4) : assets.upload_area}
              alt=""
            />
            <input
              hidden
              type="file"
              onChange={(e) => setImage4(e.target.files![0])}
              accept="image/*"
              id="image4"
            />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here..."
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="Write here..."
          required
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product category</p>
          <select
            onChange={(e) =>
              setCategory(e.target.value as 'Men' | 'Women' | 'Kids')
            }
            className="w-full px-3 py-2"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Sub category</p>
          <select
            onChange={(e) =>
              setSubCategory(
                e.target.value as 'Topwear' | 'Bottomwear' | 'Winterwear',
              )
            }
            className="w-full px-3 py-2"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="25"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>
      </div>

      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes('S')
                  ? prev.filter((size) => size !== 'S')
                  : [...prev, 'S'],
              )
            }
          >
            <p
              className={`${
                sizes.includes('S') ? 'bg-pink-100' : 'bg-slate-200'
              } px-3 py-1 cursor-pointer`}
            >
              S
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes('M')
                  ? prev.filter((size) => size !== 'M')
                  : [...prev, 'M'],
              )
            }
          >
            <p
              className={`${
                sizes.includes('M') ? 'bg-pink-100' : 'bg-slate-200'
              } px-3 py-1 cursor-pointer`}
            >
              M
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes('L')
                  ? prev.filter((size) => size !== 'L')
                  : [...prev, 'L'],
              )
            }
          >
            <p
              className={`${
                sizes.includes('L') ? 'bg-pink-100' : 'bg-slate-200'
              } px-3 py-1 cursor-pointer`}
            >
              L
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes('XL')
                  ? prev.filter((size) => size !== 'XL')
                  : [...prev, 'XL'],
              )
            }
          >
            <p
              className={`${
                sizes.includes('XL') ? 'bg-pink-100' : 'bg-slate-200'
              } px-3 py-1 cursor-pointer`}
            >
              XL
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes('XXL')
                  ? prev.filter((size) => size !== 'XXL')
                  : [...prev, 'XXL'],
              )
            }
          >
            <p
              className={`${
                sizes.includes('XXL') ? 'bg-pink-100' : 'bg-slate-200'
              } px-3 py-1 cursor-pointer`}
            >
              XXL
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          onChange={(e) => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>

      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
        ADD
      </button>
    </form>
  );
};

export default Add;
