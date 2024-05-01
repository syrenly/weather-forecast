import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import { ActivatedRouteSnapshot, MaybeAsync, ResolveFn, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { SearchService } from "../services/search.service";
import { ICityWeather } from "../types/city-types";
import { IFiveDaysForecast } from "../types/forecast-types";
import { getSearchMockProvider } from "../unit-test-utils/search.service.mock";
import { city, forecastResult } from "../unit-test-utils/utils.mock";
import { CityResolverType, cityResolver } from "./city.resolver";

describe("cityResolver", (): void => {
	let searchService: SearchService;
	const executeResolver: ResolveFn<Observable<CityResolverType>> = (
		...resolverParameters
	): MaybeAsync<Observable<CityResolverType>> =>
		TestBed.runInInjectionContext(
			(): MaybeAsync<Observable<CityResolverType>> => cityResolver(...resolverParameters)
		);

	beforeEach((): void => {
		TestBed.configureTestingModule({
			providers: [getSearchMockProvider(), Router],
		});
		searchService = TestBed.inject(SearchService);
	});

	it("should be created", (): void => {
		expect(executeResolver).toBeTruthy();
	});

	it("should have success", fakeAsync((): void => {
		const route = new ActivatedRouteSnapshot();
		route.params = { id: 1 };
		(executeResolver(route, {} as RouterStateSnapshot) as Observable<CityResolverType>).subscribe(value => {
			const v = value as { countryInfo: ICityWeather; forecastResult: IFiveDaysForecast };
			expect(v.countryInfo).toEqual(city);
			expect(v.forecastResult).toEqual(forecastResult);
			expect(searchService.navigationStarted).toBeTrue();
		});
		tick();
	}));

	it("should handle error 404", fakeAsync((): void => {
		const route = new ActivatedRouteSnapshot();
		(executeResolver(route, {} as RouterStateSnapshot) as Observable<CityResolverType>).subscribe(value => {
			const v = value as { errorStatus: number };
			expect(v.errorStatus).toBe(404);
			expect(searchService.navigationStarted).toBeFalsy();
		});
		tick();
	}));
});
