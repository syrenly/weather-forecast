import { InjectionToken } from "@angular/core";
import { BehaviorSubject } from "rxjs";

//#region WEATHER API LICENSE KEY
export const WEATHER_API_KEY = new InjectionToken<string>("License to access to weather API");
export const weatherApiKeyFn = (): BehaviorSubject<string> => new BehaviorSubject<string>("");
//#endregion

//#region THEME
export type Theme = "light" | "dark";
export const CURRENT_THEME = new InjectionToken<BehaviorSubject<"dark" | "light">>("Color of current theme");
export const currentThemeFn = (): BehaviorSubject<"dark" | "light"> => new BehaviorSubject<"dark" | "light">("dark");
//#endregion
