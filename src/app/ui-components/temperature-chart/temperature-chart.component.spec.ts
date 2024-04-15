import { LOCALE_ID } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CURRENT_THEME, currentTheme } from "../../tokens";
import { forecastResult } from "../../unit-test-utils/utils.mock";
import { TemperatureChartComponent } from "./temperature-chart.component";

describe("TemperatureChartComponent", () => {
	let component: TemperatureChartComponent;
	let fixture: ComponentFixture<TemperatureChartComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TemperatureChartComponent],
			providers: [
				{ provide: LOCALE_ID, useValue: "en" },
				{ provide: CURRENT_THEME, useFactory: currentTheme },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(TemperatureChartComponent);
		component = fixture.componentInstance;
		component.forecastResult = forecastResult;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should test #ngOnChanges", () => {
		const spyCalculate = spyOn<any>(component, "calculateDataSets");
		const spyCreateChart = spyOn(component, "createChart");
		component.ngOnChanges({
			forecastResult: {
				currentValue: forecastResult,
				previousValue: null,
				isFirstChange: () => false,
				firstChange: false,
			},
		});
		expect(spyCalculate).toHaveBeenCalled();
		expect(spyCreateChart).toHaveBeenCalled();
	});
	it("should test #calculateDataSets", () => {
		component["calculateDataSets"]();
		const numberOfPoints = component.forecastResult.list.length;
		expect(component.maxTemperature.length).toBe(numberOfPoints);
		expect(component.minTemperature.length).toBe(numberOfPoints);
		expect(component.meanTemperature.length).toBe(numberOfPoints);
		expect(component.xAxis.length).toBe(numberOfPoints);
	});
	it("should check properties in chart - light theme", () => {
		component.currentTheme = "light";
		component.createChart();
		fixture.detectChanges();
		expect(component.chart.options.elements.line.tension).toBe(0);
		expect(component.chart.options.maintainAspectRatio).toBeFalse();
		expect(component.chart.options.responsive).toBeTrue();
	});
	it("should check properties in chart dark theme", () => {
		component.currentTheme = "dark";
		component.createChart();
		fixture.detectChanges();
		expect(component.chart.options.elements.line.tension).toBe(0);
		expect(component.chart.options.maintainAspectRatio).toBeFalse();
		expect(component.chart.options.responsive).toBeTrue();
		const color = "#FFFFFF";
		expect(component.chart.options.plugins.legend.labels.color).toBe(color);
		expect(component.chart.options.scales["x"].ticks.color).toBe(color);
		expect(component.chart.options.scales["x"].grid.color).toBe(color);
		expect(component.chart.options.scales["y"].ticks.color).toBe(color);
		expect(component.chart.options.scales["y"].grid.color).toBe(color);
	});
});
