import { ElementRef } from "@angular/core";
import { Chart } from "chart.js";
import { BehaviorSubject } from "rxjs";
import { Theme } from "../tokens";
import { ChartBase } from "./chart.base";

class MockChartBase extends ChartBase {
	canvasId = "mockCanvas";

	createChart(): void {
		this.chart = new Chart(this.elementRef.nativeElement, {
			type: "bar",
			data: { labels: [], datasets: [] },
			options: {},
		});
	}
}

describe("ChartBase", () => {
	let mockThemeSubject: BehaviorSubject<Theme>;
	let mockDestroyRef: any;
	let mockElementRef: ElementRef;
	let chartBase: MockChartBase;

	beforeEach(() => {
		mockThemeSubject = new BehaviorSubject<Theme>("light");
		mockDestroyRef = {
			destroy$: new BehaviorSubject<void>(undefined),
			onDestroy: (): void => mockDestroyRef.destroy$.next(),
		};
		mockElementRef = new ElementRef(document.createElement("canvas"));
		chartBase = new MockChartBase(mockThemeSubject, mockDestroyRef, mockElementRef);
	});

	it("should create the chart on initialization", () => {
		spyOn(chartBase, "createChart").and.callThrough();
		chartBase.ngAfterViewInit();
		expect(chartBase.createChart).toHaveBeenCalled();
		expect(chartBase.chart).toBeDefined();
	});

	it("should update chart colors when theme changes", () => {
		chartBase.ngAfterViewInit();
		spyOn<any>(chartBase, "updateColors").and.callThrough();
		mockThemeSubject.next("dark");
		expect(chartBase["updateColors"]).toHaveBeenCalled();
		expect(chartBase.currentTheme).toBe("dark");
	});

	it("should not update colors if chart is not defined", () => {
		spyOn<any>(chartBase, "updateColors").and.callThrough();
		chartBase.chart = undefined;
		chartBase["updateColors"]();
		expect(chartBase.chart).toBeUndefined();
	});
});
