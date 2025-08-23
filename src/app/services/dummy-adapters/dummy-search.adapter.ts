/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { dummyCitySamples } from "../../consts";
import { ICityIdName, ICitySearchResult, ICityWeather } from "../../types/city-types";
import { IFiveDaysForecast } from "../../types/forecast-types";

/**
 * Adapter to retrieve mock info about weather in a city when the license key is not provided
 */
@Injectable({
	providedIn: "root",
})
export class DummySearchAdapter {
	// #region Dependencies
	private readonly http = inject(HttpClient);
	// #endregion

	/** Retrieve a list of mock forecast */
	searchCity(_: string): Observable<ICitySearchResult> {
		return this.http.get<ICitySearchResult>(`assets/dummy-responses/find.json`);
	}
	/** Retrieve mock weather of a city */
	getCityWeather(cityId: number): Observable<ICityWeather> {
		return this.http.get<ICityWeather>(`assets/dummy-responses/${cityId}.weather.json`);
	}
	/** Retrieve mock weather of a city for the following 5 days, every 3 hours */
	getFiveDaysForecast(cityId: number): Observable<IFiveDaysForecast> {
		return this.http.get<IFiveDaysForecast>(`assets/dummy-responses/${cityId}.forecast.json`);
	}
	/** Retrieve a list of sample cities */
	getSampleCities(): Observable<ICityIdName[]> {
		return of(dummyCitySamples);
	}
}
