import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mx-auto flex w-full lg:h-[30rem] h-[52rem] justify-center items-center">
      <div className="text-center">
        <h1 className="text-6xl w-[70%] mx-auto leading-[1] font-semibold">
          Take your JavaScript development{" "}
          <span className="text-orange-600 font-bold">up a notch</span>
        </h1>
        <p className="w-[60%] mx-auto mt-8 text-lg text-gray-300">
          Get started today for free, or step up to npm Pro to enjoy a premium
          JavaScript development experience, with features like private
          packages.
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <Link className="px-6 py-3 border-[1px] shadow-2xl hover:bg-transparent hover:border-[2px]  border-orange-700 bg-orange-700 rounded-full">
            SignUp Free
          </Link>
          <Link className="px-5 py-3 border-[1px] shadow-2xl rounded-full hover:bg-orange-700">
            Learn About Pro
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
