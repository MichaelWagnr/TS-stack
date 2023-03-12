import { Component } from '@angular/core';

@Component({
  selector: 'app-views-home-component',
  templateUrl: './views-home-component.component.html',
  styleUrls: ['./views-home-component.component.css'],
})
export class ViewsHomeComponentComponent {
  stats = [
    { value: 22, label: '# of Users' },
    { value: 900, label: 'Revenue' },
    { value: 50, label: 'Reviews' },
  ];
}
