import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { WEATHER_API_KEY } from "../tokens";
import { ICitySearchResult, ICityWeather } from "../types/city-types";
import { IFiveDaysForecast } from "../types/forecast-types";
/**
 * Service to retrieve info about weather in a city. It uses the OpenWeather API, which works only with a valid license key provided by the injection token @property WEATHER_API_KEY
 * The request errors are not managed here: they are managed in the specific point where the methods are called.
 */
@Injectable({
	providedIn: "root",
})
export class SearchService {
	private _navigationStarted = false;
	get navigationStarted(): boolean {
		return this._navigationStarted;
	}
	set navigationStarted(value: boolean) {
		this._navigationStarted = value;
	}
	private licenseKey = "";

	// #region Dependencies
	private readonly licenseKeySubj: BehaviorSubject<string> = inject(WEATHER_API_KEY);
	private readonly httpClient: HttpClient = inject(HttpClient);
	// #endregion

	constructor() {
		this.licenseKeySubj.subscribe(key => {
			this.licenseKey = key;
		});
	}
	/**
	 * Retrieve a list of forecast related to the cities which name/country matches the @param queryArg
	 * A better match if the ram queryArg are written as: the city name followed by comma and 2-letter country code, eg: Rome, IT
	 * @returns
	 */
	searchCity(queryArg: string): Observable<ICitySearchResult> {
		return this.httpClient.get<ICitySearchResult>(
			`https://api.openweathermap.org/data/2.5/find?q=${queryArg}&type=like&appid=${this.licenseKey}&units=metric`
		);
	}
	/**
	 * Retrieve the weather of a specific city
	 * @param cityId the id of the city to search
	 */
	getCityWeather(cityId: number): Observable<ICityWeather> {
		return this.httpClient.get<ICityWeather>(
			`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${this.licenseKey}&units=metric`
		);
	}
	/**
	 * Retrieve the weather of a specific city for the following 5 days, every 3 hours
	 * @param cityId the id of the city to search
	 */
	getFiveDaysForecast(cityId: number): Observable<IFiveDaysForecast> {
		return this.httpClient.get<IFiveDaysForecast>(
			`https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${this.licenseKey}&units=metric`
		);
	}
}
