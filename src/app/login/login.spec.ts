import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Login } from './login';
import { LoginService } from '../service/login.service';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [Login],
      imports: [ReactiveFormsModule],  // needed for FormGroup/FormControl
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        LoginService,
        { provide: Router, useValue: routerSpy }, // mock Router
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
    sessionStorage.clear(); // clean up storage after each test
  });

  it('should call login, store session data, and navigate', () => {
    // set form values
    component.loginForm.setValue({ username: 'testuser', password: '123' });

    // trigger form submit
    component.onLoginSubmit();

    // mock backend response
    const mockResponse = { username: 'testuser', accessToken: 'fake-token' };
    const req = httpMock.expectOne('/api/login'); // <- use your actual API URL
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);

    // expectations
    expect(sessionStorage.getItem('username')).toBe('testuser');
    expect(sessionStorage.getItem('token')).toBe('fake-token');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/product/list']);
  });

  it('should handle API error gracefully', () => {
    spyOn(console, 'error'); // mock console.error

    component.loginForm.setValue({ username: 'bad', password: 'creds' });
    component.onLoginSubmit();

    const req = httpMock.expectOne('/api/login');
    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });

    expect(console.error).toHaveBeenCalled();
    expect(sessionStorage.getItem('token')).toBeNull();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
