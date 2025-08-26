import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadSpinner } from './load-spinner';

describe('LoadSpinner', () => {
  let component: LoadSpinner;
  let fixture: ComponentFixture<LoadSpinner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadSpinner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadSpinner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
