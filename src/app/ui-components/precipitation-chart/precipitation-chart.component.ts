import { DatePipe } from "@angular/common";
import {
	AfterViewInit,
	Component,
	DestroyRef,
	ElementRef,
	Inject,
	Input,
	LOCALE_ID,
	OnChanges,
	SimpleChanges,
} from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import Chart from "chart.js/auto";
import { BehaviorSubject } from "rxjs";
import { CURRENT_THEME, Theme } from "../../tokens";
import { IFiveDaysForecast } from "../../types/forecast-types";
import { MILLISECONDS_IN_SECOND } from "../chart-utils";
import { ChartBase } from "../chart.base";
/**
 * PrecipitationChartComponent shows with a ChartJS instance the linear graphic of the precipitations (rain and snow) in 5 days
 * Y axis is the precipitations
 * X axis is time
 */
@Component({
	selector: "app-precipitation-chart",
	imports: [MatCardModule],
	templateUrl: "./precipitation-chart.component.html",
	styleUrl: "./precipitation-chart.component.scss",
})
export class PrecipitationChartComponent extends ChartBase implements OnChanges, AfterViewInit {
	@Input() forecastResult: IFiveDaysForecast | undefined;
	canvasId = "precipitationChart";
	// Y data for rain precipitations line
	rainPrecipitations: number[] = [];
	// Y data for snow precipitations line
	snowPrecipitations: number[] = [];
	// X data for time
	time: string[] = [];
	datePipe!: DatePipe;

	constructor(
		@Inject(LOCALE_ID) private readonly localeId: string,
		@Inject(CURRENT_THEME) themeSubject: BehaviorSubject<Theme>,
		destroyRef: DestroyRef,
		elementRef: ElementRef
	) {
		super(themeSubject, destroyRef, elementRef);
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes["forecastResult"] && !changes["forecastResult"].isFirstChange()) {
			this.calculateDataSets();
			this.createChart();
		}
	}

	override ngAfterViewInit(): void {
		this.calculateDataSets();
		super.ngAfterViewInit();
	}
	/**
	 *Calculate data for Y axis, to generate 2 lines: precipitation of rain and snow every 3 hours for 5 days
	 */
	calculateDataSets(): void {
		if (!this.datePipe) {
			this.initializeDatePipe();
		}
		const list = this.forecastResult?.list || [];
		this.rainPrecipitations = [];
		this.snowPrecipitations = [];
		this.time = [];

		list.forEach((l): void => {
			const { dt } = l;
			// if date is absent, do not add the data
			if (!dt) {
				console.warn(`Date not found for forecast ${l}`);
				return;
			}
			const date = this.datePipe.transform(dt * MILLISECONDS_IN_SECOND, "MMM, d HH") as string;
			this.time.push(date);

			const rain = l.rain?.["3h"] || 0;
			this.rainPrecipitations.push(rain);

			const snow = l.snow?.["3h"] || 0;
			this.snowPrecipitations.push(snow);
		});
	}
	/** Create an instance of ChartJs object and add to it dataset for precipitation of rain and snow */
	createChart(): void {
		const data = {
			labels: this.time,
			datasets: [
				{ data: this.rainPrecipitations, label: "Rain" },
				{ data: this.snowPrecipitations, label: "Snow" },
			],
		};
		if (this.chart) {
			this.chart.data = data;
			this.chart.update();
			return;
		}
		this.chart = new Chart(this.canvasId, {
			type: "line",
			data,
			options: {},
		});
		// add configuration to style the chart based on the current theme
		this.updateColors();
	}

	private initializeDatePipe(): void {
		this.datePipe = new DatePipe(this.localeId);
	}
}
