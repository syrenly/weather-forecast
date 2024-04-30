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
		expect(component.errorStatus).toBeUndefined();
	}));
	it("should navigate to selected city", (): void => {
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
		expect(component.errorStatus).toBe(404);
	}));
});
