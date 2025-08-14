import { Component, ElementRef } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Chart } from "chart.js";
import { BehaviorSubject } from "rxjs";
import { Theme } from "../tokens";
import { provideMockTheme } from "../unit-test-utils/token.mock";
import { ChartBase } from "./chart.base";

@Component({})
class MockChartBaseComponent extends ChartBase {
	canvasId = "mockCanvas";
	override themeSubject = new BehaviorSubject<Theme>("light");
	override elementRef = new ElementRef(document.createElement("canvas"));

	createChart(): void {
		this.chart = new Chart(this.elementRef.nativeElement, {
			type: "bar",
			data: { labels: [], datasets: [] },
			options: {},
		});
	}
}

describe("ChartBase", () => {
	let component: MockChartBaseComponent;
	let fixture: ComponentFixture<MockChartBaseComponent>;

	beforeEach(async (): Promise<void> => {
		await TestBed.configureTestingModule({
			imports: [MockChartBaseComponent],
			providers: [provideMockTheme()],
		}).compileComponents();

		fixture = TestBed.createComponent(MockChartBaseComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create the chart on initialization", () => {
		spyOn(component, "createChart").and.callThrough();
		// destroy chart if it was already created
		if (component.chart) {
			component.chart.destroy();
			component.chart = undefined;
		}
		component.ngAfterViewInit();
		expect(component.createChart).toHaveBeenCalled();
		expect(component.chart).toBeDefined();
	});

	it("should update chart colors when theme changes", () => {
		component.ngAfterViewInit();
		spyOn<any>(component, "updateColors").and.callThrough();
		component.themeSubject.next("dark");
		expect(component["updateColors"]).toHaveBeenCalled();
		expect(component.currentTheme).toBe("dark");
	});

	it("should not update colors if chart is not defined", () => {
		spyOn<any>(component, "updateColors").and.callThrough();
		component.chart = undefined;
		component["updateColors"]();
		expect(component.chart).toBeUndefined();
	});
});
