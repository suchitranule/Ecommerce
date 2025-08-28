import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
public username:string | null = '';

constructor(public router: Router) {}

ngOnInit() {
   this.username = sessionStorage.getItem('username') ?? 'User';
}

onLogout() {
  sessionStorage.removeItem('username');
  sessionStorage.removeItem('token');
  this.router.navigate(['/login']);
}

}
