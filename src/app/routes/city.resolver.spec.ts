import { TestBed } from "@angular/core/testing";
import { ResolveFn } from "@angular/router";
import { Observable } from "rxjs";
import { CityResolverType, cityResolver } from "./city.resolver";

describe("cityResolver", () => {
	const executeResolver: ResolveFn<Observable<CityResolverType>> = (
		...resolverParameters
	) =>
		TestBed.runInInjectionContext(() =>
			cityResolver(...resolverParameters)
		);

	beforeEach(() => {
		TestBed.configureTestingModule({});
	});

	it("should be created", () => {
		expect(executeResolver).toBeTruthy();
	});
});
