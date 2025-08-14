/**
 * File containing mocked data to be used in unit tests
 */

import { ICitySearchResult, ICityWeather } from "../types/city-types";
import { IFiveDaysForecast } from "../types/forecast-types";

export const mockForecastResult: IFiveDaysForecast = {
	cod: "200",
	message: 0,
	cnt: 40,
	list: [
		{
			dt: 1713139200,
			main: {
				temp: 15.29,
				feels_like: 14.62,
				temp_min: 15.29,
				temp_max: 15.29,
				pressure: 1021,
				sea_level: 1021,
				grnd_level: 1013,
				humidity: 67,
				temp_kf: 0,
			},
			weather: [
				{
					id: 800,
					main: "Clear",
					description: "clear sky",
					icon: "01n",
				},
			],
			clouds: {
				all: 0,
			},
			wind: {
				speed: 1.59,
				deg: 14,
				gust: 1.5,
			},
			visibility: 10000,
			pop: 0,
			sys: {
				pod: "n",
			},
			dt_txt: "2024-04-15 00:00:00",
		},
		{
			dt: 1713236400,
			main: {
				temp: 14.57,
				feels_like: 13.81,
				temp_min: 14.57,
				temp_max: 14.57,
				pressure: 1009,
				sea_level: 1009,
				grnd_level: 1001,
				humidity: 66,
				temp_kf: 0,
			},
			weather: [
				{
					id: 803,
					main: "Clouds",
					description: "broken clouds",
					icon: "04n",
				},
			],
			clouds: {
				all: 71,
			},
			wind: {
				speed: 2.59,
				deg: 142,
				gust: 4.81,
			},
			visibility: 10000,
			pop: 0,
			sys: {
				pod: "n",
			},
			dt_txt: "2024-04-16 03:00:00",
		},
		{
			dt: 1713312000,
			main: {
				temp: 11.97,
				feels_like: 10.89,
				temp_min: 11.97,
				temp_max: 11.97,
				pressure: 1001,
				sea_level: 1001,
				grnd_level: 993,
				humidity: 64,
				temp_kf: 0,
			},
			weather: [
				{
					id: 802,
					main: "Clouds",
					description: "scattered clouds",
					icon: "03n",
				},
			],
			clouds: {
				all: 39,
			},
			wind: {
				speed: 4.25,
				deg: 89,
				gust: 9.45,
			},
			visibility: 10000,
			pop: 0,
			sys: {
				pod: "n",
			},
			dt_txt: "2024-04-17 00:00:00",
		},
		{
			dt: 1713398400,
			main: {
				temp: 9.97,
				feels_like: 9.16,
				temp_min: 9.97,
				temp_max: 9.97,
				pressure: 1007,
				sea_level: 1007,
				grnd_level: 999,
				humidity: 75,
				temp_kf: 0,
			},
			weather: [
				{
					id: 803,
					main: "Clouds",
					description: "broken clouds",
					icon: "04n",
				},
			],
			clouds: {
				all: 68,
			},
			wind: {
				speed: 2,
				deg: 133,
				gust: 3.02,
			},
			visibility: 10000,
			pop: 0,
			sys: {
				pod: "n",
			},
			dt_txt: "2024-04-18 00:00:00",
		},
		{
			dt: 1713484800,
			main: {
				temp: 9.05,
				feels_like: 9.05,
				temp_min: 9.05,
				temp_max: 9.05,
				pressure: 1008,
				sea_level: 1008,
				grnd_level: 999,
				humidity: 92,
				temp_kf: 0,
			},
			weather: [
				{
					id: 500,
					main: "Rain",
					description: "light rain",
					icon: "10n",
				},
			],
			clouds: {
				all: 10,
			},
			wind: {
				speed: 0.45,
				deg: 224,
				gust: 2.19,
			},
			visibility: 10000,
			pop: 0.82,
			rain: {
				"3h": 0.45,
			},
			sys: {
				pod: "n",
			},
			dt_txt: "2024-04-19 00:00:00",
		},
	],
	city: {
		id: 3169070,
		name: "Rome",
		coord: {
			lat: 41.8947,
			lon: 12.4839,
		},
		country: "IT",
		population: 0,
		timezone: 7200,
		sunrise: 1713069044,
		sunset: 1713116961,
	},
};

export const mockCity: ICityWeather = {
	coord: {
		lon: 12.4839,
		lat: 41.8947,
	},
	weather: [
		{
			id: 800,
			main: "Clear",
			description: "clear sky",
			icon: "01d",
		},
	],
	base: "stations",
	main: {
		temp: 301.14,
		feels_like: 300.94,
		temp_min: 298.46,
		temp_max: 303.14,
		pressure: 1023,
		humidity: 42,
	},
	visibility: 10000,
	wind: {
		speed: 3.13,
		deg: 295,
		gust: 5.36,
	},
	clouds: {
		all: 0,
	},
	dt: 1713096219,
	sys: {
		type: 2,
		id: 2000926,
		country: "IT",
		sunrise: 1713069044,
		sunset: 1713116961,
	},
	timezone: 7200,
	id: 3169070,
	name: "Rome",
	cod: 200,
};
export const mockCitySearchResult: ICitySearchResult = {
	message: "",
	cod: "",
	count: 1,
	list: [mockCity],
};
