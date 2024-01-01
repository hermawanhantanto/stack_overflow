"use server";
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  GetUserByIdParams,
  GetUserStatsParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
  getQuestionsByUserIdParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import Answer from "@/database/answer.model";

export async function getUserById(params: any) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    connectToDatabase();
    // const {page = 1, pageSize = 20, searchQuery, filter } = params;
    const users = await User.find({}).sort({ createdAt: -1 });

    return { users };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();

    const newUser = await User.create(userData);

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();

    const { clerkId, updateData, path } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase();

    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    // Delete user from database
    // and questions, answers, comments, etc.

    // get user question ids
    // const userQuestionIds = await Question.find({ author: user._id}).distinct('_id');

    // delete user questions
    await Question.deleteMany({ author: user._id });

    // TODO: delete user answers, comments, etc.

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function saveQuestion(params: ToggleSaveQuestionParams) {
  try {
    connectToDatabase();
    const { questionId, userId, path } = params;
    const user = await User.findById(userId);
    const hasSaved = user.saved.includes(questionId);

    if (hasSaved) {
      await User.findByIdAndUpdate(
        { _id: userId },
        { $pull: { saved: questionId } }
      );
    } else {
      await User.findByIdAndUpdate(
        { _id: userId },
        { $addToSet: { saved: questionId } },
        { new: true }
      );
    }

    return revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSavedQuestions(params: GetSavedQuestionsParams) {
  try {
    connectToDatabase();
    const { clerkId } = params;
    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      options: { sort: { createdAt: -1 } },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });
    if (!user) throw new Error("User not found");
    const savedQuestions = user.saved;
    return { questions: savedQuestions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserInfo(params: GetUserByIdParams) {
  try {
    connectToDatabase();
    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    if (user) {
      const question = await Question.countDocuments({ author: user._id });
      const answer = await Answer.countDocuments({ author: user._id });

      return { user, question, answer };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserQuestions(params: getQuestionsByUserIdParams) {
  try {
    connectToDatabase();
    const { userId, page = 1, pageSize = 10 } = params;

    const questions = await Question.find({ author: userId })
      .populate({
        path: "tags",
        model: Tag,
        select: "_id name",
      })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      })
      .sort({ views: -1, upvotes: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    const total = await Question.countDocuments({ author: userId });

    return { questions, total };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserAnswers(params: GetUserStatsParams) {
  try {
    connectToDatabase();
    const { userId, page = 1, pageSize = 10 } = params;
    const total = await Answer.countDocuments({ author: userId });
    const answers = await Answer.find({ author: userId })
      .populate({
        path: "question",
        model: Question,
        select: "_id title createdAt",
      })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      })
      .sort({ upvotes: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    return { total, answers };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

