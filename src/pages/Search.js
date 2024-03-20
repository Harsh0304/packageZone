import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchResult from "../components/SearchResult";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { addPackage, clearPackage } from "../redux/packageSlice";

const Search = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const newData = useSelector((state) => state.package.packageData);
  console.log(newData);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("term");
    if (query) {
      setIsLoading(true);
      fetch(`https://api.npms.io/v2/search?q=${query}`)
        .then((response) => response.json())
        .then((data) => {
          // Process API response
          dispatch(clearPackage());
          dispatch(addPackage(data.results));
          //   setSearchResults(data.results);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setIsLoading(false);
        });
    }
  }, [location.search, dispatch]);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="flex flex-col gap-6 mt-10">
      <h3 className="self-center text-2xl">
        {newData.length} package founds...
      </h3>
      {newData?.map((item) => {
        return <SearchResult key={item.package.name} item={item} />;
      })}
    </div>
  );
};

export default Search;
