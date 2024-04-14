import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastFiveComponent } from './forecast-five.component';

describe('ForecastFiveComponent', () => {
  let component: ForecastFiveComponent;
  let fixture: ComponentFixture<ForecastFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForecastFiveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForecastFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
