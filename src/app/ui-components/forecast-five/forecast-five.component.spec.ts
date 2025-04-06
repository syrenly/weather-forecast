import { ComponentFixture, TestBed } from "@angular/core/testing";
import { IThreeHoursForecast } from "../../types/forecast-types";
import { forecastResult } from "../../unit-test-utils/utils.mock";
import { ForecastFiveComponent } from "./forecast-five.component";

describe("ForecastFiveComponent", (): void => {
	let component: ForecastFiveComponent;
	let fixture: ComponentFixture<ForecastFiveComponent>;

	beforeEach(async (): Promise<void> => {
		await TestBed.configureTestingModule({
			imports: [ForecastFiveComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(ForecastFiveComponent);
		component = fixture.componentInstance;
		component.forecastResult = forecastResult;
		fixture.detectChanges();
	});

	it("should create", (): void => {
		expect(component).toBeTruthy();
	});
	it("should test #ngOnChanges; case forecasts", (): void => {
		component.ngOnChanges({
			forecastResult: {
				currentValue: forecastResult,
				previousValue: null,
				isFirstChange: (): boolean => false,
				firstChange: false,
			},
		});
		expect(component.days?.length).toBe(5);
		const dictionaryKeys = Object.keys(component.daysDictionary);
		expect(dictionaryKeys).toEqual(["2024-04-15", "2024-04-16", "2024-04-17", "2024-04-18", "2024-04-19"]);
	});
	it("should test #ngOnChanges; case no forecast", (): void => {
		component.ngOnChanges({
			forecastResult: {
				currentValue: {
					cod: "200",
					message: 0,
					cnt: 0,
					list: [],
					city: null,
				},
				previousValue: null,
				isFirstChange: (): boolean => false,
				firstChange: false,
			},
		});
		expect(component.days?.length).toBe(0);
		expect(component.daysDictionary).toEqual({});

		component.ngOnChanges({
			forecastResult: {
				currentValue: null,
				previousValue: null,
				isFirstChange: (): boolean => false,
				firstChange: false,
			},
		});
		expect(component.days?.length).toBe(0);
		expect(component.daysDictionary).toEqual({});
	});

	it("should handle undefined forecastResult gracefully", (): void => {
		component.ngOnChanges({
			forecastResult: {
				currentValue: undefined,
				previousValue: null,
				isFirstChange: (): boolean => false,
				firstChange: false,
			},
		});
		expect(component.days?.length).toBe(0);
		expect(component.daysDictionary).toEqual({});
	});

	it("should handle forecastResult with multiple valid dates", (): void => {
		component.ngOnChanges({
			forecastResult: {
				currentValue: {
					cod: "200",
					message: 0,
					cnt: 3,
					list: [
						{ dt_txt: "2024-04-15 12:00:00" },
						{ dt_txt: "2024-04-15 15:00:00" },
						{ dt_txt: "2024-04-16 12:00:00" },
					] as IThreeHoursForecast[],
					city: null,
				},
				previousValue: null,
				isFirstChange: (): boolean => false,
				firstChange: false,
			},
		});
		expect(component.days?.length).toBe(2);
		expect(component.daysDictionary).toEqual({
			"2024-04-15": [
				{ dt_txt: "2024-04-15 12:00:00" },
				{ dt_txt: "2024-04-15 15:00:00" },
			] as IThreeHoursForecast[],
			"2024-04-16": [{ dt_txt: "2024-04-16 12:00:00" }] as IThreeHoursForecast[],
		});
	});

	it("should handle forecastResult with duplicate dates", (): void => {
		component.ngOnChanges({
			forecastResult: {
				currentValue: {
					cod: "200",
					message: 0,
					cnt: 2,
					list: [
						{ dt_txt: "2024-04-15 12:00:00" },
						{ dt_txt: "2024-04-15 12:00:00" },
					] as IThreeHoursForecast[],
					city: null,
				},
				previousValue: null,
				isFirstChange: (): boolean => false,
				firstChange: false,
			},
		});
		expect(component.days?.length).toBe(1);
		expect(component.daysDictionary).toEqual({
			"2024-04-15": [
				{ dt_txt: "2024-04-15 12:00:00" },
				{ dt_txt: "2024-04-15 12:00:00" },
			] as IThreeHoursForecast[],
		});
	});
});
