import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private db = [{ username: "test1@test.com", password: "Test@123" }, { username: "test2@test.com", password: "Test@123" }];

  isAuthenticated(usrname:string,password:string):any {
  let isValidUser = this.db.some(data => {
      if(data.username == usrname && data.password == password) {
        return true;
      } else {
        return false ;
      }
    });
    return isValidUser;
  }
  
}
