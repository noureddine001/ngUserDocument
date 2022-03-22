import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/service/FileService';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-download-file',
  templateUrl: './download-file.component.html',
  styleUrls: ['./download-file.component.css']
})
export class DownloadFileComponent implements OnInit {
  filename: string[] =[] ;
  fileStatus = {status:'', requestType:'', percent: 0} ; 

  constructor(private fileService:FileService) { }

  ngOnInit(): void {
  }

  onDownloadFiles(downloadURI: string): void {
    this.fileService.downloadFile(downloadURI).subscribe(
      event =>{
        console.log(event) ;
        this.resportProgress(event); 
      }, 
      (error: HttpErrorResponse) =>{
        console.log(error);
      }
    );
  }

  resportProgress(httpEvent: HttpEvent<string[] | Blob>):void  {
    switch(httpEvent.type){
      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total, 'Uploading');
        break;
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total, 'Uploading');
        break;
      case HttpEventType.ResponseHeader:
        console.log('Header returned', httpEvent);
        break;
      case HttpEventType.Response: 
        if(httpEvent.body instanceof Array){
          for(const filename of httpEvent.body){
            this.filename.unshift(filename) ;
          }
        }else{
          saveAs(new File([httpEvent.body!], httpEvent.headers.get("File-Name")!,
            {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}
          ))
          // saveAs(new File([httpEvent.body!], httpEvent.headers.get("File-Name")!,
          //   {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}
          // ))
        }
        break;

      default: 
        console.log(httpEvent) ;    
    }
  }


  private updateStatus(loaded: number, total: number, requestType: string) {
    this.fileStatus.status = 'progress'; 
    this.fileStatus.requestType = requestType; 
    this.fileStatus.percent = Math.round(100 * loaded / total) ;
  }

}
