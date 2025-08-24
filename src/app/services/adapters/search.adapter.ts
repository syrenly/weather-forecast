import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { citySamples } from "../../consts";
import { ICityIdName, ICitySearchResult, ICityWeather } from "../../types/city-types";
import { IFiveDaysForecast } from "../../types/forecast-types";
import { forecastApiConfig } from "./search.config";

/**
 * Adapter to retrieve info about weather in a city. It uses the OpenWeather API, which works only with a valid license key provided by the injection token @property WEATHER_API_KEY
 * The request errors are not managed here: they are managed in the specific point where the methods are called.
 */
@Injectable({
	providedIn: "root",
})
export class SearchAdapter {
	// #region Dependencies
	private readonly httpClient: HttpClient = inject(HttpClient);
	// #endregion

	/**
	 * Retrieve a list of forecast related to the cities which name/country matches the @param queryArgs and using a working @param licenseKey
	 * A better match if the ram queryArg are written as: the city name followed by comma and 2-letter country code, eg: Rome, IT
	 * @returns the city search result
	 */
	searchCity(queryArgs: string, licenseKey: string): Observable<ICitySearchResult> {
		return this.httpClient.get<ICitySearchResult>(forecastApiConfig.findCities.method, {
			params: {
				...forecastApiConfig.findCities.params,
				q: queryArgs,
				appid: licenseKey,
			},
		});
	}
	/**
	 * Retrieve the weather of a specific city
	 * @param cityId the id of the city to search
	 * @param licenseKey the API key to use for the request
	 */
	getCityWeather(cityId: number, licenseKey: string): Observable<ICityWeather> {
		return this.httpClient.get<ICityWeather>(forecastApiConfig.getCityWeather.method, {
			params: {
				...forecastApiConfig.getCityWeather.params,
				id: cityId,
				appid: licenseKey,
			},
		});
	}
	/**
	 * Retrieve the weather of a specific city for the following 5 days, every 3 hours
	 * @param cityId the id of the city to search
	 * @param licenseKey the API key to use for the request
	 */
	getFiveDaysForecast(cityId: number, licenseKey: string): Observable<IFiveDaysForecast> {
		return this.httpClient.get<IFiveDaysForecast>(forecastApiConfig.getCityForecast.method, {
			params: {
				...forecastApiConfig.getCityForecast.params,
				id: cityId,
				appid: licenseKey,
			},
		});
	}
	/**
	 * Retrieve a list of sample cities
	 * @returns an observable of the sample cities
	 */
	getSampleCities(): Observable<ICityIdName[]> {
		return of(citySamples);
	}
}
