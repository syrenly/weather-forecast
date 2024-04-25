import {
	AsyncPipe,
	DatePipe,
	DecimalPipe,
	JsonPipe,
	NgOptimizedImage,
	NgTemplateOutlet,
	TitleCasePipe,
} from "@angular/common";
import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { FlagPipe } from "../../pipes/flag.pipe";
import { WeatherPipe } from "../../pipes/weather.pipe";
import { IMainInfo } from "../../types/city-types";
import {
	IFiveDaysForecast,
	IThreeHoursForecast,
} from "../../types/forecast-types";
import { IWeather } from "../../types/types";
/**
 * ForecastFiveComponent shows weather forecast for 5 days. Each day is shown inside a tab; every row is the summary of forecast for 3 hours in that specific day
 */
@Component({
	selector: "app-forecast-five",
	standalone: true,
	imports: [
		AsyncPipe,
		DatePipe,
		DecimalPipe,
		FlagPipe,
		JsonPipe,
		MatIconModule,
		MatCardModule,
		MatDividerModule,
		MatTooltipModule,
		MatTabsModule,
		NgOptimizedImage,
		NgTemplateOutlet,
		TitleCasePipe,
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
	daysDictionary: { [key: string]: IThreeHoursForecast[] } = {};
	days: string[] = [];

	ngOnChanges(changes: SimpleChanges): void {
		if (changes["forecastResult"]?.currentValue) {
			this.daysDictionary = groupBy(
				this.forecastResult?.list || [],
				(v): string => {
					const [date, time] = v.dt_txt.split(" ");
					return date;
				}
			);
			this.days = Object.keys(this.daysDictionary);
		}
	}
}
/** Replace this with the new Object.groupBy function when Typescript will expose it  */
export const groupBy = <T>(
	array: T[],
	predicate: (value: T, index: number, array: T[]) => string
): { [key: string]: T[] } =>
	array.reduce((acc, value, index, array): { [key: string]: T[] } => {
		(acc[predicate(value, index, array)] ||= []).push(value);
		return acc;
	}, {} as { [key: string]: T[] });
