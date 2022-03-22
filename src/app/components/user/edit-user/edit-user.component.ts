import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/UserService';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

 
  submitted:boolean = false;
  userId:number ;
  userFormGroup?: FormGroup;
  constructor(private activatedRoute:ActivatedRoute, private userService:UserService, private fb:FormBuilder,private router:Router) {
    this.userId = this.activatedRoute.snapshot.params.userId ;
  }

  ngOnInit(): void {
    this.userService.getUser(this.userId)
        .subscribe(user =>{this.userFormGroup = this.fb.group({
          userId: [user.userId, Validators.required],
          firstName:[user.firstName, Validators.required],
          lastName:[user.lastName, Validators.required]
        })
      });
  }

  onUpDateUser(){
    this.router.navigateByUrl("/users");
    this.userService.upDateUser(this.userFormGroup?.value)
      .subscribe(data => {
        alert("Success Product UpDated ");
      })
      
  }

}
