import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/UserModel';
import { UserService } from 'src/app/service/UserService';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  
  userFormGroup:FormGroup | null=null;
  submitted:boolean = false ;

constructor(private fb:FormBuilder, private userService:UserService, private router:Router) {  }
ngOnInit(): void {
  this.userFormGroup = this.fb.group({
    firstName:["", Validators.required],
    lastName:["", Validators.required]
  });
}

onSaveUser() {
  this.submitted = true ;
  if(this.userFormGroup?.invalid) return ;
  this.userService.saveUser(this.userFormGroup?.value)
    .subscribe(data =>{
      alert("success Saving User");
      this.userFormGroup?.reset() ;
    });
    this.router.navigateByUrl("/users");
}
}
