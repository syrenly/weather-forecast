import {
	HttpClientTestingModule,
	HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed, getTestBed } from "@angular/core/testing";
import { WEATHER_API_LICENSE } from "../tokens";
import { ICitySearchResult, ICityWeather } from "../types/city-types";
import { IFiveDaysForecast } from "../types/forecast-types";
import { SearchService } from "./search.service";

describe("SearchService", () => {
	let injector: TestBed;
	let service: SearchService;
	let httpMock: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [
				SearchService,
				{ provide: WEATHER_API_LICENSE, useValue: "KEY" },
			],
			teardown: { destroyAfterEach: false },
		});

		injector = getTestBed();
		service = injector.inject(SearchService);
		httpMock = injector.inject(HttpTestingController);
	});
	it("should be created", () => {
		expect(service).toBeTruthy();
	});
	it("should search cities", () => {
		service.searchCountry("test").subscribe((result: ICitySearchResult) => {
			expect(result).toBeNull();
		});
		const req = httpMock.expectOne(
			`https://api.openweathermap.org/data/2.5/find?q=test&type=like&appid=KEY&units=metric`
		);
		expect(req.request.method).toBe("GET");
	});
	it("should get city weather", () => {
		service.getCityWeather(1).subscribe((result: ICityWeather) => {
			expect(result).toBeNull();
		});
		const req = httpMock.expectOne(
			`https://api.openweathermap.org/data/2.5/weather?id=1&appid=KEY&units=metric`
		);
		expect(req.request.method).toBe("GET");
	});
	it("should get five days forecasts", () => {
		service
			.getFiveDaysForecast(1)
			.subscribe((result: IFiveDaysForecast) => {
				expect(result).toBeNull();
			});
		const req = httpMock.expectOne(
			`https://api.openweathermap.org/data/2.5/forecast?id=1&appid=KEY&units=metric`
		);
		expect(req.request.method).toBe("GET");
	});
});
