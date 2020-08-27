import { Document } from "mongoose";

export interface ITodo extends Document {
  name: string;
  desctiption: string;
  status: boolean;
}
