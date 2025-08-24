/**
 * File containing mocked provider for SearchService
 */

import { Injectable, Provider } from "@angular/core";
import { Observable, of } from "rxjs";
import { DummySearchAdapter } from "../services/adapters/dummy-search.adapter";
import { ICitySearchResult, ICityWeather } from "../types/city-types";
import { IFiveDaysForecast } from "../types/forecast-types";
import { mockCity, mockCitySearchResult, mockForecastResult } from "./utils.mock";

@Injectable()
export class MockDummySearchAdapter {
	searchCity(): Observable<ICitySearchResult> {
		return of(mockCitySearchResult);
	}

	getCityWeather(): Observable<ICityWeather> {
		return of(mockCity);
	}

	getFiveDaysForecast(): Observable<IFiveDaysForecast> {
		return of(mockForecastResult);
	}
}

export function provideMockDummySearchAdapter(): Provider {
	return { provide: DummySearchAdapter, useClass: MockDummySearchAdapter };
}
