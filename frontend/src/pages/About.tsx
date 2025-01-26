import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

type Props = {};

const About = (props: Props) => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1="ABOUT" text2="US" />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Forever was founded in 2021 with a simple mission: to provide high
            quality products at affordable prices. We are a team of passionate
            individuals who believe in the power of quality products and
            excellent customer service.
          </p>
          <p>
            Since our inception, we have been working tirelessly to provide our
            customers with the best products at the best prices. We are
            constantly expanding our product range to meet the needs of our
            customers.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission is to provide our customers with high quality products
            at affordable prices. We are committed to providing excellent
            customer service and ensuring that our customers are satisfied with
            their purchases.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1="WHY" text2="CHOOSE US" />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            We are committed to providing our customers with high quality
            products. All our products are made from the finest materials and
            are designed to last.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            With our user-friendly interface, you can easily browse through our
            products and place your order in just a few clicks.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Our team of customer service representatives are always ready to
            assist you with any queries or concerns you may have. We are
            committed to providing you with the best shopping experience
            possible.
          </p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default About;
