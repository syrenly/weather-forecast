import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import {
	AsyncPipe,
	DatePipe,
	DecimalPipe,
	NgOptimizedImage,
} from "@angular/common";
import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Observable, map } from "rxjs";
import { FlagPipe } from "../../pipes/flag.pipe";
import { WeatherPipe } from "../../pipes/weather.pipe";
import { ICity, IMainInfo, IWeather } from "../../types";

@Component({
	selector: "app-current-weather",
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
	templateUrl: "./current-weather.component.html",
	styleUrl: "./current-weather.component.scss",
})
export class CurrentWeatherComponent implements OnChanges {
	@Input() city: ICity | undefined;
	breakpoints = 2;
	mainWeather: IWeather | undefined;
	mainInfo: IMainInfo | undefined;

	isHandset$: Observable<boolean> = this.breakpointObserver
		.observe(Breakpoints.Handset)
		.pipe(map((res): boolean => res.matches));

	constructor(private readonly breakpointObserver: BreakpointObserver) {}
	ngOnChanges(changes: SimpleChanges): void {
		if (changes["city"]) {
			this.mainWeather =
				this.city?.weather && this.city.weather[0]
					? this.city.weather[0]
					: undefined;
			this.mainInfo = this.city?.main ? this.city.main : undefined;
		}
	}
}
