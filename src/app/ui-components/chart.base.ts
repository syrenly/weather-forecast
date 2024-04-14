import { AfterViewInit, DestroyRef, Directive, Inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Chart } from "chart.js";
import { BehaviorSubject } from "rxjs";
import { CURRENT_THEME, Theme } from "../tokens";
/**
 * Base class for the components that implement a ChartJS object
 */
@Directive()
export abstract class ChartBase implements AfterViewInit {
	abstract canvasId: string;
	chart: Chart = null;
	currentTheme!: Theme;

	constructor(
		@Inject(CURRENT_THEME)
		protected readonly themeSubject: BehaviorSubject<Theme>,
		protected readonly destroyRef: DestroyRef
	) {}

	ngAfterViewInit(): void {
		this.themeSubject
			.asObservable()
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe((currentTheme): void => {
				this.currentTheme = currentTheme;
				if (this.chart) {
					this.updateColors();
				} else {
					this.createChart();
				}
			});
	}

	protected updateColors(): void {
		if (this.currentTheme === "light") {
			this.chart.options = {
				elements: { line: { tension: 0 } },
				maintainAspectRatio: false,
				responsive: true,
			};
		} else {
			const color = "#FFFFFF";
			this.chart.options = {
				elements: { line: { tension: 0 } },
				maintainAspectRatio: false,
				responsive: true,
				plugins: {
					legend: {
						labels: {
							color,
						},
					},
				},
				scales: {
					x: {
						display: true,
						ticks: {
							display: true,
							color,
						},
						grid: {
							display: true,
							color,
						},
					},
					y: {
						display: true,
						ticks: {
							display: true,
							color,
							stepSize: 1,
						},
						grid: {
							display: true,
							color,
						},
					},
				},
			};
		}
		this.chart.update();
	}

	abstract createChart(): void;
}
