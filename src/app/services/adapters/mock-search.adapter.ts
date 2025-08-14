/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ICitySearchResult, ICityWeather } from "../../types/city-types";
import { IFiveDaysForecast } from "../../types/forecast-types";
import { mockCity, mockCitySearchResult, mockForecastResult } from "../../unit-test-utils/utils.mock";

/**
 * Adapter to retrieve mock info about weather in a city when the license key is not provided
 */
@Injectable({
	providedIn: "root",
})
export class MockSearchAdapter {
	// #region Dependencies
	private readonly httpClient: HttpClient = inject(HttpClient);
	// #endregion

	/**
	 * Retrieve a list of mock forecast
	 */
	searchCity(_: string, __: string): Observable<ICitySearchResult> {
		return of(mockCitySearchResult);
	}
	/**
	 * Retrieve mock weather of a city
	 */
	getCityWeather(_: number, __: string): Observable<ICityWeather> {
		return of(mockCity);
	}
	/**
	 * Retrieve mock weather of a city for the following 5 days, every 3 hours
	 */
	getFiveDaysForecast(_: number, __: string): Observable<IFiveDaysForecast> {
		return of(mockForecastResult);
	}
}
