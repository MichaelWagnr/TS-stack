import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // signedin = false;
  signedin$: BehaviorSubject<boolean | null>;

  constructor(private authService: AuthService) {
    this.signedin$ = this.authService.signedin$;
  }

  // ngOnInit() {
  //   this.authService.signedin$.subscribe((signedin) => {
  //     this.signedin = signedin;
  //   });
  // }
  ngOnInit() {
    this.authService.checkAuth().subscribe(() => {});
  }
}
