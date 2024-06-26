import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed, getTestBed } from "@angular/core/testing";
import { ICitySearchResult, ICityWeather } from "../types/city-types";
import { IFiveDaysForecast } from "../types/forecast-types";
import { provideMockWeatherApiKey } from "../unit-test-utils/token.mock";
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
	it("should search cities", (): void => {
		service.searchCity("test").subscribe((result: ICitySearchResult): void => {
			expect(result).toBeNull();
		});
		const req = httpMock.expectOne(
			`https://api.openweathermap.org/data/2.5/find?q=test&type=like&appid=KEY&units=metric`
		);
		expect(req.request.method).toBe("GET");
	});
	it("should get city weather", (): void => {
		service.getCityWeather(1).subscribe((result: ICityWeather): void => {
			expect(result).toBeNull();
		});
		const req = httpMock.expectOne(`https://api.openweathermap.org/data/2.5/weather?id=1&appid=KEY&units=metric`);
		expect(req.request.method).toBe("GET");
	});
	it("should get five days forecasts", (): void => {
		service.getFiveDaysForecast(1).subscribe((result: IFiveDaysForecast): void => {
			expect(result).toBeNull();
		});
		const req = httpMock.expectOne(`https://api.openweathermap.org/data/2.5/forecast?id=1&appid=KEY&units=metric`);
		expect(req.request.method).toBe("GET");
	});
	it("should test #navigationStarted", (): void => {
		expect(service.navigationStarted).toBeFalse();
		service.navigationStarted = true;
		expect(service.navigationStarted).toBeTrue();
	});
	it("should test #licenseKey", (): void => {
		expect(service["licenseKey"]).toBe("KEY");
	});
});
