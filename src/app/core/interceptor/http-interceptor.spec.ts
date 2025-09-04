import { TestBed } from '@angular/core/testing';
import { HttpClient, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';

import { AppHttpInterceptor } from './http-interceptor';
import { LoadSpinnerService } from '../shared/service/load-spinner';

describe('AppHttpInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let loadSpinnerServiceSpy: jasmine.SpyObj<LoadSpinnerService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    loadSpinnerServiceSpy = jasmine.createSpyObj('LoadSpinnerService', ['show', 'hide']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: LoadSpinnerService, useValue: loadSpinnerServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AppHttpInterceptor,
          multi: true
        }
      ]
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    sessionStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add Authorization header when token is present', () => {
    sessionStorage.setItem('token', 'dummy-token');

    http.get('/test').subscribe();

    const req = httpMock.expectOne('/test');
    expect(req.request.headers.has('Authorization')).toBeTrue();
    expect(req.request.headers.get('Authorization')).toBe('Bearer dummy-token');
    req.flush({});
  });

  it('should not add Authorization header when no token is present', () => {
    http.get('/test').subscribe();

    const req = httpMock.expectOne('/test');
    expect(req.request.headers.has('Authorization')).toBeFalse();
    req.flush({});
  });

  it('should call LoadSpinnerService.show() and hide()', () => {
    http.get('/test').subscribe();

    const req = httpMock.expectOne('/test');
    req.flush({}); // simulate response

    expect(loadSpinnerServiceSpy.show).toHaveBeenCalled();
    expect(loadSpinnerServiceSpy.hide).toHaveBeenCalled();
  });

  it('should handle 401 error', () => {
    spyOn(console, 'warn');

    http.get('/test').subscribe({
      next: () => fail('should have failed with 401 error'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).toBe(401);
      }
    });

    const req = httpMock.expectOne('/test');
    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });

    expect(console.warn).toHaveBeenCalledWith('UnAuthorised');
    expect(loadSpinnerServiceSpy.hide).toHaveBeenCalled();
  });

  it('should handle other errors (e.g. 500)', () => {
    spyOn(console, 'log');

    http.get('/test').subscribe({
      next: () => fail('should have failed with 500 error'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
      }
    });

    const req = httpMock.expectOne('/test');
    req.flush('Server Error', { status: 500, statusText: 'Server Error' });

    expect(console.log).toHaveBeenCalledWith('Http Error:', jasmine.any(HttpErrorResponse));
    expect(loadSpinnerServiceSpy.hide).toHaveBeenCalled();
  });
});
