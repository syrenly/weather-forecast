import { ICityIdName, ICitySearchResult } from "../types/city-types";
import { ILicenseStatusMessage } from "../types/types";
import { Theme } from "./tokens";

export const DEFAULT_DEBOUNCE_DELAY_MILLISECONDS = 250;
export const RECENT_CITIES_STORAGE_KEY = "weather-forecast:recent-cities";
export const DEFAULT_RECENT_CITIES_LIMIT = 6;
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

/**
 * A constant object containing messages and metadata for license status validation.
 * This is used to indicate whether a valid API key for OpenWeatherMap is found or not.
 * @type {ILicenseStatusMessage}
 */
export const LICENSE_STATUS_MESSAGES: ILicenseStatusMessage = {
	INVALID: {
		found: false,
		message: "Using dummy API key; please visit https://openweathermap.org to get a real one",
		icon: "error_outline",
	},
	VALID: {
		found: true,
		message: "API key found for https://openweathermap.org",
		icon: "check_circle_outline",
	},
};

/**
 * A collection of error messages mapped to specific HTTP error codes or a default case.
 * Each error message includes an icon and a descriptive text to provide feedback to the user.
 * @constant
 * @type {Partial<{ [key in HttpError | "default"]: { icon: string; text: string } }>}
 * @property {string} icon - The name of the icon associated with the error.
 * @property {string} text - A descriptive message explaining the error.
 * @remarks
 * - `HttpError` is assumed to be an enumeration of HTTP error codes.
 * - The "default" key provides a fallback message for unspecified errors.
 */
export const SEARCH_ERROR_MESSAGES: Partial<{ [key in HttpError | "default"]: { icon: string; text: string } }> = {
	[HttpError.BadRequest]: {
		icon: "error_outline",
		text: "The forecasts were not retrieved due to an error in the structure of the request. Please retry.",
	},
	[HttpError.Unauthorized]: {
		icon: "policy",
		text: "The forecasts were not retrieved, since the license is not valid, expired or missing.",
	},
	[HttpError.NotFound]: {
		icon: "search_off",
		text: "The city was not found. Please make another search in order to retrieve the right data.",
	},
	[HttpError.TooManyRequests]: {
		icon: "event_repeat",
		text: "The forecasts were not retrieved, because too many requests were sent to the server. Please, consider to extend the license or wait some times.",
	},
	["default"]: {
		icon: "error_outline",
		text: "The forecasts were not retrieved due to an internal error.",
	},
};
