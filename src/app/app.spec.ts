import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { LoadSpinner } from './core/shared/component/load-spinner/load-spinner';
import { RouterModule } from '@angular/router';


describe('App', () => {
  let fixture: ComponentFixture<App>;
  let component: App;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        App,
        LoadSpinner
      ],
      imports: [RouterModule.forRoot([])]

    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
