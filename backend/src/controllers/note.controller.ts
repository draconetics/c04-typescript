import {NextFunction, Request, Response } from "express";
import Note from "../models/note";

import {INote} from '../interfaces/INote'
import {INotes} from '../interfaces/INotes'
import {HttpException} from '../common/HttpException'
import { validate, validateParamId } from "./utils/note.utils";
import mongoose from 'mongoose';

export const getNoteList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
  
    try{
        const notes:INotes = await Note.find({});
        let resp = {
          status: 200,
          message: "success",
          data: notes
        }
        res.status(200).json(resp);
    }catch(e){
        next(new HttpException(e.status,e.message));
    } 
    
  };


  export const createNote = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
      try{
        validate(req.body)
        const newNote:INote = new Note(req.body);
        await newNote.save();
        res.status(201).json({status:201,message:"success",data:newNote});
      }catch(e){
        //console.log("this is the catcher")
        //console.log(e)
        next(new HttpException(e.status,e.message));
      }
  };


  export const getNoteById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
      try{
        validateParamId(req.params.id,next)
        let id = mongoose.Types.ObjectId(req.params.id);
        const noteFound:INote|null = await Note.findOne({_id: id})
        if(noteFound)
            res.status(200).json({status:200, message:"success", data:noteFound});
        next(new HttpException(500,"Note not Found"));
      }catch(e){
        //console.log("this is the catcher")
        //console.log(e)
        next(new HttpException(e.status,e.message));
      }
  };


  export const deleteNoteById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
      try{
        validateParamId(req.params.id,next)
        let id = mongoose.Types.ObjectId(req.params.id);
        const noteFound:INote|null = await Note.findByIdAndRemove(id)
        //console.log(noteFound)
        if(noteFound)
            res.status(200).json({status:200, message:"success", data:noteFound});
        next(new HttpException(500,"Not found element to delete"));
      }catch(e){
        //console.log("this is the catcher")
        //console.log(e)
        next(new HttpException(e.status,e.message));
      }
  };