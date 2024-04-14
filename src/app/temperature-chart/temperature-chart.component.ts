import { DatePipe } from "@angular/common";
import {
	AfterViewInit,
	Component,
	Inject,
	Input,
	LOCALE_ID,
	OnChanges,
	SimpleChanges,
} from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import Chart from "chart.js/auto";
import { IFiveDaysForecast } from "../types/forecast-types";

@Component({
	selector: "app-temperature-chart",
	standalone: true,
	imports: [MatCardModule, DatePipe],
	templateUrl: "./temperature-chart.component.html",
	styleUrl: "./temperature-chart.component.scss",
})
export class TemperatureChartComponent implements OnChanges, AfterViewInit {
	@Input() forecastResult: IFiveDaysForecast | undefined;
	chart: Chart = null;
	canvasId = "temperatureChart";
	meanTemperature: number[] = [];
	maxTemperature: number[] = [];
	minTemperature: number[] = [];
	xAxis: string[] = [];
	datePipe: DatePipe;
	constructor(@Inject(LOCALE_ID) private readonly localeId: string) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (
			changes["forecastResult"] &&
			!changes["forecastResult"].isFirstChange()
		) {
			// TODO errors/void etc
			this.calculateDataSets();
			this.createChart();
		}
	}
	ngAfterViewInit(): void {
		this.datePipe = new DatePipe(this.localeId);
		this.calculateDataSets();
		this.createChart();
	}

	private calculateDataSets(): void {
		const list = this.forecastResult.list;
		this.meanTemperature = [];
		this.maxTemperature = [];
		this.minTemperature = [];
		this.xAxis = [];
		list.forEach((l) => {
			const {
				main: { temp, temp_max, temp_min },
				dt,
			} = l;
			const date = this.datePipe.transform(dt * 1000, "MMM, d HH:mm");
			this.xAxis.push(date);
			this.meanTemperature.push(temp);
			this.maxTemperature.push(temp_max);
			this.minTemperature.push(temp_min);
		});
	}

	private createChart(): void {
		this.chart = new Chart(this.canvasId, {
			type: "line",

			data: {
				labels: this.xAxis,
				datasets: [
					{ data: this.meanTemperature, label: "Mean" },
					{ data: this.maxTemperature, label: "Max" },
					{ data: this.minTemperature, label: "Min" },
				],
			},
			options: {
				elements: { line: { tension: 0 } },
				maintainAspectRatio: false,
				responsive: true,
			},
		});
	}
}
