/**
 * File containing mocked provider for SearchService
 */

import { Injectable, Provider } from "@angular/core";
import { Observable, of } from "rxjs";
import { citySamples } from "../consts";
import { SearchService } from "../services/search.service";
import { ICityIdName, ICitySearchResult, ICityWeather } from "../types/city-types";
import { IFiveDaysForecast } from "../types/forecast-types";
import { mockCity, mockCitySearchResult, mockForecastResult } from "./utils.mock";

@Injectable()
export class MockSearchService {
	searchCity(_: string): Observable<ICitySearchResult> {
		return of(mockCitySearchResult);
	}

	getCityWeather(_: number): Observable<ICityWeather> {
		return of(mockCity);
	}

	getFiveDaysForecast(_: number): Observable<IFiveDaysForecast> {
		return of(mockForecastResult);
	}

	getSampleCities(): Observable<ICityIdName[]> {
		return of(citySamples);
	}
}

export function provideMockSearchService(): Provider {
	return { provide: SearchService, useClass: MockSearchService };
}
