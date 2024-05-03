import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { getSearchMockProvider } from "../unit-test-utils/search.service.mock";
import { provideMockTheme } from "../unit-test-utils/token.mock";
import { city, forecastResult } from "../unit-test-utils/utils.mock";
import { ForecastComponent } from "./forecast.component";

const route = {
	data: new BehaviorSubject({
		0: {
			countryInfo: city,
			forecastResult: forecastResult,
			animationState: "forecastState",
		},
	}),
};

describe("ForecastComponent case success route", (): void => {
	let component: ForecastComponent;
	let router: Router;
	let fixture: ComponentFixture<ForecastComponent>;

	beforeEach(async (): Promise<void> => {
		await TestBed.configureTestingModule({
			imports: [ForecastComponent, NoopAnimationsModule],
			providers: [
				getSearchMockProvider(),
				provideMockTheme(),
				{ provide: ActivatedRoute, useValue: route },
				Router,
			],
		}).compileComponents();

		fixture = TestBed.createComponent(ForecastComponent);
		router = TestBed.inject(Router);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", (): void => {
		expect(component).toBeTruthy();
	});
	it("should set data from route", fakeAsync((): void => {
		tick(10);
		expect(component.city).toEqual(city);
		expect(component.forecastResult).toEqual(forecastResult);
		expect(component.errorInfo).toBeUndefined();
	}));
	it("should navigate to selected city adding data to navigation", (): void => {
		const routerSpy = spyOn(router, "navigateByUrl");
		component.navigateToCity(city);
		expect(routerSpy).toHaveBeenCalledWith(`/forecast/${city.id}`, {
			state: city,
		});
	});
});

const errorInRoute = {
	data: new BehaviorSubject({
		0: {
			errorStatus: 404,
			animationState: "forecastState",
		},
	}),
};
describe("ForecastComponent case error status", (): void => {
	let component: ForecastComponent;
	let fixture: ComponentFixture<ForecastComponent>;

	beforeEach(async (): Promise<void> => {
		await TestBed.configureTestingModule({
			imports: [ForecastComponent, NoopAnimationsModule],
			providers: [
				getSearchMockProvider(),
				provideMockTheme(),
				{ provide: ActivatedRoute, useValue: errorInRoute },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(ForecastComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", (): void => {
		expect(component).toBeTruthy();
	});
	it("should set error from route data", fakeAsync((): void => {
		tick(10);
		expect(component.city).toBeUndefined();
		expect(component.forecastResult).toBeUndefined();
		expect(component.errorInfo?.icon).toBe("search_off");
		expect(component.errorInfo?.text).toBe(
			"The city related to the wanted forecasts was not found. Please make another search in order to retrieve the right data."
		);
	}));
	describe("should set error info", (): void => {
		it("#case 400", (): void => {
			const errorInfo = component.setErrorInfo(400);
			expect(errorInfo.icon).toBe("error_outline");
			expect(errorInfo.text).toBe(
				"The forecasts were not retrieved due to an error in the structure of the request. Please retry."
			);
		});
		it("#case 401", (): void => {
			const errorInfo = component.setErrorInfo(401);
			expect(errorInfo.icon).toBe("policy");
			expect(errorInfo.text).toBe(
				"The forecasts were not retrieved, since the license is not valid, expired or missing."
			);
		});
		it("#case 404", (): void => {
			const errorInfo = component.setErrorInfo(404);
			expect(errorInfo.icon).toBe("search_off");
			expect(errorInfo.text).toBe(
				"The city related to the wanted forecasts was not found. Please make another search in order to retrieve the right data."
			);
		});
		it("#case 429", (): void => {
			const errorInfo = component.setErrorInfo(429);
			expect(errorInfo.icon).toBe("event_repeat");
			expect(errorInfo.text).toBe(
				"The forecasts were not retrieved, because too many requests were sent to the server. Please, consider to extend the license or wait some times."
			);
		});
		it("#case default", (): void => {
			const errorInfo = component.setErrorInfo(500);
			expect(errorInfo.icon).toBe("error_outline");
			expect(errorInfo.text).toBe("The forecasts were not retrieved due to an internal error.");
		});
	});
	it("should show components when the city is valued", fakeAsync((): void => {
		component.city = city;
		component.forecastResult = forecastResult;
		component.errorInfo = undefined;
		fixture.detectChanges();
		tick();
		const nativeElement = fixture.debugElement.nativeElement;
		const currentWeatherComponent: HTMLElement = nativeElement.querySelector("app-current-weather");
		const forecastFiveComponent: HTMLElement = nativeElement.querySelector("app-forecast-five");
		const temperatureChartComponent: HTMLElement = nativeElement.querySelector("app-temperature-chart");
		const precipitationChartComponent: HTMLElement = nativeElement.querySelector("app-precipitation-chart");
		expect(currentWeatherComponent).toBeTruthy();
		expect(forecastFiveComponent).toBeTruthy();
		expect(temperatureChartComponent).toBeTruthy();
		expect(precipitationChartComponent).toBeTruthy();
	}));
});
