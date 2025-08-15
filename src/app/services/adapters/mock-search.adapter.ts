/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@angular/core";
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
	/**
	 * Retrieve a list of mock forecast
	 */
	searchCity(_: string): Observable<ICitySearchResult> {
		return of(mockCitySearchResult);
	}
	/**
	 * Retrieve mock weather of a city
	 */
	getCityWeather(): Observable<ICityWeather> {
		return of(mockCity);
	}
	/**
	 * Retrieve mock weather of a city for the following 5 days, every 3 hours
	 */
	getFiveDaysForecast(): Observable<IFiveDaysForecast> {
		return of(mockForecastResult);
	}
}
