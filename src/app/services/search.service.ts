import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { WEATHER_API_KEY } from "../tokens";
import { ICitySearchResult, ICityWeather } from "../types/city-types";
import { IFiveDaysForecast } from "../types/forecast-types";

@Injectable({
	providedIn: "root",
})
export class SearchService {
	navigationStarted = false;
	constructor(
		private httpClient: HttpClient,
		@Inject(WEATHER_API_KEY) private readonly licenseApi: string
	) {}

	searchCountry(queryArg: string): Observable<ICitySearchResult> {
		return this.httpClient.get<ICitySearchResult>(
			`https://api.openweathermap.org/data/2.5/find?q=${queryArg}&type=like&appid=${this.licenseApi}&units=metric`
		);
	}
	getCityWeather(cityId: number): Observable<ICityWeather> {
		return this.httpClient.get<ICityWeather>(
			`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${this.licenseApi}&units=metric`
		);
	}

	getFiveDaysForecast(cityId: number): Observable<IFiveDaysForecast> {
		return this.httpClient.get<IFiveDaysForecast>(
			`https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${this.licenseApi}&units=metric`
		);
	}
}
