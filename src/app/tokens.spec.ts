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

	describe("initializeApp", () => {
		it("should initialize the app and update WEATHER_API_KEY with the configuration value", (done): void => {
			TestBed.resetTestingModule();
			const mockWeatherApiKeySubject = new BehaviorSubject<string>("");
			const initializer = tokens.initializeApp(mockWeatherApiKeySubject, {
				OpenWeatherApiKey: "test-api-key",
			});
			initializer().subscribe(() => {
				expect(mockWeatherApiKeySubject.value).toBe("test-api-key");
				done();
			});
		});

		it("should initialize the app and update WEATHER_API_KEY with DUMMY_API_KEY if configuration is missing", (done): void => {
			TestBed.resetTestingModule();
			const mockWeatherApiKeySubject = new BehaviorSubject<string>("");
			const initializer = tokens.initializeApp(mockWeatherApiKeySubject, {
				OpenWeatherApiKey: "",
			});
			initializer().subscribe(() => {
				expect(mockWeatherApiKeySubject.value).toBe(DUMMY_API_KEY);
				done();
			});
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
});
