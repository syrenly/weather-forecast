import { AfterViewInit, DestroyRef, Directive, ElementRef, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Chart } from "chart.js";
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

	// #region Dependencies
	readonly themeSubject = inject(CURRENT_THEME);
	protected readonly elementRef: ElementRef = inject(ElementRef);
	private readonly destroyRef: DestroyRef = inject(DestroyRef);
	// #endregion

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
