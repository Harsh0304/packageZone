import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { FaRegCopy } from "react-icons/fa";
import { LiaReadme } from "react-icons/lia";
import { SiDependencycheck } from "react-icons/si";
import { GoVersions } from "react-icons/go";
import {
  addPackageDetailData,
  clearPackageDetail,
} from "../redux/packageSlice";
import { formateDate } from "../utils/formateDate";

const PackageDetail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const param = useParams();
  const dispatch = useDispatch();
  const detailData = useSelector((state) => state.package.packageDetailData);
  console.log(detailData);

  useEffect(() => {
    if (param) {
      setIsLoading(true);
      fetch(`https://api.npms.io/v2/package/${param.name}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data?.collected);
          dispatch(clearPackageDetail());
          dispatch(addPackageDetailData(data?.collected));
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setIsLoading(false);
        });
    }
  }, [param, dispatch]);

  const handleClick = (name) => {
    const text = `npm install ${name}`;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setShowCopied(!showCopied);
      })
      .catch((error) => {
        console.error("Error copying text to clipboard:", error);
        setShowCopied(false);
      });
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="xl:w-[70%]  lg:w-[85%] w-[95%] lg:h-max h-[48rem] mx-auto ">
      <div className="flex justify-between flex-wrap items-center px-2 mt-20 pb-3">
        <Link className="flex gap-3  hover:text-orange-600 active">
          <LiaReadme className="w-6" /> Readme
        </Link>
        <Link className="flex gap-3 hover:text-orange-600 ">
          <SiDependencycheck className="w-6" /> Dependency
        </Link>
        <Link className="flex gap-3 hover:text-orange-600 ">
          <GoVersions className="w-6" /> Version
        </Link>
        <Link className="flex gap-3 hover:text-orange-600 ">
          <GoVersions className="w-6" /> Version
        </Link>
        <Link className="flex gap-3 hover:text-orange-600 ">
          <GoVersions className="w-6" /> Version
        </Link>
      </div>
      <hr />
      <div className="flex justify-between gap-8 mt-20">
        <div className="lg:w-[70%] w-[100%]">
          <h2 className="font-semibold text-4xl ">
            {detailData[0]?.metadata?.name}
          </h2>
          <p className="text-sm mt-3">
            {detailData[0]?.metadata?.version} -{" "}
            {formateDate(detailData[0]?.metadata?.date)}
          </p>
          <div className="mt-4 border-[.5px] border-gray-500"></div>
          <p className="mt-10">{detailData[0]?.metadata?.description}</p>

          <div className="mt-10">
            <h1 className="border-b-[1px] pb-3 border-gray-500">Documents</h1>
            <h3 className="mt-3">
              see{" "}
              <Link className="text-orange-500 hover:underline">
                {detailData[0]?.metadata?.links?.homepage}
              </Link>
            </h3>
          </div>
          <div className="py-6">
            <h1 className="border-b-[1px] pb-3 border-gray-500">Keywords</h1>
            <h3 className="mt-3 text-orange-500 text-xl font-bold">
              {detailData[0]?.metadata?.name}
            </h3>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div>
            <h2 className="font-bold text-xl">Install</h2>
            <div className="flex justify-between items-center gap-3 border-[1px] px-3 border-gray-400 p-2 mt-3">
              {showCopied ? (
                `text is copied...`
              ) : (
                <h3>{`npm i ${detailData[0]?.metadata?.name}`}</h3>
              )}
              <FaRegCopy
                className="w-3 cursor-pointer"
                onClick={() => handleClick(detailData[0]?.metadata?.name)}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <h2>Repository</h2>
            <Link className="border-b-[2px] text-orange-500 py-2 border-gray-500">
              {detailData[0]?.metadata?.links?.repository}
            </Link>
          </div>

          <div className="flex flex-col">
            <h2>Homepage</h2>
            <Link className="border-b-[2px] py-2 text-orange-500 border-gray-500">
              {detailData[0]?.metadata?.links?.homepage}
            </Link>
          </div>
          <div className="flex flex-col">
            <h2>⬇️ Weekly Downloads</h2>
            <p className="border-b-[2px] py-2 text-orange-500 border-gray-500">
              {detailData[0]?.github?.starsCount}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-5 ">
            <div>
              <h3>Version</h3>
              <p>{detailData[0]?.metadata?.version}</p>
            </div>
            <div>
              <h3>License</h3>
              <p>{detailData[0]?.metadata?.license}</p>
            </div>
            <div>
              <h3>Total files</h3>
              <p>20</p>
            </div>
            <div>
              <h3>Issue</h3>
              <p>{detailData[0]?.github?.issues?.openCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetail;
