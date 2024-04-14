import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ICitySearchResult, ICityWeather } from "../city-types";
import { IFiveDaysForecast } from "../forecast-types";
import { WEATHER_API_LICENSE } from "../tokens";
import { city, forecastResult } from "../utils.mock";

@Injectable({
	providedIn: "root",
})
export class SearchService {
	constructor(
		private httpClient: HttpClient,
		@Inject(WEATHER_API_LICENSE) private readonly licenseApi: string
	) {}

	getIconUrl(icon: string): string {
		return `http://openweathermap.org/img/w/${icon}.png`;
	}
	getCountryFlagUrl(country: string): string {
		const lowerCaseCountry = country.toLowerCase();
		return `http://openweathermap.org/images/flags/${lowerCaseCountry}.png`;
	}
	searchCountry(queryArg: string): Observable<ICitySearchResult> {
		return this.httpClient.get<ICitySearchResult>(
			`https://api.openweathermap.org/data/2.5/find?q=${queryArg}&type=like&appid=${this.licenseApi}&units=metric&lang=it`
		);
	}
	getCityWeather(cityId: number): Observable<ICityWeather> {
		return of(city);
		// return this.httpClient.get<ICityWeather>(
		// 	`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${this.licenseApi}`
		// );
	}

	getFiveDaysForecast(cityId: number): Observable<IFiveDaysForecast> {
		return of(forecastResult);
		// return this.httpClient.get<IFiveDaysForecast>(
		// 	`https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${this.licenseApi}&units=metric&lang=it`
		// );
	}
}
