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
import {
	Component,
	DestroyRef,
	Input,
	OnChanges,
	SimpleChanges,
} from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Observable, map } from "rxjs";
import { IMainInfo, IWeather } from "../../city-types";
import { IFiveDaysForecast } from "../../forecast-types";
import { FlagPipe } from "../../pipes/flag.pipe";
import { WeatherPipe } from "../../pipes/weather.pipe";
import { IThreeHoursForecast } from "./../../forecast-types";
import { SearchService } from "./../../services/search.service";
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

	constructor(
		private readonly breakpointObserver: BreakpointObserver,
		private readonly searchService: SearchService,
		private readonly destroyRef: DestroyRef
	) {}
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
const groupBy = <T>(
	array: T[],
	predicate: (value: T, index: number, array: T[]) => string
): { [key: string]: T[] } =>
	array.reduce((acc, value, index, array): { [key: string]: T[] } => {
		(acc[predicate(value, index, array)] ||= []).push(value);
		return acc;
	}, {} as { [key: string]: T[] });

// function partition(array, isValid) {
// 	return array.reduce(([pass, fail], elem) => {
// 	  return isValid(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]];
// 	}, [[], []]);
//   }

//   const [pass, fail] = partition(myArray, (e) => e > 5);
