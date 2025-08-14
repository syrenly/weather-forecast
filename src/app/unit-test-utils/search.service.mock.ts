/**
 * File containing mocked provider for SearchService
 */

import { Injectable, Provider } from "@angular/core";
import { Observable, of } from "rxjs";
import { SearchService } from "../services/search.service";
import { ICitySearchResult, ICityWeather } from "../types/city-types";
import { IFiveDaysForecast } from "../types/forecast-types";
import { mockCity, mockCitySearchResult, mockForecastResult } from "./utils.mock";

@Injectable()
export class SearchMockService {
	searchCity(_: string): Observable<ICitySearchResult> {
		return of(mockCitySearchResult);
	}

	getCityWeather(_: number): Observable<ICityWeather> {
		return of(mockCity);
	}

	getFiveDaysForecast(cityId: number): Observable<IFiveDaysForecast> {
		return of(mockForecastResult);
	}
}

export function getSearchMockProvider(): Provider {
	return { provide: SearchService, useClass: SearchMockService };
}
