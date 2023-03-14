import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface UnsplashResponse {
  urls: {
    regular: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class GetPhotosService {
  constructor(private http: HttpClient) {}

  getPhoto() {
    return this.http.get<UnsplashResponse>(
      'https://api.unsplash.com/photos/random',
      {
        headers: {
          'Accept-Version': 'v1',
          Authorization: 'Client-ID ACCESS_KEY',
        },
      }
    );
  }
}
