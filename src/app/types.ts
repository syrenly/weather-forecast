// #region models for generic SEARCH in autocomplete
export interface ICitySearchResult {
	message: string;
	cod: string;
	count: number;
	list: ICityResult[];
}
export interface ICityResult extends ICityBase {
	sys: ICountry | null;
}

interface ICountry {
	country: string;
}
// #endregion

// #region models for SPECIFIC retrieve of city
export interface ICity extends ICityBase {
	base: string;
	sys: ICountryData | null;
	cod: number;
}

interface ICountryData extends ICountry {
	country: string;
	type: number;
	id: number;
	message: number;
	sunrise: number;
	sunset: number;
}
// #endregion

//#region common interfaces between ICityResult and ICity

interface ICityBase {
	id: number;
	name: string;
	coord: ICoordinate | null;
	main: IMainInfo | null;
	dt: number;
	wind: IWind | null;
	rain: IPrecipitationH;
	snow: IPrecipitationH;
	visibility: number;
	clouds: ICloud | null;
	weather: IWeather[];
}

interface ICoordinate {
	lat: number;
	lon: number;
}
interface IMainInfo {
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
	"1h": number;
}
