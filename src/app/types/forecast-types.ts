import { ICloud, ICoordinate, IPrecipitationH, IWeather, IWind } from "./types";

export interface IFiveDaysForecast {
	cod: string;
	message: number;
	cnt: number;
	list: IThreeHoursForecast[];
	city: ICityInfo;
}

export interface IThreeHoursForecast {
	dt: number;
	main: Main;
	weather: IWeather[];
	clouds: ICloud;
	wind: IWind;
	visibility: number;
	pop: number;
	rain?: IPrecipitationH;
	snow?: IPrecipitationH;
	sys: ISys;
	dt_txt: string;
}

export interface Main {
	temp: number;
	feels_like: number;
	temp_min: number;
	temp_max: number;
	pressure: number;
	sea_level: number;
	grnd_level: number;
	humidity: number;
	temp_kf: number;
}

export interface ISys {
	pod: string;
}

export interface ICityInfo {
	id: number;
	name: string;
	coord: ICoordinate;
	country: string;
	population: number;
	timezone: number;
	sunrise: number;
	sunset: number;
}

export type IDaysDictionary = Partial<Record<string, IThreeHoursForecast[]>>;
