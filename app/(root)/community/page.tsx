import UserCard from "@/components/cards/UserCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { UserFilters } from "@/constants/filters";
import { getAllUsers } from "@/lib/actions/user.action";
import React from "react";

const Page = async () => {
  const result = await getAllUsers({});
  if (result.users.length === 0)
    return (
      <div>
        <h1 className="h1-bold text-dark300_light700">All Users</h1>
        <div className="mt-36 flex w-full flex-col items-center justify-center">
          <NoResult
            title="No users found"
            description="Try searching for something else"
            link="/"
            linkTitle="Go back home"
          />
        </div>
      </div>
    );
  return (
    <section>
      <h1 className="h1-bold text-dark300_light700">All Users</h1>
      <div className="flex w-full flex-col">
        <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
          <LocalSearchbar
            route="/community"
            iconPosition="left"
            imgSrc="/assets/icons/search.svg"
            placeholder="Search amazing minds here..."
            otherClasses="flex-1"
          />
          <Filter
            filters={UserFilters}
            otherClasses="min-h-[56px] sm:min-w-[170px]"
          />
        </div>
        <div className="mt-12 flex w-full flex-wrap gap-4">
          {result.users.map((user) => (
            <UserCard user={user} key={user._id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Page;
