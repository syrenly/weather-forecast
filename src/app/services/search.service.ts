import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { WEATHER_API_KEY } from "../tokens";
import { ICitySearchResult, ICityWeather } from "../types/city-types";
import { IFiveDaysForecast } from "../types/forecast-types";

@Injectable({
	providedIn: "root",
})
export class SearchService {
	private _navigationStarted = false;
	get navigationStarted(): boolean {
		return this._navigationStarted;
	}
	set navigationStarted(value: boolean) {
		this._navigationStarted = value;
	}
	private licenseKey = "";
	constructor(
		private httpClient: HttpClient,
		@Inject(WEATHER_API_KEY) private readonly licenseKeySubj: BehaviorSubject<string>
	) {
		this.licenseKeySubj.subscribe(key => {
			this.licenseKey = key;
		});
	}

	searchCountry(queryArg: string): Observable<ICitySearchResult> {
		return this.httpClient.get<ICitySearchResult>(
			`https://api.openweathermap.org/data/2.5/find?q=${queryArg}&type=like&appid=${this.licenseKey}&units=metric`
		);
	}
	getCityWeather(cityId: number): Observable<ICityWeather> {
		return this.httpClient.get<ICityWeather>(
			`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${this.licenseKey}&units=metric`
		);
	}
	getFiveDaysForecast(cityId: number): Observable<IFiveDaysForecast> {
		return this.httpClient.get<IFiveDaysForecast>(
			`https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${this.licenseKey}&units=metric`
		);
	}
}
