import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../model/UserModel";
import {environment} from "../../environments/environment";
import { Injectable } from "@angular/core";

@Injectable({providedIn:"root"})
export class UserService {
    constructor(private http:HttpClient){}

    getAllUsers():Observable<User[]>{
        let host = environment.host;
        return this.http.get<User[]>(host+'/users') ;
    }

    saveUser(user:User):Observable<User>{
        let host = environment.host;
        return this.http.post<User>(host+'/user',user) ;
    }

    deleteUser(user:User):Observable<void>{
    let host = environment.host;
    return this.http.delete<void>(host+'/users/'+user.userId) ;
    }

    getUser(id:number) :Observable<User>{
        let host = environment.host;
        return this.http.get<User>(host+'/users/' + id) ;
    }

    upDateUser(user:User) :Observable<User>{
        let host = environment.host;
        return this.http.put<User>(host+'/users/' + user.userId , user) ;
    }
}