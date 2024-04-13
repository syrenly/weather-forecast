import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { WEATHER_API_LICENSE } from "./tokens";
import { ICity } from "./types";

@Injectable({
	providedIn: "root",
})
export class SearchService {
	// license!: string;
	constructor(
		private httpClient: HttpClient,
		@Inject(WEATHER_API_LICENSE) private readonly licenseApi: string
	) {
		// licenseObs.subscribe((l: string): void => {
		// 	this.license = l;
		// 	console.log(this.license);
		// });
	}

	getIconUrl(icon: string): string {
		return `http://openweathermap.org/img/w/${icon}.png`;
	}
	//weather.sys.country
	getCountryFlagUrl(country: string): string {
		const lowerCaseCountry = country.toLowerCase();
		return `http://openweathermap.org/images/flags/${lowerCaseCountry}.png`;
	}
	searchCountry(queryArg: string): Observable<ICity[]> {
		return this.httpClient.get<ICity[]>(
			`https://openweathermap.org/data/2.5/find?q=${queryArg}&type=like&sort=population&cnt=30&appid=${this.licenseApi}`
		);
	}
}
