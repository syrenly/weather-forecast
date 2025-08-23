import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed, getTestBed } from "@angular/core/testing";
import { dummyCitySamples } from "../../consts";
import { ICityIdName, ICitySearchResult, ICityWeather } from "../../types/city-types";
import { IFiveDaysForecast } from "../../types/forecast-types";
import { DummySearchAdapter } from "./dummy-search.adapter";

describe("DummySearchAdapter", (): void => {
	let injector: TestBed;
	let service: DummySearchAdapter;
	let httpMock: HttpTestingController;

	beforeEach((): void => {
		TestBed.configureTestingModule({
			teardown: { destroyAfterEach: false },
			imports: [],
			providers: [DummySearchAdapter, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()],
		});

		injector = getTestBed();
		httpMock = injector.inject(HttpTestingController);
		service = injector.inject(DummySearchAdapter);
	});
	it("should be created", (): void => {
		expect(service).toBeTruthy();
	});
	it("should search cities", (): void => {
		service.searchCity("test").subscribe((result: ICitySearchResult): void => {
			expect(result).toBeNull();
		});
		const req = httpMock.expectOne("assets/dummy-responses/find.json");
		expect(req.request.method).toBe("GET");
	});
	it("should get city weather", (): void => {
		service.getCityWeather(1234).subscribe((result: ICityWeather): void => {
			expect(result).toBeNull();
		});
		const req = httpMock.expectOne("assets/dummy-responses/1234.weather.json");
		expect(req.request.method).toBe("GET");
	});
	it("should get five days forecasts", (): void => {
		service.getFiveDaysForecast(1234).subscribe((result: IFiveDaysForecast): void => {
			expect(result).toBeNull();
		});
		const req = httpMock.expectOne("assets/dummy-responses/1234.forecast.json");
		expect(req.request.method).toBe("GET");
	});
	it("should get five days forecasts", (done: DoneFn): void => {
		service.getSampleCities().subscribe((result: ICityIdName[]): void => {
			expect(result).toEqual(dummyCitySamples);
			done();
		});
	});
});
