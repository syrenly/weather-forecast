import { ICloud, ICoordinate, ICountryData, IPrecipitationH, IWeather, IWind } from "./types";

export interface ICitySearchResult {
	message: string;
	cod: string;
	count: number;
	list: ICityWeather[];
}
export interface ICityWeather {
	base?: string;
	sys: ICountryData;
	cod: number;
	id: number;
	name: string;
	coord: ICoordinate | null;
	main: IMainInfo;
	dt: number;
	wind: IWind | null;
	rain?: IPrecipitationH | null;
	snow?: IPrecipitationH | null;
	visibility: number;
	clouds: ICloud | null;
	weather: IWeather[];
	timezone: number;
}

export interface IMainInfo {
	temp: number;
	feels_like: number;
	temp_min: number;
	temp_max: number;
	pressure: number;
	humidity: number;
}

export type RouteData = ICityWeather & { animationState?: string };
