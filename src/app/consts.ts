import { Theme } from "./tokens";
import { ICityIdName, ICitySearchResult } from "./types/city-types";

export const DEFAULT_DEBOUNCE_DELAY_MILLISECONDS = 250;
// API key to use when the real API key is not available
export const DUMMY_API_KEY = "DUMMY_API_KEY";

export const EMPTY_SEARCH_RESULT: ICitySearchResult = {
	message: "",
	cod: "",
	count: 0,
	list: [],
};
// Arrow function to retrieve the css class to apply a theme
export const themeCssClass = (themeName: Theme): string => `${themeName}-theme`;

// samples of cities to show in the home page
export const citySamples: ICityIdName[] = [
	{
		name: "Pavia, IT",
		id: 3171366,
	},
	{
		name: "Rome, IT",
		id: 3169070,
	},
	{
		name: "London, GB",
		id: 2643743,
	},
	{
		name: "Milan, IT",
		id: 3173435,
	},
	{
		name: "Venice, IT",
		id: 316460,
	},
	{
		name: "Madrid, ES",
		id: 3117735,
	},
	{
		name: "Paris, FR",
		id: 2988507,
	},
	{
		name: "Dublin, IE",
		id: 2964574,
	},
	{
		name: "Hamburg, DE",
		id: 2911298,
	},
];

// samples of cities to show in the home page when no real API key was provided
export const dummyCitySamples: ICityIdName[] = [
	{
		name: "London, GB",
		id: 2643743,
	},
	{
		name: "Milan, IT",
		id: 3173435,
	},
	{
		name: "Venice, IT",
		id: 316460,
	},
	{
		name: "Madrid, ES",
		id: 3117735,
	},
	{
		name: "Paris, FR",
		id: 2988507,
	},
	{
		name: "Dublin, IE",
		id: 2964574,
	},
];

// Error codes for HTTP requests
export enum HttpError {
	BadRequest = 400,
	Unauthorized = 401,
	Forbidden = 403,
	NotFound = 404,
	TooManyRequests = 429,
	InternalServerError = 500,
	ServiceUnavailable = 503,
}
