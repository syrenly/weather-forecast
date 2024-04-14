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
import { IFiveDaysForecast } from "../../types/forecast-types";

@Component({
	selector: "app-precipitation-chart",
	standalone: true,
	imports: [MatCardModule, DatePipe],
	templateUrl: "./precipitation-chart.component.html",
	styleUrl: "./precipitation-chart.component.scss",
})
export class PrecipitationChartComponent implements OnChanges, AfterViewInit {
	@Input() forecastResult: IFiveDaysForecast | undefined;
	chart: Chart = null;
	canvasId = "precipitationChart";
	rainPrecipitations: number[] = [];
	snowPrecipitations: number[] = [];
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
		this.rainPrecipitations = [];
		this.snowPrecipitations = [];
		this.xAxis = [];
		list.forEach((l) => {
			const snow = l["snow.?3h"] ?? 0;
			const rain = l["rain.?3h"] ?? 0;
			const { pop = 0, dt } = l;
			const date = this.datePipe.transform(dt * 1000, "MMM, d HH:mm");
			this.xAxis.push(date);
			this.rainPrecipitations.push(rain);
			this.snowPrecipitations.push(snow);
		});
	}

	private createChart(): void {
		this.chart = new Chart(this.canvasId, {
			type: "line",
			data: {
				labels: this.xAxis,
				datasets: [
					{ data: this.rainPrecipitations, label: "Rain" },
					{ data: this.snowPrecipitations, label: "Snow" },
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
