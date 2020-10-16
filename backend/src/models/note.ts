import { model, Schema, Document } from "mongoose";


export interface INote extends Document {
    text: string,
    complete: boolean
};

const noteSchema = new Schema({
  text: {
    type: String,
    required: true,
    
  },
  complete: {
    type: Boolean,
    required: true
  }
});


export default model<INote>("Note", noteSchema);