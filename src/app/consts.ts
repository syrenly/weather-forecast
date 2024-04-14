import { InjectionToken } from "@angular/core";
import { ICitySearchResult } from "./types/city-types";

export const WEATHER_API_LICENSE = new InjectionToken<string>(
	"License to access to weather API"
);

export const DEFAULT_DEBOUNCE_DELAY_MILLISECONDS = 250;

export const EMPTY_SEARCH_RESULT: ICitySearchResult = {
	message: "",
	cod: "",
	count: 0,
	list: [],
};
