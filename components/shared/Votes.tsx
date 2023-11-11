"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import {
  downvoteQuestion,
  upvoteQuestion,
} from "@/lib/actions/question.action";
import { usePathname } from "next/navigation";

interface Props {
  type: string;
  itemId: string;
  userId: string;
  upvotes: number;
  downvotes: number;
  hasUpVoted: boolean;
  hasDownVoted: boolean;
  hasSaved?: boolean;
}

const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  downvotes,
  hasUpVoted,
  hasDownVoted,
  hasSaved,
}: Props) => {
  const pathname = usePathname();
  const handleSave = () => {
    console.log("save");
  };
  const handleVote = async (action: string) => {
    try {
      if (action === "upvote") {
        await upvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted: hasUpVoted,
          hasdownVoted: hasDownVoted,
          path: pathname,
        });
      }
      if (action === "downvote") {
        await downvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted: hasUpVoted,
          hasdownVoted: hasDownVoted,
          path: pathname,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center gap-2">
      <Button
        className="flex items-center gap-1.5 p-1"
        onClick={() => handleVote("upvote")}
      >
        {hasUpVoted ? (
          <Image
            src="/assets/icons/upvoted.svg"
            width={22}
            height={22}
            alt="upvoted"
          />
        ) : (
          <Image
            src="/assets/icons/upvote.svg"
            width={22}
            height={22}
            alt="upvote"
          />
        )}
        <span className="subtle-medium text-dark400_light700 bg-light-700 p-1">
          {upvotes}
        </span>
      </Button>
      <Button
        className="flex items-center gap-1.5 p-1"
        onClick={() => handleVote("downvote")}
      >
        {hasDownVoted ? (
          <Image
            src="/assets/icons/downvoted.svg"
            width={22}
            height={22}
            alt="downvoted"
            className="object-contain"
          />
        ) : (
          <Image
            src="/assets/icons/downvote.svg"
            width={22}
            height={22}
            alt="downvote"
            className="object-contain"
          />
        )}
        <span className="subtle-medium text-dark400_light700 bg-light-700 p-1">
          {downvotes}
        </span>
      </Button>
      {type === "question" && (
        <Image
          src={`/assets/icons/${hasSaved ? `star-filled.svg` : `star-red.svg`}`}
          width={22}
          height={22}
          alt="save"
          className="ml-2 cursor-pointer object-contain"
          onClick={() => handleSave()}
        />
      )}
    </div>
  );
};

export default Votes;
