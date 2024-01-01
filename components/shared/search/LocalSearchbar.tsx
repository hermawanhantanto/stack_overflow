"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

interface CustomInputProps {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}

const LocalSearchbar = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: CustomInputProps) => {
  const params = new URLSearchParams();
  const router = useRouter();
  const [q, setQ] = useState("");

  const searchParams = useSearchParams();

  const handleSearch = () => {
    if (q === "") {
      if (searchParams.get("q")) {
        params.delete("q");
        const query = params.size ? "?" + params.toString() : "";
        const href = route + query;
        router.push(href);
      }
    } else {
      params.set("q", q);
      const query = params.size ? "?" + params.toString() : "";
      const href = route + query;
      router.push(href);
    }
  };

  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          alt="search icon"
          width={24}
          height={24}
          className="cursor-pointer"
          onClick={handleSearch}
        />
      )}

      <Input
        type="text"
        placeholder={placeholder}
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
        }}
        className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
        onKeyDown={handleSearch}
      />

      {iconPosition === "right" && (
        <Image
          src={imgSrc}
          alt="search icon"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearchbar;
