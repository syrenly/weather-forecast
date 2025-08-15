import { ComponentFixture, TestBed } from "@angular/core/testing";
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
		fixture.detectChanges();
	});

	it("should create", (): void => {
		expect(component).toBeTruthy();
	});

	it("should group forecasts by day correctly", (): void => {
		const mockForecast = {
			list: [
				{ dt_txt: "2023-03-01 12:00:00", weather: "Sunny" },
				{ dt_txt: "2023-03-01 15:00:00", weather: "Cloudy" },
				{ dt_txt: "2023-03-02 12:00:00", weather: "Rainy" },
			],
		};

		fixture.componentRef.setInput("forecastResult", mockForecast);
		fixture.detectChanges();
		const daysDictionary = component.daysDictionary();
		expect(Object.keys(daysDictionary)).toEqual(["2023-03-01", "2023-03-02"]);
		expect(daysDictionary["2023-03-01"]?.length).toBe(2);
		expect(daysDictionary["2023-03-02"]?.length).toBe(1);
	});

	it("should return an empty dictionary if forecastResult is undefined", (): void => {
		fixture.componentRef.setInput("forecastResult", undefined);

		const daysDictionary = component.daysDictionary();
		expect(daysDictionary).toEqual({});
	});

	it("should return an empty dictionary if forecastResult list is empty", (): void => {
		fixture.componentRef.setInput("forecastResult", { list: [] });

		const daysDictionary = component.daysDictionary();
		expect(daysDictionary).toEqual({});
	});

	it("should compute days correctly", (): void => {
		const mockForecast = {
			list: [
				{ dt_txt: "2023-03-01 12:00:00", weather: "Sunny" },
				{ dt_txt: "2023-03-02 12:00:00", weather: "Rainy" },
			],
		};
		fixture.componentRef.setInput("forecastResult", mockForecast);

		const days = component.days();
		expect(days).toEqual(["2023-03-01", "2023-03-02"]);
	});
});
