import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import {
	AsyncPipe,
	DatePipe,
	DecimalPipe,
	NgOptimizedImage,
} from "@angular/common";
import {
	Component,
	DestroyRef,
	Input,
	OnChanges,
	SimpleChanges,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Observable, map } from "rxjs";
import { FlagPipe } from "../../pipes/flag.pipe";
import { WeatherPipe } from "../../pipes/weather.pipe";
import { ICity, IMainInfo, IWeather } from "../../types";
import { SearchService } from "./../../services/search.service";

@Component({
	selector: "app-forecast-five",
	standalone: true,
	imports: [
		MatIconModule,
		MatCardModule,
		NgOptimizedImage,
		MatTooltipModule,
		FlagPipe,
		WeatherPipe,
		DatePipe,
		DecimalPipe,
		AsyncPipe,
	],
	templateUrl: "./forecast-five.component.html",
	styleUrl: "./forecast-five.component.scss",
})
export class ForecastFiveComponent implements OnChanges {
	@Input() city: ICity | undefined;
	breakpoints = 2;
	mainWeather: IWeather | undefined;
	mainInfo: IMainInfo | undefined;

	isHandset$: Observable<boolean> = this.breakpointObserver
		.observe(Breakpoints.Handset)
		.pipe(map((res): boolean => res.matches));

	constructor(
		private readonly breakpointObserver: BreakpointObserver,
		private readonly searchService: SearchService,
		private readonly destroyRef: DestroyRef
	) {}
	ngOnChanges(changes: SimpleChanges): void {
		if (changes["city"]?.currentValue) {
			this.searchService
				.getFiveDaysForecast(this.city?.id)
				.pipe(takeUntilDestroyed(this.destroyRef))
				.subscribe((values) => {
					console.log(values);
				});
			// this.mainWeather =
			// 	this.city?.weather && this.city.weather[0]
			// 		? this.city.weather[0]
			// 		: undefined;
			// this.mainInfo = this.city?.main ? this.city.main : undefined;
		}
	}
}
