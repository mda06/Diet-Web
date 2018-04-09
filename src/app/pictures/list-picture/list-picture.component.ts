import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {UploadFileService} from '../../services/upload-file.service';

@Component({
  selector: 'app-list-picture',
  templateUrl: './list-picture.component.html',
  styleUrls: ['./list-picture.component.css']
})
export class ListPictureComponent implements OnInit {

  showFile = false;
  fileUploads: Observable<string[]>;

  constructor(private uploadService: UploadFileService) {}

  ngOnInit() {
  }

  showFiles(enable: boolean) {
    this.showFile = enable;

    if (enable) {
      this.fileUploads = this.uploadService.getFiles();
    }
  }

}
