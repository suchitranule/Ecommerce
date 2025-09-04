import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthGuard } from './auth-guard';

describe('AuthGuard (class)', () => {
  let guard: AuthGuard;
  let routerSpy: jasmine.SpyObj<Router>;

  // Mock objects
  let mockRoute: ActivatedRouteSnapshot;
  let mockState: RouterStateSnapshot;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: routerSpy }
      ]
    });

    guard = TestBed.inject(AuthGuard);

    // create mocks
    mockRoute = new ActivatedRouteSnapshot();
    mockState = { url: '/dashboard' } as RouterStateSnapshot;

    sessionStorage.clear();
  });

  it('should return true if token exists in sessionStorage', () => {
    sessionStorage.setItem('token', 'dummy-token');

    const result = guard.canActivate(mockRoute, mockState);

    expect(result).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should return false and redirect to /login if no token exists', () => {
    const result = guard.canActivate(mockRoute, mockState);

    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should receive RouterStateSnapshot url', () => {
    sessionStorage.setItem('token', 'dummy-token');

    const result = guard.canActivate(mockRoute, mockState);

    expect(result).toBeTrue();
    expect(mockState.url).toBe('/dashboard');
  });
});
