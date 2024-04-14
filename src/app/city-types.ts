export interface ICitySearchResult {
	message: string;
	cod: string;
	count: number;
	list: ICity[];
}
export interface ICity {
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

interface ICountryData {
	country: string;
	type?: number;
	id?: number;
	message?: number;
	sunrise?: number;
	sunset?: number;
}

interface ICoordinate {
	lat: number;
	lon: number;
}
export interface IMainInfo {
	temp: number;
	feels_like: number;
	temp_min: number;
	temp_max: number;
	pressure: number;
	humidity: number;
}
interface IWind {
	speed: number;
	deg: number;
	gust: number;
}
interface ICloud {
	all: number;
}
export interface IWeather {
	id: number;
	main: string;
	description: string;
	icon: string;
}

interface IPrecipitationH {
	//Precipitation, mm/h
	"1h"?: number;
	"3h"?: number;
}

export type RouteData = ICity & { animationState?: string };
