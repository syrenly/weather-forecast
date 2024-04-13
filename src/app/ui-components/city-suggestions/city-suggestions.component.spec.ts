import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitySuggestionsComponent } from './city-suggestions.component';

describe('CitySuggestionsComponent', () => {
  let component: CitySuggestionsComponent;
  let fixture: ComponentFixture<CitySuggestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitySuggestionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CitySuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
