import { ComponentFixture, TestBed } from "@angular/core/testing";
import { IFiveDaysForecast } from "../../types/forecast-types";
import { provideMockLocaleId, provideMockTheme } from "../../unit-test-utils/token.mock";
import { forecastResult } from "../../unit-test-utils/utils.mock";
import { PrecipitationChartComponent } from "./precipitation-chart.component";

describe("PrecipitationChartComponent", (): void => {
	let component: PrecipitationChartComponent;
	let fixture: ComponentFixture<PrecipitationChartComponent>;

	beforeEach(async (): Promise<void> => {
		await TestBed.configureTestingModule({
			imports: [PrecipitationChartComponent],
			providers: [provideMockLocaleId(), provideMockTheme()],
		}).compileComponents();

		fixture = TestBed.createComponent(PrecipitationChartComponent);
		component = fixture.componentInstance;
		component.forecastResult = forecastResult;
		fixture.detectChanges();
	});

	it("should create", (): void => {
		expect(component).toBeTruthy();
	});

	it("should test #ngOnChanges", (): void => {
		const spyCalculate = spyOn(component, "calculateDataSets");
		const spyCreateChart = spyOn(component, "createChart");
		component.ngOnChanges({
			forecastResult: {
				currentValue: forecastResult,
				previousValue: null,
				isFirstChange: (): boolean => false,
				firstChange: false,
			},
		});
		expect(spyCalculate).toHaveBeenCalled();
		expect(spyCreateChart).toHaveBeenCalled();
	});
	it("should test #calculateDataSets", (): void => {
		component.calculateDataSets();
		const numberOfPoints = component.forecastResult?.list?.length || 0;
		expect(component.rainPrecipitations.length).toBe(numberOfPoints);
		expect(component.snowPrecipitations.length).toBe(numberOfPoints);
		expect(component.time.length).toBe(numberOfPoints);
		expect(component.datePipe).not.toBeNull();
	});
	it("should not calculate data sets in #calculateDataSets", (): void => {
		component.forecastResult = undefined;
		component.calculateDataSets();
		expect(component.rainPrecipitations.length).toBe(0);
		expect(component.snowPrecipitations.length).toBe(0);
		expect(component.time.length).toBe(0);
	});
	it("should show warn in #calculateDataSets when the data are broken", (): void => {
		const consoleSpy = spyOn(window.console, "warn");
		const newForecasts: IFiveDaysForecast = JSON.parse(JSON.stringify(forecastResult));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		newForecasts.list[0].dt = null as any;
		component.forecastResult = newForecasts;
		component.calculateDataSets();
		expect(consoleSpy).toHaveBeenCalled();
	});
	it("should check properties in chart - light theme", (): void => {
		component.currentTheme = "light";
		component.createChart();
		fixture.detectChanges();
		const options = component.chart?.options;
		expect(options?.elements?.line?.tension).toBe(0);
		expect(options?.maintainAspectRatio).toBeFalse();
		expect(options?.responsive).toBeTrue();
	});
	it("should check properties in chart dark theme", (): void => {
		component.currentTheme = "dark";
		component.createChart();
		fixture.detectChanges();
		const options = component.chart?.options;
		expect(options?.elements?.line?.tension).toBe(0);
		expect(options?.maintainAspectRatio).toBeFalse();
		expect(options?.responsive).toBeTrue();
		const color = "#FFFFFF";
		const scales = options?.scales;
		expect(options?.plugins?.legend?.labels?.color).toBe(color);
		expect(scales?.["x"]?.ticks?.color).toBe(color);
		expect(scales?.["x"]?.grid?.color).toBe(color);
		expect(scales?.["y"]?.ticks?.color).toBe(color);
		expect(scales?.["y"]?.grid?.color).toBe(color);
	});
});
