import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [term, setTerm] = useState("");
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [suggetions, setSuggetions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (term) {
      setLoadingSearch(true);
      fetch(`https://api.npms.io/v2/search?q=${term}`)
        .then((response) => response.json())
        .then((data) => {
          // Process API response

          //   setSearchResults(data.results);
          console.log(data);
          setSuggetions(data.results);
          setLoadingSearch(false);
        })
        .catch((error) => {
          console.log("Error fetching data:", error);
          setLoadingSearch(false);
        });
    }
  }, [term]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?term=${term}`);
    setTerm("");
  };
  const onSelect = (newSelectedValue) => {
    setTerm(newSelectedValue);
    setSuggetions([]);
  };

  return (
    <div className="flex flex-col relative">
      <form onSubmit={handleSubmit}>
        <input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="bg-blue-950 lg:px-4 lg:py-3 px-2 py-2 outline-none lg:w-[20rem] w-[10rem] "
          type="text"
          placeholder="Search...."
        />
        <button className="bg-blue-950 border-l-[1px]  border-gray-500 lg:py-3 px-2 py-2  lg:pr-3 mr-2">
          Search
        </button>
      </form>
      {term && (
        <div className="absolute top-12 left-0 bg-white text-black">
          {loadingSearch
            ? "Loading....."
            : suggetions.map((suggetion) => {
                return (
                  <div
                    onClick={() => onSelect(suggetion?.package?.name)}
                    className="bg-slate-300 px-4 w-[20rem] cursor-pointer hover:opacity-75 z-50"
                  >
                    {suggetion?.package?.name}
                  </div>
                );
              })}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
