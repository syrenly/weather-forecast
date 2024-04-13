import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { cityResolver } from './city.resolver';

describe('cityResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => cityResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
