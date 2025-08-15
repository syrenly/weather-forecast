import { TestBed, getTestBed } from "@angular/core/testing";
import { ICitySearchResult, ICityWeather } from "../../types/city-types";
import { IFiveDaysForecast } from "../../types/forecast-types";
import { mockCity, mockCitySearchResult, mockForecastResult } from "../../unit-test-utils/utils.mock";
import { MockSearchAdapter } from "./mock-search.adapter";

describe("MockSearchAdapter", (): void => {
	let injector: TestBed;
	let service: MockSearchAdapter;

	beforeEach((): void => {
		TestBed.configureTestingModule({
			teardown: { destroyAfterEach: false },
			imports: [],
			providers: [MockSearchAdapter],
		});

		injector = getTestBed();
		service = injector.inject(MockSearchAdapter);
	});
	it("should be created", (): void => {
		expect(service).toBeTruthy();
	});
	it("should search cities", (done: DoneFn): void => {
		service.searchCity("test").subscribe((result: ICitySearchResult): void => {
			expect(result).toEqual(mockCitySearchResult);
			done();
		});
	});
	it("should get city weather", (done: DoneFn): void => {
		service.getCityWeather().subscribe((result: ICityWeather): void => {
			expect(result).toEqual(mockCity);
			done();
		});
	});
	it("should get five days forecasts", (done: DoneFn): void => {
		service.getFiveDaysForecast().subscribe((result: IFiveDaysForecast): void => {
			expect(result).toEqual(mockForecastResult);
			done();
		});
	});
});
