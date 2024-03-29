import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import {
  filter,
  mergeMap,
  Observable,
  of,
  switchMap,
  tap,
  toArray,
  throwError,
  catchError,
  retry,
} from 'rxjs';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NotificationsService } from '../notifications/notifications.service';

interface OpenWeatherResponse {
  list: {
    dt_txt: string;
    main: {
      temp: number;
    };
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  private url = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(
    private http: HttpClient,
    private notificationsService: NotificationsService
  ) {}

  getForecast() {
    return this.getCurrentLocation().pipe(
      map((coords) => {
        return new HttpParams()
          .set('lat', String(coords.latitude))
          .set('lon', String(coords.longitude))
          .set('units', 'metric')
          .set('appid', 'OPEN_WEATH_API_KEY');
      }),
      switchMap((params) =>
        this.http.get<OpenWeatherResponse>(this.url, { params })
      ),
      map((value) => {
        return value.list;
      }),
      mergeMap((value) => of(...value)),
      filter((value, index) => index % 8 === 0),
      map((value) => {
        return {
          dateString: value.dt_txt,
          temp: value.main.temp,
        };
      }),
      toArray()
    );
  }

  getCurrentLocation() {
    return new Observable<GeolocationCoordinates>((observer) => {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position.coords);
          observer.complete();
        },
        (err) => observer.error(err)
      );
    }).pipe(
      retry(1),
      tap(() => {
        this.notificationsService.addSuccess('Got your location');
      }),
      catchError((err) => {
        // Handle the error
        this.notificationsService.addError('Failed to get your location');

        // Return a new observable
        return throwError(err);
      })
    );
  }
}
