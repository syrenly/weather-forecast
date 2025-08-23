import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ICityIdName, ICitySearchResult, ICityWeather } from "../types/city-types";
import { IFiveDaysForecast } from "../types/forecast-types";
import { SearchAdapter } from "./adapters/search.adapter";
import { DummySearchAdapter } from "./dummy-adapters/dummy-search.adapter";
import { LicenseService } from "./license.service";
/**
 * Service to retrieve info about weather in a city. It uses the OpenWeather API, which works only with a valid license key provided by the injection token @property WEATHER_API_KEY
 * The request errors are not managed here: they are managed in the specific point where the methods are called.
 */
@Injectable({
	providedIn: "root",
})
export class SearchService {
	// #region Navigation
	private _navigationStarted = false;
	get navigationStarted(): boolean {
		return this._navigationStarted;
	}
	set navigationStarted(value: boolean) {
		this._navigationStarted = value;
	}
	// #endregion

	// #region License
	private get licenseKey(): string {
		return this.licenseService.licenseKey;
	}
	private get useMockData(): boolean {
		return this.licenseService.useMockData;
	}
	// #endregion

	// #region Dependencies
	private readonly searchAdapter = inject(SearchAdapter);
	private readonly dummySearchAdapter = inject(DummySearchAdapter);
	private readonly licenseService = inject(LicenseService);
	// #endregion

	/**
	 * Retrieve a list of forecast related to the cities which name/country matches the @param queryArgs
	 * A better match if the ram queryArg are written as: the city name followed by comma and 2-letter country code, eg: Rome, IT
	 * @returns the city search result
	 */
	searchCity(queryArg: string): Observable<ICitySearchResult> {
		return this.useMockData
			? this.dummySearchAdapter.searchCity(queryArg)
			: this.searchAdapter.searchCity(queryArg, this.licenseKey);
	}
	/**
	 * Retrieve the weather of a specific city
	 * @param cityId the id of the city to search
	 */
	getCityWeather(cityId: number): Observable<ICityWeather> {
		return this.useMockData
			? this.dummySearchAdapter.getCityWeather(cityId)
			: this.searchAdapter.getCityWeather(cityId, this.licenseKey);
	}
	/**
	 * Retrieve the weather of a specific city for the following 5 days, every 3 hours
	 * @param cityId the id of the city to search
	 */
	getFiveDaysForecast(cityId: number): Observable<IFiveDaysForecast> {
		return this.useMockData
			? this.dummySearchAdapter.getFiveDaysForecast(cityId)
			: this.searchAdapter.getFiveDaysForecast(cityId, this.licenseKey);
	}
	/**
	 * Retrieve a list of sample cities
	 * @returns an observable of the sample cities
	 */
	getSampleCities(): Observable<ICityIdName[]> {
		return this.useMockData ? this.dummySearchAdapter.getSampleCities() : this.searchAdapter.getSampleCities();
	}
}
