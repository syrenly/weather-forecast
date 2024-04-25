import { Injectable, Provider } from "@angular/core";
import { Observable, of } from "rxjs";
import { SearchService } from "../services/search.service";
import { ICitySearchResult, ICityWeather } from "../types/city-types";
import { IFiveDaysForecast } from "../types/forecast-types";
import { city, citySearchResult, forecastResult } from "./utils.mock";

@Injectable()
export class SearchMockService {
	searchCountry(queryArg: string): Observable<ICitySearchResult> {
		return of(citySearchResult);
	}

	getCityWeather(cityId: number): Observable<ICityWeather> {
		return of(city);
	}

	getFiveDaysForecast(cityId: number): Observable<IFiveDaysForecast> {
		return of(forecastResult);
	}
}

export function getSearchMockProvider(): Provider {
	return { provide: SearchService, useClass: SearchMockService };
}
