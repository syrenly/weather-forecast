import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed, getTestBed } from "@angular/core/testing";
import { DUMMY_API_KEY } from "../consts";
import { ICitySearchResult, ICityWeather } from "../types/city-types";
import { IFiveDaysForecast } from "../types/forecast-types";
import { provideMockDummySearchAdapter } from "../unit-test-utils/dummy-search.adapter.mock";
import { mockDummyCity, mockDummyCitySearchResult, mockDummyForecastResult } from "../unit-test-utils/dummy-utils.mock";
import { provideMockSearchAdapter } from "../unit-test-utils/search.adapter.mock";
import { provideMockWeatherApiKey } from "../unit-test-utils/token.mock";
import { mockCity, mockCitySearchResult } from "../unit-test-utils/utils.mock";
import { mockForecastResult } from "./../unit-test-utils/utils.mock";
import { SearchService } from "./search.service";

describe("SearchService", (): void => {
	let injector: TestBed;
	let service: SearchService;
	let httpMock: HttpTestingController;

	beforeEach((): void => {
		TestBed.configureTestingModule({
			teardown: { destroyAfterEach: false },
			imports: [],
			providers: [
				SearchService,
				provideMockWeatherApiKey(),
				provideMockSearchAdapter(),
				provideMockDummySearchAdapter(),
				provideHttpClient(withInterceptorsFromDi()),
				provideHttpClientTesting(),
			],
		});

		injector = getTestBed();
		service = injector.inject(SearchService);
		httpMock = injector.inject(HttpTestingController);
	});

	it("should be created", (): void => {
		expect(service).toBeTruthy();
	});

	it("should test #navigationStarted", (): void => {
		expect(service.navigationStarted).toBeFalse();
		service.navigationStarted = true;
		expect(service.navigationStarted).toBeTrue();
	});

	describe("SearchService with valid API key", (): void => {
		it("should search cities", (done: DoneFn): void => {
			service.searchCity("test").subscribe((result: ICitySearchResult): void => {
				expect(result).toEqual(mockCitySearchResult);
				done();
			});
		});
		it("should get city weather", (done: DoneFn): void => {
			service.getCityWeather(1).subscribe((result: ICityWeather): void => {
				expect(result).toEqual(mockCity);
				done();
			});
		});
		it("should get five days forecasts", (done: DoneFn): void => {
			service.getFiveDaysForecast(1).subscribe((result: IFiveDaysForecast): void => {
				expect(result).toEqual(mockForecastResult);
				done();
			});
		});

		it("should test #licenseKey", (): void => {
			expect(service["licenseKey"]).toBe("KEY");
		});
	});

	describe("SearchService with dummy API", (): void => {
		beforeEach((): void => {
			spyOnProperty<any>(service, "licenseKey").and.returnValue(DUMMY_API_KEY);
		});
		it("should search cities", (done: DoneFn): void => {
			service.searchCity("test").subscribe((result: ICitySearchResult): void => {
				expect(result).toEqual(mockDummyCitySearchResult);
				done();
			});
		});
		it("should get city weather", (done: DoneFn): void => {
			service.getCityWeather(1).subscribe((result: ICityWeather): void => {
				expect(result).toEqual(mockDummyCity);
				done();
			});
		});
		it("should get five days forecasts", (done: DoneFn): void => {
			service.getFiveDaysForecast(1).subscribe((result: IFiveDaysForecast): void => {
				expect(result).toEqual(mockDummyForecastResult);
				done();
			});
		});
	});
});
