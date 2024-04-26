import { LOCALE_ID, Provider } from "@angular/core";
import { CURRENT_THEME, WEATHER_API_LICENSE, currentThemeFn } from "../tokens";

export const provideMockWeatherApiKey = (): Provider => ({ provide: WEATHER_API_LICENSE, useValue: "KEY" });

export const provideMockTheme = (): Provider => ({ provide: CURRENT_THEME, useFactory: currentThemeFn });

export const provideMockLocaleId = (): Provider => ({ provide: LOCALE_ID, useValue: "en" });
