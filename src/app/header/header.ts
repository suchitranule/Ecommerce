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
  this.router.navigate(['/login']);
}
}
