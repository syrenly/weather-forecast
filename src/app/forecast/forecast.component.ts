import { LiveAnnouncer } from "@angular/cdk/a11y";
import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ActivatedRoute, Data, Router, RouterLink } from "@angular/router";
import { HttpError, SEARCH_ERROR_MESSAGES } from "../consts/consts";
import { ICityWeather } from "../types/city-types";
import { IFiveDaysForecast } from "../types/forecast-types";
import { IWeather } from "../types/types";
import { ApiAlertComponent } from "../ui-components/api-alert/api-alert.component";
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
	imports: [
		ApiAlertComponent,
		CurrentWeatherComponent,
		ForecastFiveComponent,
		MatCardModule,
		MatDividerModule,
		MatIconModule,
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
	// #region Dependencies
	private readonly activatedRoute = inject(ActivatedRoute);
	private readonly router = inject(Router);
	private readonly destroyRef = inject(DestroyRef);
	private readonly searchService = inject(SearchService);
	private readonly liveAnnouncer = inject(LiveAnnouncer);
	// #endregion

	ngOnInit(): void {
		this.activatedRoute.data.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data: Data): void => {
			const valueData = data?.[0];
			this.searchService.navigationStarted = false;
			if (valueData?.errorStatus) {
				this.errorInfo = this.setErrorInfo(valueData.errorStatus);
				this.liveAnnouncer.announce(this.errorInfo.text);
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
		const info = SEARCH_ERROR_MESSAGES[errorStatus as HttpError];
		return info || SEARCH_ERROR_MESSAGES["default"]!;
	}
}
