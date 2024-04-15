export interface ICountryData {
	country: string;
	type?: number;
	id?: number;
	message?: number;
	sunrise?: number;
	sunset?: number;
}

export interface ICoordinate {
	lat: number;
	lon: number;
}

export interface IWind {
	speed: number;
	deg: number;
	gust?: number;
}

export interface ICloud {
	all: number;
}

export interface IPrecipitationH {
	//Precipitation, mm/h
	"1h"?: number;
	"3h"?: number;
}

export interface IWeather {
	id: number;
	main: string;
	description: string;
	icon: string;
}
