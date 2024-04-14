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
import { ActivatedRoute, Data, RouterLink } from "@angular/router";
import { Observable, map } from "rxjs";
import { ICityWeather, IWeather } from "../city-types";
import { IFiveDaysForecast } from "../forecast-types";
import { FlagPipe } from "../pipes/flag.pipe";
import { WeatherPipe } from "../pipes/weather.pipe";
import { PrecipitationChartComponent } from "../precipitation-chart/precipitation-chart.component";
import { TemperatureChartComponent } from "../temperature-chart/temperature-chart.component";
import { CurrentWeatherComponent } from "../ui-components/current-weather/current-weather.component";
import { ForecastFiveComponent } from "../ui-components/forecast-five/forecast-five.component";
import { SearchbarComponent } from "../ui-components/searchbar/searchbar.component";
@Component({
	selector: "app-forecast",
	standalone: true,
	imports: [
		SearchbarComponent,
		CurrentWeatherComponent,
		ForecastFiveComponent,
		TemperatureChartComponent,
		PrecipitationChartComponent,
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
	city: ICityWeather | undefined;
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
		private readonly destroyRef: DestroyRef
	) {}
	ngOnInit(): void {
		this.route.data
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe((value: Data) => {
				console.log(value);
				const routeData: {
					countryInfo: ICityWeather;
					forecastResult: IFiveDaysForecast;
				} & { animationState: string } = value[0];
				delete routeData["animationState"];
				this.city = routeData.countryInfo;
				this.forecastResult = routeData.forecastResult;
			});
	}
}