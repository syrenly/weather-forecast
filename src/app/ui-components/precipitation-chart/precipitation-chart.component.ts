import { DatePipe } from "@angular/common";
import {
	AfterViewInit,
	Component,
	DestroyRef,
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
export class PrecipitationChartComponent
	extends ChartBase
	implements OnChanges, AfterViewInit
{
	@Input() forecastResult: IFiveDaysForecast | undefined;
	canvasId = "precipitationChart";
	rainPrecipitations: number[] = [];
	snowPrecipitations: number[] = [];
	xAxis: string[] = [];
	datePipe: DatePipe;

	constructor(
		@Inject(LOCALE_ID) private readonly localeId: string,
		@Inject(CURRENT_THEME)
		themeSubject: BehaviorSubject<Theme>,
		destroyRef: DestroyRef
	) {
		super(themeSubject, destroyRef);
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (
			changes["forecastResult"] &&
			!changes["forecastResult"].isFirstChange()
		) {
			this.calculateDataSets();
			this.createChart();
		}
	}

	override ngAfterViewInit(): void {
		this.datePipe = new DatePipe(this.localeId);
		this.calculateDataSets();
		super.ngAfterViewInit();
	}
	/**
	 * Calculate the data to be injected inside the chart
	 */
	private calculateDataSets(): void {
		const list = this.forecastResult.list;
		this.rainPrecipitations = [];
		this.snowPrecipitations = [];
		this.xAxis = [];
		list.forEach((l): void => {
			console.log(l);
			const snow = l.snow && l.snow["3h"] > 0 ? l.snow["3h"] : 0;
			const rain = l.rain && l.rain["3h"] > 0 ? l.rain["3h"] : 0;
			const { dt } = l;
			const date = this.datePipe.transform(dt * 1000, "MMM, d HH:mm");
			this.xAxis.push(date);
			this.rainPrecipitations.push(rain);
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
}
