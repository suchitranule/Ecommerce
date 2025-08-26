import { Component, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LayoutService } from './layout-service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('ecommerce');
  constructor(private router : Router,public layoutService: LayoutService) {}

  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(event => {
      if(event.url.includes("login") || event.url.includes('signup')) {
        this.layoutService.hideHeaderSidebar();
      } else {
        this.layoutService.showHeaderSidebar();
      }
    });
  }
}
