import { TestBed } from "@angular/core/testing";
import { MaybeAsync, ResolveFn } from "@angular/router";
import { Observable } from "rxjs";
import { CityResolverType, cityResolver } from "./city.resolver";

describe("cityResolver", (): void => {
	const executeResolver: ResolveFn<Observable<CityResolverType>> = (
		...resolverParameters
	): MaybeAsync<Observable<CityResolverType>> =>
		TestBed.runInInjectionContext(
			(): MaybeAsync<Observable<CityResolverType>> => cityResolver(...resolverParameters)
		);

	beforeEach((): void => {
		TestBed.configureTestingModule({});
	});

	it("should be created", (): void => {
		expect(executeResolver).toBeTruthy();
	});
});
