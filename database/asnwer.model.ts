import { model, models, Schema, Document } from "mongoose";

export interface IAnswer extends Document {
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  content: string;
  author: Schema.Types.ObjectId;
  question: Schema.Types.ObjectId;
  cratedAt: Date;
}

const AnswerSchema = new Schema({
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ types: Schema.Types.ObjectId, ref: "User" }],
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
  createdAt: { type: Date, default: Date.now },
});

const Answer = models.Answer || model("Answer", AnswerSchema);
export default Answer;
