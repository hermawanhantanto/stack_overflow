import { getQuestions } from "@/lib/actions/question.action";


export async function fetchQuestion(searchQuery: string) {
  try {
    const { questions } = await getQuestions({
      searchQuery,
    });

    return questions;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
