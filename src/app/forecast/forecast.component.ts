import { AsyncPipe, DatePipe, DecimalPipe, NgOptimizedImage } from "@angular/common";
import { Component, DestroyRef, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ActivatedRoute, Data, Router, RouterLink } from "@angular/router";
import { FlagPipe } from "../pipes/flag.pipe";
import { WeatherPipe } from "../pipes/weather.pipe";
import { ICityWeather } from "../types/city-types";
import { IFiveDaysForecast } from "../types/forecast-types";
import { IWeather } from "../types/types";
import { CurrentWeatherComponent } from "../ui-components/current-weather/current-weather.component";
import { ForecastFiveComponent } from "../ui-components/forecast-five/forecast-five.component";
import { PrecipitationChartComponent } from "../ui-components/precipitation-chart/precipitation-chart.component";
import { SearchbarComponent } from "../ui-components/searchbar/searchbar.component";
import { SwitchThemeComponent } from "../ui-components/switch-theme/switch-theme.component";
import { TemperatureChartComponent } from "../ui-components/temperature-chart/temperature-chart.component";
import { SearchService } from "./../services/search.service";
/**
 * ForecastComponent is the main component for the application. It shows specific information about the weather for a city.
 * - header with title (link to return to home), searchbar (to change the current selected city), toggle button to switch between light and dark theme
 * - info about current weather of the selected city
 * - forecasts about the next 5 days
 * - chart for temperature
 * - chart for precipitation (snow and rain)
 */
@Component({
	selector: "app-forecast",
	standalone: true,
	imports: [
		AsyncPipe,
		CurrentWeatherComponent,
		DecimalPipe,
		DatePipe,
		FlagPipe,
		ForecastFiveComponent,
		MatIconModule,
		MatCardModule,
		MatDividerModule,
		MatProgressBarModule,
		MatToolbarModule,
		MatTooltipModule,
		NgOptimizedImage,
		PrecipitationChartComponent,
		RouterLink,
		SearchbarComponent,
		SwitchThemeComponent,
		TemperatureChartComponent,
		WeatherPipe,
	],
	templateUrl: "./forecast.component.html",
	styleUrl: "./forecast.component.scss",
})
export class ForecastComponent implements OnInit {
	city: ICityWeather | undefined;
	forecastResult: IFiveDaysForecast | undefined;
	errorStatus: number | undefined;

	get mainWeather(): IWeather | undefined {
		return this.city?.weather?.[0];
	}
	get navigationStarted(): boolean {
		return this.searchService.navigationStarted;
	}

	constructor(
		private readonly route: ActivatedRoute,
		private readonly router: Router,
		private readonly destroyRef: DestroyRef,
		private readonly searchService: SearchService
	) {}

	ngOnInit(): void {
		this.route.data.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value: Data): void => {
			this.searchService.navigationStarted = false;
			if (value?.[0]?.errorStatus) {
				this.errorStatus = value[0].errorStatus;
				return;
			}
			const routeData: {
				countryInfo: ICityWeather;
				forecastResult: IFiveDaysForecast;
			} & { animationState: string } = value[0];
			this.city = routeData.countryInfo;
			this.forecastResult = routeData.forecastResult;
			this.errorStatus = undefined;
		});
	}

	navigateToCity(city: ICityWeather): void {
		this.router.navigateByUrl(`/forecast/${city.id}`, {
			state: city,
		});
	}
}
