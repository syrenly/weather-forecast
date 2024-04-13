export interface IWeatherCity {
	id: number;
	base: string;
	name: string;
	coord: ICoordinate | null;
	main: IMainInfo | null;
	dt: number;
	wind: IWind | null;
	sys: ICountry | null;
	rain: IPrecipitationH;
	snow: IPrecipitationH;
	visibility: number;
	clouds: ICloud | null;
	weather: IWeather[];
}

export interface ICitySearchResult {
	message: string;
	cod: string;
	count: number;
	list: IWeatherCity[];
}

export interface ICoordinate {
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

export interface IWind {
	speed: number;
	deg: number;
}

export interface ICloud {
	all: number;
}

export interface IWeather {
	id: number;
	main: string;
	description: string;
	icon: string;
}

export interface ICountry {
	country: string;
}

interface IPrecipitationH {
	//Precipitation, mm/h
	"1h": number;
}
