import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FileService } from 'src/app/service/FileService';
import { saveAs } from 'file-saver';
import { ActivatedRoute } from '@angular/router';


interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  userId:number ;
  filenames: string[] =[] ;
  fileStatus = {status: '', requestType: '', percent: 0} ; 

  constructor(private fileService: FileService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
     this.userId = this.activatedRoute.snapshot.params.userId;
  }

  // onUploadFiles(files: File[]): void {
  //   const formData = new FormData();
  //   for (const file of files) { formData.append('file', file, file.name); }
  //   this.fileService.upload(formData).subscribe(
  //     event=> {
  //       console.log(event);
  //       this.resportProgress(event);
  //     },
  //    (error: HttpErrorResponse)=> {
  //       console.log(error);
  //     }
  //   );
  // }


  // onDownloadFiles(filename: string): void {
  //   this.fileService.download(filename).subscribe(
  //     event => {
  //       console.log(event);
  //       this.resportProgress(event);
  //     },
  //     (error: HttpErrorResponse) => {
  //       console.log(error);
  //     }
  //   );
  // }



  // onDownloadFile(downloadURI: string): void {
  //   this.fileService.downloadFile(downloadURI).subscribe(
  //     event =>{
  //       console.log(event) ;
  //       this.resportProgress(event); 
  //     }, 
  //     (error: HttpErrorResponse) =>{
  //       console.log(error);
  //     }
  //   );
  // }


  resportProgress(httpEvent: HttpEvent<string[] | Blob>):void  {
    switch(httpEvent.type){
      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total, 'Downloading...');
        break;
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total, 'Uploading...');
        break;
      case HttpEventType.ResponseHeader:
        console.log('Header returned', httpEvent);
        break;
      case HttpEventType.Response: 
        if(httpEvent.body instanceof Array){
          for(const filename of httpEvent.body){
            this.filenames.unshift(filename) ;
          }
        }else{
          saveAs(new File([httpEvent.body!], httpEvent.headers.get("File-Name")!,
            {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}
          ))
          // saveAs(new File([httpEvent.body!], httpEvent.headers.get("File-Name")!,
          //   {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}
          // ))
        }
        this.fileStatus.status = 'done';
        break;

      default: 
        console.log(httpEvent) ; 
        break;   
    }
  }


  private updateStatus(loaded: number, total: number, requestType: string) {
    this.fileStatus.status = 'progress'; 
    this.fileStatus.requestType = requestType; 
    this.fileStatus.percent = Math.round(100 * loaded / total) ;
  }

  onUploadFiles(files:File[]) :void {
    const formData = new FormData() ;
    for(const file of files){
      formData.append('file', file, file.name)
    }
    this.fileService.uploadFile(formData, this.userId).subscribe(
      event=>{
        console.log(event);
        this.resportProgress(event)
      },
      (error:HttpErrorResponse)=>{
        console.log(error); 
      }
    ) ;
  }  


    //...


  onPrint(tx :string ){
    console.log(tx);
  }
}
