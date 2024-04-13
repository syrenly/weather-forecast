import { InjectionToken } from "@angular/core";

export const WEATHER_API_LICENSE = new InjectionToken<string>(
	"License to access to weather API"
);
// export const getLicense = (injector: Injector): Observable<string> => {
// 	const httpClient = injector.get(HttpClient);
// 	return httpClient
// 		.get<Record<string, string>>("assets/configuration.json")
// 		.pipe(
// 			switchMap((value: { apiLicense?: string }): Observable<string> => {
// 				return of(value?.apiLicense || "");
// 			})
// 		);
// };
