import { HttpClient } from "@angular/common/http";
import { InjectionToken, Injector } from "@angular/core";
import { Observable, of, switchMap } from "rxjs";
import { IWeatherUrl } from "./types";

export const WEATHER_URLS = new InjectionToken<IWeatherUrl>(
	"The url for the weather API and support images"
);

export const WEATHER_API_LICENSE = new InjectionToken<string>(
	"License to access to weather API"
);
export const getLicense = (injector: Injector): Observable<string> => {
	const httpClient = injector.get(HttpClient);
	return httpClient
		.get<Record<string, string>>("assets/configuration.json")
		.pipe(
			switchMap((value: { apiLicense?: string }): Observable<string> => {
				return of(value?.apiLicense || "");
			})
		);
};
