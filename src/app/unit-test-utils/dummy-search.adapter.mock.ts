/**
 * File containing mocked provider for SearchService
 */

import { Injectable, Provider } from "@angular/core";
import { Observable, of } from "rxjs";
import { dummyCitySamples } from "../consts";
import { DummySearchAdapter } from "../services/adapters/dummy-search.adapter";
import { ICityIdName, ICitySearchResult, ICityWeather } from "../types/city-types";
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

	getSampleCities(): Observable<ICityIdName[]> {
		return of(dummyCitySamples);
	}
}

export function provideMockDummySearchAdapter(): Provider {
	return { provide: DummySearchAdapter, useClass: MockDummySearchAdapter };
}
