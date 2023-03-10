import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  currentPage = 0;
  images = [
    {
      title: 'At the Beach',
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2h8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60',
    },
    {
      title: 'Lightning strikes',
      url: 'https://images.unsplash.com/photo-1674605482775-6c6ed8c51684?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60',
    },
    {
      title: 'Over the Bridge',
      url: 'https://images.unsplash.com/photo-1674341554836-45166b2e6b23?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60',
    },
    {
      title: 'At the Beach',
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2h8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60',
    },
    {
      title: 'Lightning strikes',
      url: 'https://images.unsplash.com/photo-1674605482775-6c6ed8c51684?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60',
    },
    {
      title: 'Over the Bridge',
      url: 'https://images.unsplash.com/photo-1674341554836-45166b2e6b23?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60',
    },
    {
      title: 'At the Beach',
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2h8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60',
    },
    {
      title: 'Lightning strikes',
      url: 'https://images.unsplash.com/photo-1674605482775-6c6ed8c51684?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60',
    },
    {
      title: 'Over the Bridge',
      url: 'https://images.unsplash.com/photo-1674341554836-45166b2e6b23?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60',
    },
    {
      title: 'At the Beach',
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2h8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60',
    },
    {
      title: 'Lightning strikes',
      url: 'https://images.unsplash.com/photo-1674605482775-6c6ed8c51684?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60',
    },
    {
      title: 'Over the Bridge',
      url: 'https://images.unsplash.com/photo-1674341554836-45166b2e6b23?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60',
    },
    {
      title: 'At the Beach',
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2h8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60',
    },
    {
      title: 'Lightning strikes',
      url: 'https://images.unsplash.com/photo-1674605482775-6c6ed8c51684?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60',
    },
    {
      title: 'Over the Bridge',
      url: 'https://images.unsplash.com/photo-1674341554836-45166b2e6b23?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60',
    },
    {
      title: 'At the Beach',
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2h8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60',
    },
    {
      title: 'Lightning strikes',
      url: 'https://images.unsplash.com/photo-1674605482775-6c6ed8c51684?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60',
    },
    {
      title: 'Over the Bridge',
      url: 'https://images.unsplash.com/photo-1674341554836-45166b2e6b23?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60',
    },
    {
      title: 'At the Beach',
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2h8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60',
    },
    {
      title: 'Lightning strikes',
      url: 'https://images.unsplash.com/photo-1674605482775-6c6ed8c51684?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60',
    },
    {
      title: 'Over the Bridge',
      url: 'https://images.unsplash.com/photo-1674341554836-45166b2e6b23?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60',
    },
  ];

  checkWindowIndex(index: number) {
    return Math.abs(this.currentPage - index) < 5;
  }
}
