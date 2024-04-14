import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
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
import { Observable, map } from "rxjs";
import { FlagPipe } from "../../pipes/flag.pipe";
import { WeatherPipe } from "../../pipes/weather.pipe";
import { IMainInfo, IWeather } from "../../types/city-types";
import {
	IFiveDaysForecast,
	IThreeHoursForecast,
} from "../../types/forecast-types";
/**
 * ForecastFiveComponent shows weather forecast for 5 days. Each day is shown inside a tab; every row is the summary of forecast for 3 hours in that specific day
 */
@Component({
	selector: "app-forecast-five",
	standalone: true,
	imports: [
		MatIconModule,
		MatCardModule,
		NgOptimizedImage,
		MatTooltipModule,
		MatTabsModule,
		FlagPipe,
		WeatherPipe,
		DatePipe,
		DecimalPipe,
		AsyncPipe,
		NgTemplateOutlet,
		JsonPipe,
		MatDividerModule,
		TitleCasePipe,
	],
	templateUrl: "./forecast-five.component.html",
	styleUrl: "./forecast-five.component.scss",
})
export class ForecastFiveComponent implements OnChanges {
	@Input() forecastResult: IFiveDaysForecast | undefined;
	breakpoints = 2;
	mainWeather: IWeather | undefined;
	mainInfo: IMainInfo | undefined;
	daysDictionary: { [key: string]: IThreeHoursForecast[] } = {};
	days: string[] = [];

	isHandset$: Observable<boolean> = this.breakpointObserver
		.observe(Breakpoints.Handset)
		.pipe(map((res): boolean => res.matches));

	constructor(private readonly breakpointObserver: BreakpointObserver) {}
	ngOnChanges(changes: SimpleChanges): void {
		if (changes["forecastResult"]?.currentValue) {
			this.daysDictionary = groupBy(
				this.forecastResult.list || [],
				(v) => {
					const [date, time] = v.dt_txt.split(" ");
					return date;
				}
			);
			this.days = Object.keys(this.daysDictionary);
			console.log(this.daysDictionary);
			// TODO manage error

			// this.mainWeather =
			// 	this.city?.weather && this.city.weather[0]
			// 		? this.city.weather[0]
			// 		: undefined;
			// this.mainInfo = this.city?.main ? this.city.main : undefined;
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
