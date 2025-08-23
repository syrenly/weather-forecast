import { HttpClient, provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { BehaviorSubject } from "rxjs";
import { DUMMY_API_KEY } from "./consts";
import * as tokens from "./tokens";
import { provideMockTheme, provideMockWeatherApiKey } from "./unit-test-utils/token.mock";

describe("tokens", (): void => {
	let httpMock: HttpTestingController;
	let httpClient: HttpClient;

	beforeEach((): void => {
		TestBed.configureTestingModule({
			imports: [],
			providers: [
				provideHttpClient(),
				provideHttpClientTesting(),
				provideMockTheme(),
				provideMockWeatherApiKey(),
			],
		});
		httpMock = TestBed.inject(HttpTestingController);
		httpClient = TestBed.inject(HttpClient);
	});

	afterEach((): void => {
		httpMock.verify();
	});

	describe("IS_DEV_MODE", () => {
	// 	it("should provide IS_DEV_MODE using provideIsDevEnvironment", (): void => {
	// 		TestBed.resetTestingModule();
	// 		TestBed.configureTestingModule({
	// 			providers: [tokens.provideIsDevEnvironment()],
	// 		});
	// 		const _isDevMode = TestBed.inject(tokens.IS_DEV_MODE);
	// 		expect(_isDevMode).toBe(isDevMode());
	// 	});
	// 	describe("should provide IS_DEV_MODE as true in development mode", (): void => {
	// 		it("test", () => {
	// 			const isDevMode = TestBed.inject(tokens.IS_DEV_MODE);
	// 			expect(isDevMode).toBeTrue();
	// 		});
	// 	});
	// 	describe("should provide IS_DEV_MODE as false in production mode", (): void => {
	// 		beforeEach((): void => {
	// 			TestBed.resetTestingModule();
	// 			TestBed.configureTestingModule({}).overrideProvider(tokens.IS_DEV_MODE, { useValue: false });
	// 		});
	// 		it("test", () => {
	// 			const isDevMode = TestBed.inject(tokens.IS_DEV_MODE);
	// 			expect(isDevMode).toBeFalse();
	// 		});
	// 	});
	 });

	describe("WEATHER_API_KEY", () => {
		it("should provide WEATHER_API_KEY using provideWeatherApiKey", (): void => {
			TestBed.resetTestingModule();
			TestBed.configureTestingModule({
				providers: [tokens.provideWeatherApiKey()],
			});
			const weatherApiKey = TestBed.inject(tokens.WEATHER_API_KEY);
			expect(weatherApiKey).toBeInstanceOf(BehaviorSubject);
			expect(weatherApiKey.value).toBe("");
		});
		it("should update WEATHER_API_KEY value", (): void => {
			TestBed.resetTestingModule();
			TestBed.configureTestingModule({
				providers: [tokens.provideWeatherApiKey()],
			});
			const weatherApiKey = TestBed.inject(tokens.WEATHER_API_KEY);
			weatherApiKey.next("new-api-key");
			expect(weatherApiKey.value).toBe("new-api-key");
		});
		it("should provide WEATHER_API_KEY as a BehaviorSubject", (): void => {
			const weatherApiKey = TestBed.inject(tokens.WEATHER_API_KEY);
			expect(weatherApiKey).toBeInstanceOf(BehaviorSubject);
			expect(weatherApiKey.value).toBe("KEY");
		});
	});

	describe("CURRENT_THEME", () => {
		it("should provide CURRENT_THEME using provideCurrentTheme", (): void => {
			TestBed.resetTestingModule();
			TestBed.configureTestingModule({
				providers: [tokens.provideCurrentTheme()],
			});
			const currentTheme = TestBed.inject(tokens.CURRENT_THEME);
			expect(currentTheme).toBeInstanceOf(BehaviorSubject);
			expect(currentTheme.value).toBe("dark");
		});
		it("should update CURRENT_THEME value", (): void => {
			TestBed.resetTestingModule();
			TestBed.configureTestingModule({
				providers: [tokens.provideCurrentTheme()],
			});
			const currentTheme = TestBed.inject(tokens.CURRENT_THEME);
			currentTheme.next("light");
			expect(currentTheme.value).toBe("light");
		});
		it("should provide CURRENT_THEME as a BehaviorSubject", (): void => {
			const currentTheme = TestBed.inject(tokens.CURRENT_THEME);
			expect(currentTheme).toBeInstanceOf(BehaviorSubject);
			expect(currentTheme.value).toBe("dark");
		});
	});
	describe("initializeApp", (): void => {
		it("should initialize app with configuration from dev mode", async (): Promise<void> => {
			const weatherApiKey = TestBed.inject(tokens.WEATHER_API_KEY);
			const initializer = tokens.initializeApp(weatherApiKey);
			const promise = initializer();

			httpMock
				.expectOne("./assets/configurations/configuration.json")
				.flush({ OpenWeatherApiKey: "test-api-key" });

			await promise;
			expect(weatherApiKey.value).toBe("test-api-key");
		});
		it("should initialize app with configuration from prod mode", async (): Promise<void> => {
			const weatherApiKey = TestBed.inject(tokens.WEATHER_API_KEY);
			const initializer = tokens.initializeApp(weatherApiKey);
			const promise = initializer();

			httpMock
				.expectOne("./assets/configurations/configuration.prod.json")
				.flush({ OpenWeatherApiKey: "prod-api-key" });

			await promise;
			expect(weatherApiKey.value).toBe("prod-api-key");
		});
		it("should handle error and use DUMMY_API_KEY", async (): Promise<void> => {
			const weatherApiKey = TestBed.inject(tokens.WEATHER_API_KEY);
			const initializer = tokens.initializeApp(weatherApiKey);
			const promise = initializer();

			httpMock.expectOne("./assets/configurations/configuration.json").error(new ProgressEvent("error"));

			await promise;
			expect(weatherApiKey.value).toBe(DUMMY_API_KEY);
		});
		it("should initialize app with empty configuration and DUMMY_API_KEY", async (): Promise<void> => {
			const weatherApiKey = TestBed.inject(tokens.WEATHER_API_KEY);
			const initializer = tokens.initializeApp(weatherApiKey);
			const promise = initializer();

			httpMock.expectOne("./assets/configurations/configuration.json").flush(null);

			await promise;
			expect(weatherApiKey.value).toBe(DUMMY_API_KEY);
		});
	});
});
