"use client"
import React, { useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";


const GlobalResult = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState([]);
  const searchParams = useSearchParams();
  const global = searchParams.get("global");
  const type = searchParams.get("type");

  useEffect(() => {
   
    const fetchResult = async ()=> {
      setResult([]);
      setIsLoading(true);
      try {
        // fetcj all
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    }

    
  },[type,global]);
  return (
    <div className="absolute top-full z-10 mt-5 w-full rounded-xl bg-light-800 py-5 shadow-sm dark:bg-dark-400">
      <div className="flex w-full px-5">
        <p className="text-dark400_light900 body-regular px-5">Filters</p>
      </div>
      <div className="my-5 h-[1px]  bg-light-700/50" />
      <div className="flex flex-col space-y-5 px-5">
        <p className="text-dark400_light900 paragraph-semibold px-5">
          Top Match
        </p>
        {isLoading ? (
          <div className="flex-center w-full flex-col">
            <ReloadIcon className="mt-5 h-10 w-10 animate-spin text-primary-500" />
            <p className="text-dark400_light900 body-regular mt-2 px-5">
              Browse the whole of database
            </p>
          </div>
        ) : (
          <div>content</div>
        )}
      </div>
    </div>
  );
};

export default GlobalResult;
