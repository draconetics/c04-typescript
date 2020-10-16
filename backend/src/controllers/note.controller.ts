import { Request, Response } from "express";
import Note, { INote } from "../models/note";

export const getNoteList = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    
  
    const notes = await Note.find({});
  
    return res.status(200).json({ notes });
  };


  export const createNote = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    
  
    const newNote = new Note(req.body);
    await newNote.save();
    return res.status(201).json(newNote);
    };