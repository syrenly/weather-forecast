/**
 * File containing mocked provider for SearchService
 */

import { Injectable, Provider } from "@angular/core";
import { Observable, of } from "rxjs";
import { SearchAdapter } from "../services/adapters/search.adapter";
import { ICitySearchResult, ICityWeather } from "../types/city-types";
import { IFiveDaysForecast } from "../types/forecast-types";
import { mockCity, mockCitySearchResult, mockForecastResult } from "./utils.mock";

@Injectable()
export class MockSearchAdapter {
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

export function provideMockSearchAdapter(): Provider {
	return { provide: SearchAdapter, useClass: MockSearchAdapter };
}
