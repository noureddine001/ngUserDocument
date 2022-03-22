import { HttpClient, HttpEvent } from "@angular/common/http"
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";



@Injectable({
  providedIn:"root"
})

export class FileService {
  constructor(private http: HttpClient) { }


  //define function to upload files


  

  uploadFile(formData:FormData,id:number) :Observable<HttpEvent<string[]>>{
    let host = environment.host ; 
    return this.http.post<string[]>(host+"/uploadfiles/"+id, formData, {
      reportProgress:true, 
      observe: 'events'
    })
  }

  //define function to download files uploadfiles/{id


  downloadFile(uploadURI:string): Observable<HttpEvent<Blob>> {
    let host = environment.host;
    return this.http.get(host + uploadURI,{
      reportProgress:true, 
      observe:'events',
      responseType:'blob'
      });
  }


  // upload(formData: FormData): Observable<HttpEvent<string[]>> {
  //   let host = environment.host;
  //   return this.http.post<string[]>(`${host}/uploadfiledd`, formData, {
  //     reportProgress: true,
  //     observe: 'events'
  //   });
  // }

  // define function to download files
  download(filename: string): Observable<HttpEvent<Blob>> {
    let host = environment.host;
    return this.http.get(host+'/uploadfile/'+filename , {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }


}
