import React from "react";
import SearchInput from "./SearchInput";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="xl:container w-[98%]  lg:w-[95%]   mx-auto">
      <div className="flex justify-between  h-[6rem] items-center">
        <Link
          to="/"
          className="lg:text-2xl text-lg font-semibold cursor-pointer lg:pl-3 pl-2"
        >
          📦 Package<span className="text-orange-600 font-bold">Zone!</span>
        </Link>
        <div className="shadow-2xl">
          <SearchInput />
        </div>
        <div className="hidden lg:flex gap-4">
          <button className="border-gray-400 border-[1px] hover:bg-orange-700 px-4 py-2 shadow-2xl ">
            SignUp
          </button>
          <button className="px-4 py-2 border-[1px] border-orange-600 bg-orange-700 hover:bg-transparent hover:border-[1px] shadow-2xl">
            SignIn
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
