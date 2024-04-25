import { InjectionToken } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export type Theme = "light" | "dark";

export const WEATHER_API_LICENSE = new InjectionToken<string>("License to access to weather API");

export const CURRENT_THEME = new InjectionToken<BehaviorSubject<"dark" | "light">>("Color of current theme");

export const currentTheme = (): BehaviorSubject<"dark" | "light"> => new BehaviorSubject<"dark" | "light">("dark");
