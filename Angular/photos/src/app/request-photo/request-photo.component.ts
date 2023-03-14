import { Component } from '@angular/core';
import { GetPhotosService } from '../get-photos.service';

@Component({
  selector: 'app-request-photo',
  templateUrl: './request-photo.component.html',
  styleUrls: ['./request-photo.component.css'],
})
export class RequestPhotoComponent {
  imageSrc: string = '';

  constructor(private getPhotoService: GetPhotosService) {
    this.fetchPhoto();
  }

  onClick() {
    this.fetchPhoto();
  }

  fetchPhoto() {
    this.getPhotoService
      .getPhoto()
      .subscribe((res) => (this.imageSrc = res.urls.regular));
  }
}
