import { AfterViewInit, DestroyRef, Directive, ElementRef, Inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Chart } from "chart.js";
import { BehaviorSubject } from "rxjs";
import { CURRENT_THEME, Theme } from "../tokens";
import { darkOptions, lightOptions, mainOptions } from "./chart-utils";
/**
 * Base class for the components that implement a ChartJS object
 */
@Directive()
export abstract class ChartBase implements AfterViewInit {
	abstract canvasId: string;
	chart: Chart | undefined;
	currentTheme!: Theme;

	constructor(
		@Inject(CURRENT_THEME)
		protected readonly themeSubject: BehaviorSubject<Theme>,
		protected readonly destroyRef: DestroyRef,
		protected readonly elementRef: ElementRef
	) {}

	ngAfterViewInit(): void {
		this.themeSubject.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((currentTheme): void => {
			this.currentTheme = currentTheme;
			this.chart ? this.updateColors() : this.createChart();
		});
	}
	/** Update colors of chart to fit the current theme. It sets again the options to override the old ones */
	protected updateColors(): void {
		if (!this.chart) {
			return;
		}
		this.chart.options = { ...mainOptions, ...(this.currentTheme === "light" ? lightOptions : darkOptions) };
		this.chart.update();
	}

	abstract createChart(): void;
}
