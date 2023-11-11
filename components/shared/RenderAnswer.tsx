import { getTimestamp } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  _id: string;
  answer: string;
  createdAt: Date;
  upvotes: number;
  downvotes: number;
  author: {
    clerkId: string;
    name: string;
    picture: string;
  };
}

const RenderAnswer = ({
  _id,
  answer,
  createdAt,
  upvotes,
  downvotes,
  author,
}: Props) => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col-reverse justify-between gap-2 sm:flex-row sm:items-center">
        <Link
          href={`/profile/${author.clerkId}`}
          className="flex items-center gap-2"
        >
          <Image
            src={author.picture}
            width={22}
            height={22}
            className="rounded-full"
            alt="user"
          />
          <div className="flex max-sm:flex-col sm:items-center sm:gap-2">
            <p className="paragraph-semibold text-dark300_light700">
              {author.name}
            </p>
            <span className="small-regular text-light-500">{`answered ${getTimestamp(
              createdAt
            )}`}</span>
          </div>
        </Link>
        <div className="self-end">voting</div>
      </div>
      <p className="paragraph-regular text-dark200_light800 mb-8 mt-4">
        {answer}
      </p>
      <hr className="dark:bg-light-400" />
    </div>
  );
};

export default RenderAnswer;
