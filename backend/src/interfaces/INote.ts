import {Document} from 'mongoose'
export interface INote extends Document{
    text: string,
    complete: boolean
}

export interface INoteValidator {
    text?: any,
    complete?: any
}