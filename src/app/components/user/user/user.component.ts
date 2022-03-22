import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/UserModel';
import { UserService } from 'src/app/service/UserService';
import { AppDataState, DataStateEnum } from 'src/app/state/dataState';
import {Observable, of} from "rxjs";
import {catchError, map, startWith} from "rxjs/operators";
import { DocumentService } from 'src/app/service/DocumentService';
import { Document } from 'src/app/model/DocumentModel';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  documents$:Observable<AppDataState<Document[]>> | null = null ; 
  users$:Observable<AppDataState<User[]>> | null = null ; 
  readonly DataStateEnum = DataStateEnum ; 
  check:boolean=false;


  constructor(private userService:UserService, private router:Router, private documentService:DocumentService) { }

  
  ngOnInit(): void {
  }


  onGetAllUsers(){
    this.check=false;
    this.users$ = this.userService.getAllUsers()
      .pipe(map (data=>{
        console.log(data) ;
        return ({dataState:DataStateEnum.LOADED, data:data});
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
      );
  }

  onNewUser() {
    this.router.navigateByUrl("/newuser");
  }

  onEditUser(user:User) {
    this.router.navigateByUrl("/edituser/" + user.userId);
  }

  onDeleteUser(user:User){
    let v = confirm('etes vous sure?') ;
    if(v==true)
    this.userService.deleteUser(user)
      .subscribe(data =>{
       this.onGetAllUsers() ;
      })
  }

  

  onGetUserDocument(user:User){
    this.check=true;
    this.documents$ = this.documentService.getUserDocuments(user.userId)
      .pipe(map (data=>{
        console.log(data) ;
        return ({dataState:DataStateEnum.LOADED, data:data});
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
      );
  }


  onGetAllDocument(){
    this.check=true;
    this.documents$ = this.documentService.getAllDocuments()
      .pipe(map (data=>{
        console.log(data) ;
        return ({dataState:DataStateEnum.LOADED, data:data});
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
      );
  }

  onUploadFile(user:User) {
    this.router.navigateByUrl("/upload/" + user.userId);
  }

  onDeletDocument(document:Document){
    let v = confirm('etes vous sure?') ;
    if(v==true)
    this.documentService.deleteUser(document)
      .subscribe(data =>{
       this.onGetAllDocument() ;
      })
  }
 

}

