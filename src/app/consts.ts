import { Theme } from "./tokens";
import { ICitySearchResult } from "./types/city-types";

export const DEFAULT_DEBOUNCE_DELAY_MILLISECONDS = 250;

export const EMPTY_SEARCH_RESULT: ICitySearchResult = {
	message: "",
	cod: "",
	count: 0,
	list: [],
};
// Arrow function to retrieve the css class to apply a theme
export const themeCssClass = (themeName: Theme): string => `${themeName}-theme`;
