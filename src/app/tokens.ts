import { HttpClient } from "@angular/common/http";
import { InjectionToken, Provider, isDevMode } from "@angular/core";
import { BehaviorSubject, firstValueFrom, tap } from "rxjs";

//#region WEATHER API LICENSE KEY
export const WEATHER_API_KEY = new InjectionToken<BehaviorSubject<string>>("");
const weatherApiKeyFn = (): BehaviorSubject<string> => new BehaviorSubject<string>("");
export const provideWeatherApiKey = (): Provider => ({
	provide: WEATHER_API_KEY,
	useFactory: weatherApiKeyFn,
});
//#endregion

//#region THEME
export type Theme = "light" | "dark";
export const CURRENT_THEME = new InjectionToken<BehaviorSubject<"dark" | "light">>("Color of current theme");
const currentThemeFn = (): BehaviorSubject<"dark" | "light"> => new BehaviorSubject<"dark" | "light">("dark");
export const provideCurrentTheme = (): Provider => ({
	provide: CURRENT_THEME,
	useFactory: currentThemeFn,
});
//#endregion

//#region APP_INITIALIZER
export interface IConfiguration {
	OpenWeatherApiKey: string;
}
/** Retrieve the application configuration and update the weather api key value */
export function initializeApp(
	http: HttpClient,
	weatherApiKeySubject: BehaviorSubject<string>
): () => Promise<IConfiguration> {
	return (): Promise<IConfiguration> =>
		firstValueFrom(
			http
				// use different json file, based on the type of build
				.get<IConfiguration>(
					isDevMode()
						? "./assets/configurations/configuration.json"
						: "./assets/configurations/configuration.prod.json"
				)
				.pipe(
					tap((jsonConfig: { OpenWeatherApiKey: string }): void => {
						weatherApiKeySubject.next(jsonConfig.OpenWeatherApiKey);
					})
				)
		);
}
//#endregion
