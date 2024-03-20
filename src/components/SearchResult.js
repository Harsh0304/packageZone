import { Link, useNavigate } from "react-router-dom";

const SearchResult = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = (name) => {
    navigate(`/package/${name}`);
  };
  return (
    <div className="lg:w-[70%] w-[85%] mx-auto hover:opacity-80 cursor-pointer bg-stone-700 rounded-lg flex justify-between items-center px-9 py-5">
      <div className=" flex flex-col gap-4 overflow-x-hidden ">
        <Link
          onClick={() => handleClick(item.package.name)}
          className="text-blue-400 hover:underline cursor-pointer font-bold text-xl"
        >
          {item.package.name}
        </Link>
        <p>{item.package.description}</p>
        <div className="flex gap-4 w-max">
          {item?.package?.keywords?.map((keyboard) => {
            return (
              <p className="bg-stone-800 rounded-lg px-2 py-2" key={keyboard}>
                {keyboard}
              </p>
            );
          })}
        </div>
      </div>
      <button
        className="bg-black px-3 py-2"
        onClick={() => handleClick(item.package.name)}
      >
        View
      </button>
    </div>
  );
};

export default SearchResult;
