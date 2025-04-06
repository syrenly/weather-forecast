import { DatePipe, DecimalPipe, NgOptimizedImage, NgTemplateOutlet, TitleCasePipe } from "@angular/common";
import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ToCardinalPointPipe } from "../../pipes/to-cardinal-point.pipe";
import { WeatherPipe } from "../../pipes/weather.pipe";
import { IMainInfo } from "../../types/city-types";
import { IFiveDaysForecast, IThreeHoursForecast } from "../../types/forecast-types";
import { IWeather } from "../../types/types";
/**
 * ForecastFiveComponent shows weather forecast for 5 days. Each day is shown inside a tab; every row is the summary of forecast for 3 hours in that specific day
 */
@Component({
	selector: "app-forecast-five",
	imports: [
		DatePipe,
		DecimalPipe,
		MatIconModule,
		MatCardModule,
		MatDividerModule,
		MatTooltipModule,
		MatTabsModule,
		NgOptimizedImage,
		NgTemplateOutlet,
		TitleCasePipe,
		ToCardinalPointPipe,
		WeatherPipe,
	],
	templateUrl: "./forecast-five.component.html",
	styleUrl: "./forecast-five.component.scss",
})
export class ForecastFiveComponent implements OnChanges {
	@Input() forecastResult: IFiveDaysForecast | undefined;
	mainWeather: IWeather | undefined;
	mainInfo: IMainInfo | undefined;
	// group all forecasts by day
	daysDictionary: Partial<Record<string, IThreeHoursForecast[]>> = {};
	days: string[] = [];

	ngOnChanges(changes: SimpleChanges): void {
		if (changes["forecastResult"]) {
			const list: IThreeHoursForecast[] = changes["forecastResult"].currentValue?.list || [];
			this.daysDictionary =
				list.length === 0
					? {}
					: Object.groupBy(list, (v): string => {
							const [date] = v.dt_txt.split(" ");
							return date;
						});
			this.days = Object.keys(this.daysDictionary);
		}
	}
}
