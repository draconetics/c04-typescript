import mongoose from "mongoose";
import {INote} from '../interfaces/INote'

const noteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    
  },
  complete: {
    type: Boolean,
    required: true
  }
},{  timestamps: true });


export = mongoose.model<INote>("Note", noteSchema);
