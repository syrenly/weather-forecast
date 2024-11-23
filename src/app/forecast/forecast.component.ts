import { Component, DestroyRef, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ActivatedRoute, Data, Router, RouterLink } from "@angular/router";
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
		CurrentWeatherComponent,
		ForecastFiveComponent,
		MatIconModule,
		MatCardModule,
		MatDividerModule,
		MatProgressBarModule,
		MatTooltipModule,
		PrecipitationChartComponent,
		RouterLink,
		SearchbarComponent,
		SwitchThemeComponent,
		TemperatureChartComponent,
	],
	templateUrl: "./forecast.component.html",
	styleUrl: "./forecast.component.scss",
})
export default class ForecastComponent implements OnInit {
	city: ICityWeather | undefined;
	forecastResult: IFiveDaysForecast | undefined;
	errorInfo: { icon: string; text: string } | undefined;

	get mainWeather(): IWeather | undefined {
		return this.city?.weather?.[0];
	}
	get navigationStarted(): boolean {
		return this.searchService.navigationStarted;
	}

	constructor(
		private readonly activatedRoute: ActivatedRoute,
		private readonly router: Router,
		private readonly destroyRef: DestroyRef,
		private readonly searchService: SearchService
	) {}

	ngOnInit(): void {
		this.activatedRoute.data.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data: Data): void => {
			const valueData = data?.[0];
			this.searchService.navigationStarted = false;
			if (valueData?.errorStatus) {
				this.errorInfo = this.setErrorInfo(valueData.errorStatus);
				return;
			}
			const routeData: {
				countryInfo: ICityWeather;
				forecastResult: IFiveDaysForecast;
			} & { animationState: string } = valueData;
			this.city = routeData.countryInfo;
			this.forecastResult = routeData.forecastResult;
			this.errorInfo = undefined;
		});
	}

	navigateToCity(city: ICityWeather): void {
		this.router.navigateByUrl(`/forecast/${city.id}`, {
			state: city,
		});
	}
	/**
	 * Set message and icon to show when an error occurs
	 * @param errorStatus the http status
	 */
	setErrorInfo(errorStatus: number): { icon: string; text: string } {
		switch (errorStatus) {
			case 400:
				return {
					icon: "error_outline",
					text: "The forecasts were not retrieved due to an error in the structure of the request. Please retry.",
				};
			case 401:
				return {
					icon: "policy",
					text: "The forecasts were not retrieved, since the license is not valid, expired or missing.",
				};
			case 404:
				return {
					icon: "search_off",
					text: "The city related to the wanted forecasts was not found. Please make another search in order to retrieve the right data.",
				};
			case 429:
				return {
					icon: "event_repeat",
					text: "The forecasts were not retrieved, because too many requests were sent to the server. Please, consider to extend the license or wait some times.",
				};
			default:
				return {
					icon: "error_outline",
					text: "The forecasts were not retrieved due to an internal error.",
				};
		}
	}
}
