/**
 * File containing mocked providers to be used in unit tests
 */

import { LOCALE_ID, Provider } from "@angular/core";
import { BehaviorSubject, EMPTY } from "rxjs";
import { DUMMY_API_KEY } from "../consts";
import { CURRENT_THEME, WEATHER_API_KEY } from "../tokens";

export const provideMockWeatherApiKey = (): Provider => ({
	provide: WEATHER_API_KEY,
	useValue: new BehaviorSubject<string>("KEY"),
});

export const provideMockDummyWeatherApiKey = (): Provider => ({
	provide: WEATHER_API_KEY,
	useValue: new BehaviorSubject<string>(DUMMY_API_KEY),
});

export const provideMockTheme = (): Provider => ({
	provide: CURRENT_THEME,
	useValue: new BehaviorSubject<"dark" | "light">("dark"),
});

export const provideMockLocaleId = (): Provider => ({ provide: LOCALE_ID, useValue: "en" });

export const provideMockEMPTYWeatherApiKey = (): Provider => ({
	provide: WEATHER_API_KEY,
	useValue: EMPTY,
});
