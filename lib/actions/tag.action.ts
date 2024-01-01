import User from "@/database/user.model";
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from "./shared.types";
import Tag from "@/database/tag.model";
import { connectToDatabase } from "../mongoose";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    const { userId } = params;

    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    return [
      { id: "1", name: "Javascript" },
      { id: "2", name: "React" },
      { id: "3", name: "NextJS" },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    // const { page = 1, pageSize = 1, filter, searchQuery } = params;
    const tags = await Tag.find({});
    return { tags };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionsByTagIdParams(
  params: GetQuestionsByTagIdParams
) {
  try {
    connectToDatabase();
    const { tagId, page = 1, pageSize = 20, searchQuery } = params;

    const tags = await Tag.findById(tagId).populate({
      path: "questions",
      options: { sort: { createdOn: -1 } },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id name clerkId picture" },
      ],
    });

    console.log(tags);

    const tagsQuestions = tags.questions;
    return { questions: tagsQuestions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getHotTags() {
  try {
    connectToDatabase();
    const tags = await Tag.aggregate([
      { $project: { name: 1, count: { $size: "$questions" } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    return { tags };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
