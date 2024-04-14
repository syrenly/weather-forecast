import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import {
	AsyncPipe,
	DatePipe,
	DecimalPipe,
	NgOptimizedImage,
} from "@angular/common";
import { Component, DestroyRef, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ActivatedRoute, Data, Router, RouterLink } from "@angular/router";
import { Observable, map } from "rxjs";
import { ICity, IWeather } from "../city-types";
import { IFiveDaysForecast } from "../forecast-types";
import { FlagPipe } from "../pipes/flag.pipe";
import { WeatherPipe } from "../pipes/weather.pipe";
import { TemperatureChartComponent } from "../temperature-chart/temperature-chart.component";
import { CurrentWeatherComponent } from "../ui-components/current-weather/current-weather.component";
import { ForecastFiveComponent } from "../ui-components/forecast-five/forecast-five.component";
import { SearchbarComponent } from "../ui-components/searchbar/searchbar.component";
import { SearchService } from "./../services/search.service";
@Component({
	selector: "app-forecast",
	standalone: true,
	imports: [
		SearchbarComponent,
		CurrentWeatherComponent,
		ForecastFiveComponent,
		TemperatureChartComponent,
		RouterLink,
		MatIconModule,
		MatCardModule,
		MatDividerModule,
		NgOptimizedImage,
		MatTooltipModule,
		FlagPipe,
		WeatherPipe,
		DatePipe,
		DecimalPipe,
		AsyncPipe,
	],
	templateUrl: "./forecast.component.html",
	styleUrl: "./forecast.component.scss",
})
export class ForecastComponent implements OnInit {
	city: ICity | undefined;
	breakpoints = 2;
	get mainWeather(): IWeather | undefined {
		return this.city?.weather ? this.city.weather[0] : undefined;
	}
	isHandset$: Observable<boolean> = this.breakpointObserver
		.observe(Breakpoints.Handset)
		.pipe(map((res) => res.matches));

	forecastResult: IFiveDaysForecast | undefined;
	constructor(
		private readonly breakpointObserver: BreakpointObserver,
		private readonly route: ActivatedRoute,
		private readonly router: Router,
		private readonly searchService: SearchService,
		private readonly destroyRef: DestroyRef
	) {}
	ngOnInit(): void {
		this.route.data
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe((value: Data) => {
				console.log(value);
				const routeData: {
					countryInfo: ICity;
					forecastResult: IFiveDaysForecast;
				} & { animationState: string } = value[0];
				delete routeData["animationState"];
				this.city = routeData.countryInfo;
				this.forecastResult = routeData.forecastResult;

				// this.searchService.
			});
	}
}
