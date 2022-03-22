import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Document } from "../model/DocumentModel";



@Injectable({providedIn:"root"})
export class DocumentService{
    constructor(private http:HttpClient){ }
   
    getAllDocuments():Observable<Document[]> {
        let host = environment.host; 
        return this.http.get<Document[]>(host + "/document") ;
    }

    getUserDocuments(id:number):Observable<Document[]> {
        let host = environment.host; 
        return this.http.get<Document[]>(host + "/documents/"+id) ;
    }

    getContentFile(id:number):Observable<String>{
        let host = environment.host;
        return this.http.get<string>(host + "/content/" +id) ;    
    }
    
    deleteUser(document:Document):Observable<void>{
        let host = environment.host;
        return this.http.delete<void>(host+'/deletefile/' + document.docId) ;
    }
}