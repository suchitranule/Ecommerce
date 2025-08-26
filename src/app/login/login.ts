import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../auth/auth';
import { LoginService } from '../service/login.service';
import { catchError, throwError } from 'rxjs';
import { LayoutService } from '../layout-service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  loginForm!: FormGroup;

  constructor(private authService: Auth,private router: Router,public fb:FormBuilder, private loginService:LoginService, private layoutService: LayoutService) {
     this.loginForm = this.fb.group( {
      username : ['',Validators.required],
      password: ['',Validators.required]
    })
  }

  ngOninit() {
    this.layoutService.hideHeaderSidebar();
  }

  onLoginSubmit() {
    this.loginService.login(this.loginForm.value).pipe(catchError(err => {
            console.error('API failed', err);
            return throwError(() => err);
          })).subscribe(resp =>{
              console.log(resp);
              sessionStorage.setItem('token',(resp as any)['accessToken']);
              this.router.navigate(['/product/list']);
    });
  }
}
