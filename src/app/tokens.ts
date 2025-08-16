import { HttpClient } from "@angular/common/http";
import { InjectionToken, isDevMode, Provider } from "@angular/core";
import { BehaviorSubject, catchError, firstValueFrom, Observable, of, tap } from "rxjs";
import { DUMMY_API_KEY } from "./consts";

//#region ENVIRONMENT
export const IS_DEV_MODE = new InjectionToken<boolean>("Is the app in development mode");
export const provideIsDevEnvironment = (): Provider => ({
	provide: IS_DEV_MODE,
	useValue: isDevMode(),
});
//#endregion

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
	http: HttpClient,
	weatherApiKeySubject: BehaviorSubject<string>,
	isDevMode: boolean
): () => Promise<IConfiguration> {
	return (): Promise<IConfiguration> =>
		firstValueFrom(
			http
				// use different json file, based on the type of build
				.get<IConfiguration>(
					isDevMode
						? "./assets/configurations/configuration.json"
						: "./assets/configurations/configuration.prod.json"
				)
				.pipe(
					catchError((): Observable<IConfiguration> => of({ OpenWeatherApiKey: DUMMY_API_KEY })),
					tap(jsonConfig => weatherApiKeySubject.next(jsonConfig?.OpenWeatherApiKey || DUMMY_API_KEY))
				)
		);
}
//#endregion
