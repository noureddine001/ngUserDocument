import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UserComponent } from './components/user/user/user.component';
import { HomeComponent } from './components/home/home.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { NewUserComponent } from './components/user/new-user/new-user.component';
import { SearchComponent } from './components/search/search.component';
import { UploadFileComponent } from './components/file/upload-file/upload-file.component';
import { DownloadFileComponent } from './components/file/download-file/download-file.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserComponent,
    HomeComponent,
    EditUserComponent,
    NewUserComponent,
    SearchComponent,
    UploadFileComponent,
    DownloadFileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
