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
import { ChartBase } from "../chart.base";
/**
 * PrecipitationChartComponent shows with a ChartJS instance the linear graphic of the precipitations (rain and snow) in 5 days
 */
@Component({
	selector: "app-precipitation-chart",
	standalone: true,
	imports: [MatCardModule, DatePipe],
	templateUrl: "./precipitation-chart.component.html",
	styleUrl: "./precipitation-chart.component.scss",
})
export class PrecipitationChartComponent extends ChartBase implements OnChanges, AfterViewInit {
	@Input() forecastResult: IFiveDaysForecast | undefined;
	canvasId = "precipitationChart";
	rainPrecipitations: number[] = [];
	snowPrecipitations: number[] = [];
	xAxis: string[] = [];
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
	 * Calculate the data to be injected inside the chart
	 */
	calculateDataSets(): void {
		if (!this.datePipe) {
			this.initializeDatePipe();
		}
		const list = this.forecastResult?.list || [];
		this.rainPrecipitations = [];
		this.snowPrecipitations = [];
		this.xAxis = [];

		list.forEach((l): void => {
			const { dt } = l;
			// if date is absent, do not add the data
			if (!dt) {
				console.warn(`Date not found for forecast ${l}`);
				return;
			}
			const date = this.datePipe.transform(dt * 1000, "MMM, d HH") as string;
			this.xAxis.push(date);

			const rain = l.rain?.["3h"] || 0;
			this.rainPrecipitations.push(rain);

			const snow = l.snow?.["3h"] || 0;
			this.snowPrecipitations.push(snow);
		});
	}
	createChart(): void {
		const data = {
			labels: this.xAxis,
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
		this.updateColors();
	}

	private initializeDatePipe(): void {
		this.datePipe = new DatePipe(this.localeId);
	}
}
