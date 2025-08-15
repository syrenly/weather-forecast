import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed, getTestBed } from "@angular/core/testing";
import { ICitySearchResult, ICityWeather } from "../../types/city-types";
import { IFiveDaysForecast } from "../../types/forecast-types";
import { SearchAdapter } from "./search.adapter";

describe("SearchAdapter", (): void => {
	let injector: TestBed;
	let service: SearchAdapter;
	let httpMock: HttpTestingController;

	beforeEach((): void => {
		TestBed.configureTestingModule({
			teardown: { destroyAfterEach: false },
			imports: [],
			providers: [SearchAdapter, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()],
		});

		injector = getTestBed();
		service = injector.inject(SearchAdapter);
		httpMock = injector.inject(HttpTestingController);
	});
	it("should be created", (): void => {
		expect(service).toBeTruthy();
	});
	it("should search cities", (): void => {
		service.searchCity("test", "KEY").subscribe((result: ICitySearchResult): void => {
			expect(result).toBeNull();
		});
		const req = httpMock.expectOne(
			`https://api.openweathermap.org/data/2.5/find?q=test&appid=KEY&units=metric&type=like`
		);
		expect(req.request.method).toBe("GET");
	});
	it("should get city weather", (): void => {
		service.getCityWeather(1, "KEY").subscribe((result: ICityWeather): void => {
			expect(result).toBeNull();
		});
		const req = httpMock.expectOne(`https://api.openweathermap.org/data/2.5/weather?id=1&appid=KEY&units=metric`);
		expect(req.request.method).toBe("GET");
	});
	it("should get five days forecasts", (): void => {
		service.getFiveDaysForecast(1, "KEY").subscribe((result: IFiveDaysForecast): void => {
			expect(result).toBeNull();
		});
		const req = httpMock.expectOne(`https://api.openweathermap.org/data/2.5/forecast?id=1&appid=KEY&units=metric`);
		expect(req.request.method).toBe("GET");
	});
});
