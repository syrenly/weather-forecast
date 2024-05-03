import { ComponentFixture, TestBed } from "@angular/core/testing";
import { forecastResult } from "../../unit-test-utils/utils.mock";
import { ForecastFiveComponent, groupBy } from "./forecast-five.component";

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
	it("should test #groupBy; create a dictionary with 2 keys: even numbers and odd numbers", (): void => {
		const array = [...Array(10).keys()];
		const predicate = (num: number, index: number, array: number[]): string =>
			array[index] % 2 === 0 ? "even" : "odd";
		const groups = groupBy(array, predicate);
		expect(groups).toEqual({ even: [0, 2, 4, 6, 8], odd: [1, 3, 5, 7, 9] });
	});
});
