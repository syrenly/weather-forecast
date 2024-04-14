import { ICitySearchResult } from "./city-types";

export const DEFAULT_DEBOUNCE_DELAY_MILLISECONDS = 250;

export const EMPTY_SEARCH_RESULT: ICitySearchResult = {
	message: "",
	cod: "",
	count: 0,
	list: [],
};
