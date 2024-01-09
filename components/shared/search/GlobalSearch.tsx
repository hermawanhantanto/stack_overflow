"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQueryParams, removeUrlQueryParams } from "@/lib/utils";
import GlobalResult from "./GlobalResult";

const GlobalSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("global");
  const [search, setSearch] = useState(query || "");
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const debounce = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQueryParams({
          params: searchParams.toString(),
          key: "global",
          value: search,
        });
        router.push(newUrl, { scroll: false });
      } else {
        const newUrl = removeUrlQueryParams({
          params: searchParams.toString(),
          keysToRemove: ["global", "type"],
        });
        router.push(newUrl, { scroll: false });
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [query, search, router, pathname, searchParams]);

  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />

        <Input
          type="text"
          placeholder="Search globally"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsOpen(!!search);
          }}
          className="paragraph-regular text-dark400_light700 no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
        />
      </div>
      {isOpen && search && <GlobalResult />}
    </div>
  );
};

export default GlobalSearch;
