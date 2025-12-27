import { InjectionToken, Provider } from "@angular/core";
import { BehaviorSubject, Observable, of, tap } from "rxjs";
import { DUMMY_API_KEY } from "./consts";

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

export function initializeApp(
	weatherApiKeySubject: BehaviorSubject<string>,
	configuration: IConfiguration
): () => Observable<IConfiguration> {
	return () =>
		of(configuration).pipe(
			tap(config => {
				const key = config?.OpenWeatherApiKey || DUMMY_API_KEY;
				weatherApiKeySubject.next(key);
			})
		);
}
//#endregion
