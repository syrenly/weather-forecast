import { getTestBed, TestBed } from "@angular/core/testing";
import { citySamples, DUMMY_API_KEY, dummyCitySamples } from "../consts";
import { ICityIdName, ICitySearchResult, ICityWeather } from "../types/city-types";
import { IFiveDaysForecast } from "../types/forecast-types";
import { provideMockDummySearchAdapter } from "../unit-test-utils/dummy-search.adapter.mock";
import { mockDummyCity, mockDummyCitySearchResult, mockDummyForecastResult } from "../unit-test-utils/dummy-utils.mock";
import { provideMockLicenseService } from "../unit-test-utils/license.service.mock";
import { provideMockSearchAdapter } from "../unit-test-utils/search.adapter.mock";
import { mockCity, mockCitySearchResult } from "../unit-test-utils/utils.mock";
import { mockForecastResult } from "./../unit-test-utils/utils.mock";
import { LicenseService } from "./license.service";
import { SearchService } from "./search.service";

describe("SearchService", (): void => {
	let injector: TestBed;
	let service: SearchService;
	let licenseService: LicenseService;

	beforeEach((): void => {
		TestBed.configureTestingModule({
			teardown: { destroyAfterEach: false },
			imports: [],
			providers: [
				SearchService,
				provideMockSearchAdapter(),
				provideMockDummySearchAdapter(),
				provideMockLicenseService(),
			],
		});

		injector = getTestBed();
		service = injector.inject(SearchService);
		licenseService = injector.inject(LicenseService);
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
		beforeEach((): void => {
			spyOnProperty<any>(licenseService, "licenseKey").and.returnValue("0123456");
			spyOnProperty<any>(licenseService, "useMockData").and.returnValue(false);
		});
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
		it("should get sample cities", (done: DoneFn): void => {
			service.getSampleCities().subscribe((result: ICityIdName[]): void => {
				expect(result).toEqual(citySamples);
				done();
			});
		});
		it("should test #licenseKey and #useMockData", (): void => {
			expect(service["licenseKey"]).toBe("0123456");
			expect(service["useMockData"]).toBeFalse();
		});
	});

	describe("SearchService with dummy API", (): void => {
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
		it("should get sample cities", (done: DoneFn): void => {
			service.getSampleCities().subscribe((result: ICityIdName[]): void => {
				expect(result).toEqual(dummyCitySamples);
				done();
			});
		});
		it("should test #licenseKey and #useMockData", (): void => {
			expect(service["licenseKey"]).toBe(DUMMY_API_KEY);
			expect(service["useMockData"]).toBeTrue();
		});
	});
});
