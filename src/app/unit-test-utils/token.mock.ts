import { LOCALE_ID, Provider } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CURRENT_THEME, WEATHER_API_KEY } from "../tokens";

export const provideMockWeatherApiKey = (): Provider => ({
	provide: WEATHER_API_KEY,
	useValue: new BehaviorSubject<string>("KEY"),
});

export const provideMockTheme = (): Provider => ({
	provide: CURRENT_THEME,
	useValue: new BehaviorSubject<"dark" | "light">("dark"),
});

export const provideMockLocaleId = (): Provider => ({ provide: LOCALE_ID, useValue: "en" });
