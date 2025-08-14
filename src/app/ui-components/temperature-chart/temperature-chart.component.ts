import { DatePipe } from "@angular/common";
import { AfterViewInit, Component, inject, Input, LOCALE_ID, OnChanges, SimpleChanges } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import Chart from "chart.js/auto";
import { IFiveDaysForecast } from "../../types/forecast-types";
import { MILLISECONDS_IN_SECOND } from "../chart-utils";
import { ChartBase } from "../chart.base";

/**
 * TemperatureChartComponent shows with a ChartJS instance the linear graphic of the temperature (mean, max and min) in 5 days
 * Y axis is the temperature
 * X axis is time
 */
@Component({
	selector: "app-temperature-chart",
	imports: [MatCardModule],
	templateUrl: "./temperature-chart.component.html",
	styleUrl: "./temperature-chart.component.scss",
})
export class TemperatureChartComponent extends ChartBase implements OnChanges, AfterViewInit {
	@Input() forecastResult: IFiveDaysForecast | undefined;
	canvasId = "temperatureChart";
	// Y data for mean temperature line
	meanTemperature: number[] = [];
	// Y data for max temperature line
	maxTemperature: number[] = [];
	// Y data for min temperature line
	minTemperature: number[] = [];
	// X data for time
	time: string[] = [];
	datePipe!: DatePipe;

	// #region Dependencies
	private readonly localeId = inject(LOCALE_ID);
	// #endregion

	ngOnChanges(changes: SimpleChanges): void {
		if (changes["forecastResult"] && !changes["forecastResult"].isFirstChange()) {
			this.calculateDataSets();
			this.createChart();
		}
	}
	override ngAfterViewInit(): void {
		this.datePipe = new DatePipe(this.localeId);
		this.calculateDataSets();
		super.ngAfterViewInit();
	}
	/** Calculate data for Y axis, to generate 3 lines: min temperatures, max temperatures and mean temperatures every 3 hours for 5 days */
	calculateDataSets(): void {
		// forecast data
		const list = this.forecastResult?.list || [];
		this.meanTemperature = [];
		this.maxTemperature = [];
		this.minTemperature = [];
		this.time = [];
		list.forEach((l): void => {
			const {
				main: { temp, temp_max, temp_min },
				dt,
			} = l;
			// if date is absent, do not add the data
			if (!dt) {
				console.warn(`Date not found for forecast ${l}`);
				return;
			}
			const date = this.datePipe.transform(dt * MILLISECONDS_IN_SECOND, "MMM, d HH") as string;
			this.time.push(date);
			this.meanTemperature.push(temp);
			this.maxTemperature.push(temp_max);
			this.minTemperature.push(temp_min);
		});
	}
	/** Create an instance of ChartJs object and add to it dataset for min, max and mean temperature */
	createChart(): void {
		const data = {
			labels: this.time,
			datasets: [
				{ data: this.meanTemperature, label: "Mean" },
				{ data: this.maxTemperature, label: "Max" },
				{ data: this.minTemperature, label: "Min" },
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
}
