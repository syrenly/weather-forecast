import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import {
	ActivatedRouteSnapshot,
	MaybeAsync,
	Navigation,
	RedirectCommand,
	ResolveFn,
	Router,
	RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { SearchService } from "../services/search.service";
import { ICityWeather } from "../types/city-types";
import { IFiveDaysForecast } from "../types/forecast-types";
import { getSearchMockProvider } from "../unit-test-utils/search.service.mock";
import { mockCity, mockForecastResult } from "../unit-test-utils/utils.mock";
import { CityResolverType, cityResolver } from "./city.resolver";

describe("cityResolver", (): void => {
	let searchService: SearchService;
	let router: Router;
	const executeResolver: ResolveFn<Observable<CityResolverType> | RedirectCommand> = (
		...resolverParameters
	): MaybeAsync<Observable<CityResolverType> | RedirectCommand> =>
		TestBed.runInInjectionContext(
			(): MaybeAsync<Observable<CityResolverType> | RedirectCommand> => cityResolver(...resolverParameters)
		);

	beforeEach((): void => {
		TestBed.configureTestingModule({
			providers: [getSearchMockProvider(), Router],
		});
		searchService = TestBed.inject(SearchService);
		router = TestBed.inject(Router);
	});

	it("should be created", (): void => {
		expect(executeResolver).toBeTruthy();
	});

	it("should have success without cached city", fakeAsync((): void => {
		const route = new ActivatedRouteSnapshot();
		route.params = { id: 1 };
		(executeResolver(route, {} as RouterStateSnapshot) as Observable<CityResolverType>).subscribe(value => {
			const v = value as { countryInfo: ICityWeather; forecastResult: IFiveDaysForecast };
			expect(v.countryInfo).toEqual(mockCity);
			expect(v.forecastResult).toEqual(mockForecastResult);
			expect(searchService.navigationStarted).toBeTrue();
		});
		tick();
	}));

	it("should have success with cached city", fakeAsync((): void => {
		const route = new ActivatedRouteSnapshot();
		const state = mockCity;
		spyOn(router, "getCurrentNavigation").and.callFake(
			() =>
				({
					extras: {
						state,
					},
				}) as any as Navigation
		);
		const getCitySpy = spyOn(searchService, "getCityWeather");
		route.params = { id: mockCity.id };
		(executeResolver(route, {} as RouterStateSnapshot) as Observable<CityResolverType>).subscribe(value => {
			const v = value as { countryInfo: ICityWeather; forecastResult: IFiveDaysForecast };
			expect(v.countryInfo).toEqual(mockCity);
			expect(v.forecastResult).toEqual(mockForecastResult);
			expect(searchService.navigationStarted).toBeTrue();
			expect(getCitySpy).not.toHaveBeenCalled();
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

	it("should handle invalid id", fakeAsync((): void => {
		const route = new ActivatedRouteSnapshot();
		route.params = { id: "invalid" };
		(executeResolver(route, {} as RouterStateSnapshot) as Observable<CityResolverType>).subscribe(value => {
			const v = value as { errorStatus: number };
			expect(v.errorStatus).toBe(404);
			expect(searchService.navigationStarted).toBeFalsy();
		});
		tick();
	}));

	it("should handle missing id", fakeAsync((): void => {
		const route = new ActivatedRouteSnapshot();
		(executeResolver(route, {} as RouterStateSnapshot) as Observable<CityResolverType>).subscribe(value => {
			const v = value as { errorStatus: number };
			expect(v.errorStatus).toBe(404);
			expect(searchService.navigationStarted).toBeFalsy();
		});
		tick();
	}));

	it("should retrieve city from server if not in navigation state", fakeAsync((): void => {
		const route = new ActivatedRouteSnapshot();
		route.params = { id: 2 };
		spyOn(searchService, "getCityWeather").and.callThrough();
		spyOn(searchService, "getFiveDaysForecast").and.callThrough();

		(executeResolver(route, {} as RouterStateSnapshot) as Observable<CityResolverType>).subscribe(value => {
			const v = value as { countryInfo: ICityWeather; forecastResult: IFiveDaysForecast };
			expect(v.countryInfo).toEqual(mockCity);
			expect(v.forecastResult).toEqual(mockForecastResult);
			expect(searchService.getCityWeather).toHaveBeenCalledWith(2);
			expect(searchService.getFiveDaysForecast).toHaveBeenCalledWith(2);
			expect(searchService.navigationStarted).toBeTrue();
		});
		tick();
	}));

	it("should handle server error gracefully", fakeAsync((): void => {
		const route = new ActivatedRouteSnapshot();
		route.params = { id: 3 };
		spyOn(searchService, "getCityWeather").and.returnValue(
			new Observable(observer => observer.error({ status: 500 }))
		);

		(executeResolver(route, {} as RouterStateSnapshot) as Observable<CityResolverType>).subscribe(value => {
			const v = value as { errorStatus: number };
			expect(v.errorStatus).toBe(500);
			expect(searchService.navigationStarted).toBeTrue();
		});
		tick();
	}));
});
