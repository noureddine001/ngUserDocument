import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadFileComponent } from './components/file/upload-file/upload-file.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { NewUserComponent } from './components/user/new-user/new-user.component';
import { UserComponent } from './components/user/user/user.component';


const routes: Routes = [
  {path:"users" , component:UserComponent} ,
  {path:"newuser" , component:NewUserComponent} ,
  {path:"edituser/:userId" , component:EditUserComponent} ,
  {path:"search" , component:SearchComponent},
  {path:"upload/:userId", component:UploadFileComponent},
  {path:"" , component:HomeComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
