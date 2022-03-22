import { User } from "./UserModel";

export interface Document {
    docId:number; 
    docName:string; 
    uploadURI:string;
    size:number; 
    user:User;
}