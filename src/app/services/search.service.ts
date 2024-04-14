import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ICity, ICitySearchResult } from "../city-types";
import { IFiveDaysForecast } from "../forecast-types";
import { WEATHER_API_LICENSE } from "../tokens";

@Injectable({
	providedIn: "root",
})
export class SearchService {
	// license!: string;
	constructor(
		private httpClient: HttpClient,
		@Inject(WEATHER_API_LICENSE) private readonly licenseApi: string
	) {
		// licenseObs.subscribe((l: string): void => {
		// 	this.license = l;
		// 	console.log(this.license);
		// });
	}

	getIconUrl(icon: string): string {
		return `http://openweathermap.org/img/w/${icon}.png`;
	}
	//weather.sys.country
	getCountryFlagUrl(country: string): string {
		const lowerCaseCountry = country.toLowerCase();
		return `http://openweathermap.org/images/flags/${lowerCaseCountry}.png`;
	}
	searchCountry(queryArg: string): Observable<ICitySearchResult> {
		return this.httpClient.get<ICitySearchResult>(
			`https://api.openweathermap.org/data/2.5/find?q=${queryArg}&type=like&appid=${this.licenseApi}&units=metric`
		);
	}
	getCountry(cityId: number): Observable<ICity> {
		// return of(
		// 	JSON.parse(
		// 		JSON.stringify({
		// 			coord: {
		// 				lon: -89.5026,
		// 				lat: 40.8831,
		// 			},
		// 			weather: [
		// 				{
		// 					id: 800,
		// 					main: "Clear",
		// 					description: "clear sky",
		// 					icon: "01n",
		// 				},
		// 			],
		// 			base: "stations",
		// 			main: {
		// 				temp: 17.69,
		// 				feels_like: 17.11,
		// 				temp_min: 15.72,
		// 				temp_max: 18.91,
		// 				pressure: 1006,
		// 				humidity: 61,
		// 			},
		// 			visibility: 10000,
		// 			wind: {
		// 				speed: 4.12,
		// 				deg: 230,
		// 			},
		// 			clouds: {
		// 				all: 0,
		// 			},
		// 			dt: 1713082173,
		// 			sys: {
		// 				type: 2,
		// 				id: 2006867,
		// 				country: "US",
		// 				sunrise: 1713093572,
		// 				sunset: 1713141378,
		// 			},
		// 			timezone: -18000,
		// 			id: 4908066,
		// 			name: "Rome",
		// 			cod: 200,
		// 		})
		// 	)
		// );

		return this.httpClient.get<ICity>(
			`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${this.licenseApi}`
		);
	}

	getFiveDaysForecast(cityId: number): Observable<IFiveDaysForecast> {
		// return of(
		// 	JSON.parse(
		// 		JSON.stringify({
		// 			cod: "200",
		// 			message: 0,
		// 			cnt: 40,
		// 			list: [
		// 				{
		// 					dt: 1713096000,
		// 					main: {
		// 						temp: 290.49,
		// 						feels_like: 289.95,
		// 						temp_min: 288.77,
		// 						temp_max: 290.49,
		// 						pressure: 1007,
		// 						sea_level: 1007,
		// 						grnd_level: 984,
		// 						humidity: 64,
		// 						temp_kf: 1.72,
		// 					},
		// 					weather: [
		// 						{
		// 							id: 500,
		// 							main: "Rain",
		// 							description: "light rain",
		// 							icon: "10d",
		// 						},
		// 					],
		// 					clouds: {
		// 						all: 7,
		// 					},
		// 					wind: {
		// 						speed: 5.94,
		// 						deg: 227,
		// 						gust: 15.11,
		// 					},
		// 					visibility: 10000,
		// 					pop: 0.2,
		// 					rain: {
		// 						"3h": 0.14,
		// 					},
		// 					sys: {
		// 						pod: "d",
		// 					},
		// 					dt_txt: "2024-04-14 12:00:00",
		// 				},
		// 				{
		// 					dt: 1713106800,
		// 					main: {
		// 						temp: 292.77,
		// 						feels_like: 292.46,
		// 						temp_min: 292.77,
		// 						temp_max: 293.48,
		// 						pressure: 1007,
		// 						sea_level: 1007,
		// 						grnd_level: 985,
		// 						humidity: 64,
		// 						temp_kf: -0.71,
		// 					},
		// 					weather: [
		// 						{
		// 							id: 800,
		// 							main: "Clear",
		// 							description: "clear sky",
		// 							icon: "01d",
		// 						},
		// 					],
		// 					clouds: {
		// 						all: 9,
		// 					},
		// 					wind: {
		// 						speed: 6.46,
		// 						deg: 256,
		// 						gust: 9.2,
		// 					},
		// 					visibility: 10000,
		// 					pop: 0,
		// 					sys: {
		// 						pod: "d",
		// 					},
		// 					dt_txt: "2024-04-14 15:00:00",
		// 				},
		// 				{
		// 					dt: 1713117600,
		// 					main: {
		// 						temp: 298.02,
		// 						feels_like: 298.02,
		// 						temp_min: 298.02,
		// 						temp_max: 298.02,
		// 						pressure: 1008,
		// 						sea_level: 1008,
		// 						grnd_level: 984,
		// 						humidity: 56,
		// 						temp_kf: 0,
		// 					},
		// 					weather: [
		// 						{
		// 							id: 801,
		// 							main: "Clouds",
		// 							description: "few clouds",
		// 							icon: "02d",
		// 						},
		// 					],
		// 					clouds: {
		// 						all: 14,
		// 					},
		// 					wind: {
		// 						speed: 4.25,
		// 						deg: 277,
		// 						gust: 5.09,
		// 					},
		// 					visibility: 10000,
		// 					pop: 0,
		// 					sys: {
		// 						pod: "d",
		// 					},
		// 					dt_txt: "2024-04-14 18:00:00",
		// 				},
		// 				{
		// 					dt: 1713128400,
		// 					main: {
		// 						temp: 299.6,
		// 						feels_like: 299.6,
		// 						temp_min: 299.6,
		// 						temp_max: 299.6,
		// 						pressure: 1007,
		// 						sea_level: 1007,
		// 						grnd_level: 984,
		// 						humidity: 51,
		// 						temp_kf: 0,
		// 					},
		// 					weather: [
		// 						{
		// 							id: 800,
		// 							main: "Clear",
		// 							description: "clear sky",
		// 							icon: "01d",
		// 						},
		// 					],
		// 					clouds: {
		// 						all: 0,
		// 					},
		// 					wind: {
		// 						speed: 3.65,
		// 						deg: 285,
		// 						gust: 4.53,
		// 					},
		// 					visibility: 10000,
		// 					pop: 0,
		// 					sys: {
		// 						pod: "d",
		// 					},
		// 					dt_txt: "2024-04-14 21:00:00",
		// 				},
		// 				{
		// 					dt: 1713139200,
		// 					main: {
		// 						temp: 296.39,
		// 						feels_like: 296.39,
		// 						temp_min: 296.39,
		// 						temp_max: 296.39,
		// 						pressure: 1008,
		// 						sea_level: 1008,
		// 						grnd_level: 985,
		// 						humidity: 62,
		// 						temp_kf: 0,
		// 					},
		// 					weather: [
		// 						{
		// 							id: 800,
		// 							main: "Clear",
		// 							description: "clear sky",
		// 							icon: "01d",
		// 						},
		// 					],
		// 					clouds: {
		// 						all: 3,
		// 					},
		// 					wind: {
		// 						speed: 2.14,
		// 						deg: 308,
		// 						gust: 2.21,
		// 					},
		// 					visibility: 10000,
		// 					pop: 0,
		// 					sys: {
		// 						pod: "d",
		// 					},
		// 					dt_txt: "2024-04-15 00:00:00",
		// 				},
		// 				{
		// 					dt: 1713150000,
		// 					main: {
		// 						temp: 291.8,
		// 						feels_like: 291.44,
		// 						temp_min: 291.8,
		// 						temp_max: 291.8,
		// 						pressure: 1010,
		// 						sea_level: 1010,
		// 						grnd_level: 987,
		// 						humidity: 66,
		// 						temp_kf: 0,
		// 					},
		// 					weather: [
		// 						{
		// 							id: 800,
		// 							main: "Clear",
		// 							description: "clear sky",
		// 							icon: "01n",
		// 						},
		// 					],
		// 					clouds: {
		// 						all: 0,
		// 					},
		// 					wind: {
		// 						speed: 3.54,
		// 						deg: 358,
		// 						gust: 6.19,
		// 					},
		// 					visibility: 10000,
		// 					pop: 0,
		// 					sys: {
		// 						pod: "n",
		// 					},
		// 					dt_txt: "2024-04-15 03:00:00",
		// 				},
		// 				{
		// 					dt: 1713160800,
		// 					main: {
		// 						temp: 288.82,
		// 						feels_like: 288.45,
		// 						temp_min: 288.82,
		// 						temp_max: 288.82,
		// 						pressure: 1012,
		// 						sea_level: 1012,
		// 						grnd_level: 988,
		// 						humidity: 77,
		// 						temp_kf: 0,
		// 					},
		// 					weather: [
		// 						{
		// 							id: 800,
		// 							main: "Clear",
		// 							description: "clear sky",
		// 							icon: "01n",
		// 						},
		// 					],
		// 					clouds: {
		// 						all: 0,
		// 					},
		// 					wind: {
		// 						speed: 3.73,
		// 						deg: 13,
		// 						gust: 10.24,
		// 					},
		// 					visibility: 10000,
		// 					pop: 0,
		// 					sys: {
		// 						pod: "n",
		// 					},
		// 					dt_txt: "2024-04-15 06:00:00",
		// 				},
		// 				{
		// 					dt: 1713171600,
		// 					main: {
		// 						temp: 286.52,
		// 						feels_like: 285.98,
		// 						temp_min: 286.52,
		// 						temp_max: 286.52,
		// 						pressure: 1013,
		// 						sea_level: 1013,
		// 						grnd_level: 989,
		// 						humidity: 79,
		// 						temp_kf: 0,
		// 					},
		// 					weather: [
		// 						{
		// 							id: 800,
		// 							main: "Clear",
		// 							description: "clear sky",
		// 							icon: "01n",
		// 						},
		// 					],
		// 					clouds: {
		// 						all: 0,
		// 					},
		// 					wind: {
		// 						speed: 3.4,
		// 						deg: 22,
		// 						gust: 8.47,
		// 					},
		// 					visibility: 10000,
		// 					pop: 0,
		// 					sys: {
		// 						pod: "n",
		// 					},
		// 					dt_txt: "2024-04-15 09:00:00",
		// 				},
		// 				{
		// 					dt: 1713182400,
		// 					main: {
		// 						temp: 285.64,
		// 						feels_like: 285.19,
		// 						temp_min: 285.64,
		// 						temp_max: 285.64,
		// 						pressure: 1015,
		// 						sea_level: 1015,
		// 						grnd_level: 990,
		// 						humidity: 86,
		// 						temp_kf: 0,
		// 					},
		// 					weather: [
		// 						{
		// 							id: 800,
		// 							main: "Clear",
		// 							description: "clear sky",
		// 							icon: "01d",
		// 						},
		// 					],
		// 					clouds: {
		// 						all: 1,
		// 					},
		// 					wind: {
		// 						speed: 3.37,
		// 						deg: 46,
		// 						gust: 8.66,
		// 					},
		// 					visibility: 10000,
		// 					pop: 0,
		// 					sys: {
		// 						pod: "d",
		// 					},
		// 					dt_txt: "2024-04-15 12:00:00",
		// 				},
		// 				{
		// 					dt: 1713193200,
		// 					main: {
		// 						temp: 291.53,
		// 						feels_like: 290.89,
		// 						temp_min: 291.53,
		// 						temp_max: 291.53,
		// 						pressure: 1015,
		// 						sea_level: 1015,
		// 						grnd_level: 991,
		// 						humidity: 56,
		// 						temp_kf: 0,
		// 					},
		// 					weather: [
		// 						{
		// 							id: 803,
		// 							main: "Clouds",
		// 							description: "broken clouds",
		// 							icon: "04d",
		// 						},
		// 					],
		// 					clouds: {
		// 						all: 64,
		// 					},
		// 					wind: {
		// 						speed: 4.44,
		// 						deg: 79,
		// 						gust: 5.91,
		// 					},
		// 					visibility: 10000,
		// 					pop: 0,
		// 					sys: {
		// 						pod: "d",
		// 					},
		// 					dt_txt: "2024-04-15 15:00:00",
		// 				},
		// 				{
		// 					dt: 1713204000,
		// 					main: {
		// 						temp: 295.76,
		// 						feels_like: 295.09,
		// 						temp_min: 295.76,
		// 						temp_max: 295.76,
		// 						pressure: 1015,
		// 						sea_level: 1015,
		// 						grnd_level: 991,
		// 						humidity: 39,
		// 						temp_kf: 0,
		// 					},
		// 					weather: [
		// 						{
		// 							id: 802,
		// 							main: "Clouds",
		// 							description: "scattered clouds",
		// 							icon: "03d",
		// 						},
		// 					],
		// 					clouds: {
		// 						all: 36,
		// 					},
		// 					wind: {
		// 						speed: 3.49,
		// 						deg: 98,
		// 						gust: 3.77,
		// 					},
		// 					visibility: 10000,
		// 					pop: 0,
		// 					sys: {
		// 						pod: "d",
		// 					},
		// 					dt_txt: "2024-04-15 18:00:00",
		// 				},
		// 				{
		// 					dt: 1713214800,
		// 					main: {
		// 						temp: 297.33,
		// 						feels_like: 296.77,
		// 						temp_min: 297.33,
		// 						temp_max: 297.33,
		// 						pressure: 1013,
		// 						sea_level: 1013,
		// 						grnd_level: 990,
		// 						humidity: 37,
		// 						temp_kf: 0,
		// 					},
		// 					weather: [
		// 						{
		// 							id: 800,
		// 							main: "Clear",
		// 							description: "clear sky",
		// 							icon: "01d",
		// 						},
		// 					],
		// 					clouds: {
		// 						all: 1,
		// 					},
		// 					wind: {
		// 						speed: 3.76,
		// 						deg: 89,
		// 						gust: 4,
		// 					},
		// 					visibility: 10000,
		// 					pop: 0,
		// 					sys: {
		// 						pod: "d",
		// 					},
		// 					dt_txt: "2024-04-15 21:00:00",
		// 				},
		// 				{
		// 					dt: 1713225600,
		// 					main: {
		// 						temp: 292.74,
		// 						feels_like: 292.24,
		// 						temp_min: 292.74,
		// 						temp_max: 292.74,
		// 						pressure: 1013,
		// 						sea_level: 1013,
		// 						grnd_level: 989,
		// 						humidity: 57,
		// 						temp_kf: 0,
		// 					},
		// 					weather: [
		// 						{
		// 							id: 802,
		// 							main: "Clouds",
		// 							description: "scattered clouds",
		// 							icon: "03d",
		// 						},
		// 					],
		// 					clouds: {
		// 						all: 25,
		// 					},
		// 					wind: {
		// 						speed: 3.92,
		// 						deg: 74,
		// 						gust: 8.86,
		// 					},
		// 					visibility: 10000,
		// 					pop: 0,
		// 					sys: {
		// 						pod: "d",
		// 					},
		// 					dt_txt: "2024-04-16 00:00:00",
		// 				},
		// 				{
		// 					dt: 1713236400,
		// 					main: {
		// 						temp: 290.8,
		// 						feels_like: 290.24,
		// 						temp_min: 290.8,
		// 						temp_max: 290.8,
		// 						pressure: 1013,
		// 						sea_level: 1013,
		// 						grnd_level: 990,
		// 						humidity: 62,
		// 						temp_kf: 0,
		// 					},
		// 					weather: [
		// 						{
		// 							id: 500,
		// 							main: "Rain",
		// 							description: "light rain",
		// 							icon: "10n",
		// 						},
		// 					],
		// 					clouds: {
		// 						all: 92,
		// 					},
		// 					wind: {
		// 						speed: 5.42,
		// 						deg: 96,
		// 						gust: 13.77,
		// 					},
		// 					visibility: 10000,
		// 					pop: 0.22,
		// 					rain: {
		// 						"3h": 0.18,
		// 					},
		// 					sys: {
		// 						pod: "n",
		// 					},
		// 					dt_txt: "2024-04-16 03:00:00",
		// 				},
		// 				{
		// 					dt: 1713247200,
		// 					main: {
		// 						temp: 288.63,
		// 						feels_like: 288.22,
		// 						temp_min: 288.63,
		// 						temp_max: 288.63,
		// 						pressure: 1012,
		// 						sea_level: 1012,
		// 						grnd_level: 988,
		// 						humidity: 76,
		// 						temp_kf: 0,
		// 					},
		// 					weather: [
		// 						{
		// 							id: 500,
		// 							main: "Rain",
		// 							description: "light rain",
		// 							icon: "10n",
		// 						},
		// 					],
		// 					clouds: {
		// 						all: 96,
		// 					},
		// 					wind: {
		// 						speed: 6.48,
		// 						deg: 89,
		// 						gust: 15.25,
		// 					},
		// 					visibility: 10000,
		// 					pop: 1,
		// 					rain: {
		// 						"3h": 1.19,
		// 					},
		// 					sys: {
		// 						pod: "n",
		// 					},
		// 					dt_txt: "2024-04-16 06:00:00",
		// 				},
		// 				{
		// 					dt: 1713258000,
		// 					main: {
		// 						temp: 288.03,
		// 						feels_like: 287.92,
		// 						temp_min: 288.03,
		// 						temp_max: 288.03,
		// 						pressure: 1012,
		// 						sea_level: 1012,
		// 						grnd_level: 988,
		// 						humidity: 90,
		// 						temp_kf: 0,
		// 					},
		// 					weather: [
		// 						{
		// 							id: 501,
		// 							main: "Rain",
		// 							description: "moderate rain",
		// 							icon: "10n",
		// 						},
		// 					],
		// 					clouds: {
		// 						all: 100,
		// 					},
		// 					wind: {
		// 						speed: 4.53,
		// 						deg: 97,
		// 						gust: 9.57,
		// 					},
		// 					visibility: 7550,
		// 					pop: 1,
		// 					rain: {
		// 						"3h": 3.23,
		// 					},
		// 					sys: {
		// 						pod: "n",
		// 					},
		// 					dt_txt: "2024-04-16 09:00:00",
		// 				},
		// 				{
		// 					dt: 1713268800,
		// 					main: {
		// 						temp: 288.37,
		// 						feels_like: 288.51,
		// 						temp_min: 288.37,
		// 						temp_max: 288.37,
		// 						pressure: 1010,
		// 						sea_level: 1010,
		// 						grnd_level: 986,
		// 						humidity: 98,
		// 						temp_kf: 0,
		// 					},
		// 					weather: [
		// 						{
		// 							id: 501,
		// 							main: "Rain",
		// 							description: "moderate rain",
		// 							icon: "10d",
		// 						},
		// 					],
		// 					clouds: {
		// 						all: 100,
		// 					},
		// 					wind: {
		// 						speed: 4.24,
		// 						deg: 98,
		// 						gust: 8.81,
		// 					},
		// 					visibility: 7833,
		// 					pop: 1,
		// 					rain: {
		// 						"3h": 3.73,
		// 					},
		// 					sys: {
		// 						pod: "d",
		// 					},
		// 					dt_txt: "2024-04-16 12:00:00",
		// 				},
		// 				{
		// 					dt: 1713279600,
		// 					main: {
		// 						temp: 290.38,
		// 						feels_like: 290.67,
		// 						temp_min: 290.38,
		// 						temp_max: 290.38,
		// 						pressure: 1009,
		// 						sea_level: 1009,
		// 						grnd_level: 985,
		// 						humidity: 96,
		// 						temp_kf: 0,
		// 					},
		// 					weather: [
		// 						{
		// 							id: 501,
		// 							main: "Rain",
		// 							description: "moderate rain",
		// 							icon: "10d",
		// 						},
		// 					],
		// 					clouds: {
		// 						all: 100,
		// 					},
		// 					wind: {
		// 						speed: 5.25,
		// 						deg: 106,
		// 						gust: 10.41,
		// 					},
		// 					visibility: 9956,
		// 					pop: 1,
		// 					rain: {
		// 						"3h": 10.62,
		// 					},
		// 					sys: {
		// 						pod: "d",
		// 					},
		// 					dt_txt: "2024-04-16 15:00:00",
		// 				},
		// 				{
		// 					dt: 1713290400,
		// 					main: {
		// 						temp: 293.42,
		// 						feels_like: 293.75,
		// 						temp_min: 293.42,
		// 						temp_max: 293.42,
		// 						pressure: 1006,
		// 						sea_level: 1006,
		// 						grnd_level: 983,
		// 						humidity: 86,
		// 						temp_kf: 0,
		// 					},
		// 					weather: [
		// 						{
		// 							id: 500,
		// 							main: "Rain",
		// 							description: "light rain",
		// 							icon: "10d",
		// 						},
		// 					],
		// 					clouds: {
		// 						all: 100,
		// 					},
		// 					wind: {
		// 						speed: 7.16,
		// 						deg: 148,
		// 						gust: 11.47,
		// 					},
		// 					visibility: 10000,
		// 					pop: 1,
		// 					rain: {
		// 						"3h": 0.58,
		// 					},
		// 					sys: {
		// 						pod: "d",
		// 					},
		// 					dt_txt: "2024-04-16 18:00:00",
		// 				},
		// 				{
		// 					dt: 1713301200,
		// 					main: {
		// 						temp: 296.47,
		// 						feels_like: 296.69,
		// 						temp_min: 296.47,
		// 						temp_max: 296.47,
		// 						pressure: 1003,
		// 						sea_level: 1003,
		// 						grnd_level: 980,
		// 						humidity: 70,
		// 						temp_kf: 0,
		// 					},
		// 					weather: [
		// 						{
		// 							id: 500,
		// 							main: "Rain",
		// 							description: "light rain",
		// 							icon: "10d",
		// 						},
		// 					],
		// 					clouds: {
		// 						all: 97,
		// 					},
		// 					wind: {
		// 						speed: 8.62,
		// 						deg: 162,
		// 						gust: 13.58,
		// 					},
		// 					visibility: 10000,
		// 					pop: 0.74,
		// 					rain: {
		// 						"3h": 0.35,
		// 					},
		// 					sys: {
		// 						pod: "d",
		// 					},
		// 					dt_txt: "2024-04-16 21:00:00",
		// 				},
		// 				{
		// 					dt: 1713312000,
		// 					main: {
		// 						temp: 292.74,
		// 						feels_like: 292.87,
		// 						temp_min: 292.74,
		// 						temp_max: 292.74,
		// 						pressure: 1003,
		// 						sea_level: 1003,
		// 						grnd_level: 980,
		// 						humidity: 81,
		// 						temp_kf: 0,
		// 					},
		// 					weather: [
		// 						{
		// 							id: 500,
		// 							main: "Rain",
		// 							description: "light rain",
		// 							icon: "10d",
		// 						},
		// 					],
		// 					clouds: {
		// 						all: 99,
		// 					},
		// 					wind: {
		// 						speed: 8.64,
		// 						deg: 197,
		// 						gust: 16.75,
		// 					},
		// 					visibility: 10000,
		// 					pop: 1,
		// 					rain: {
		// 						"3h": 0.72,
		// 					},
		// 					sys: {
		// 						pod: "d",
		// 					},
		// 					dt_txt: "2024-04-17 00:00:00",
		// 				},
		// 				{
		// 					dt: 1713322800,
		// 					main: {
		// 						temp: 291.73,
		// 						feels_like: 291.84,
		// 						temp_min: 291.73,
		// 						temp_max: 291.73,
		// 						pressure: 1003,
		// 						sea_level: 1003,
		// 						grnd_level: 979,
		// 						humidity: 84,
		// 						temp_kf: 0,
		// 					},
		// 					weather: [
		// 						{
		// 							id: 500,
		// 							main: "Rain",
		// 							description: "light rain",
		// 							icon: "10n",
		// 						},
		// 					],
		// 					clouds: {
		// 						all: 30,
		// 					},
		// 					wind: {
		// 						speed: 7.61,
		// 						deg: 185,
		// 						gust: 15.59,
		// 					},
		// 					visibility: 10000,
		// 					pop: 1,
		// 					rain: {
		// 						"3h": 1.01,
		// 					},
		// 					sys: {
		// 						pod: "n",
		// 					},
		// 					dt_txt: "2024-04-17 03:00:00",
		// 				},
		// 				{
		// 					dt: 1713333600,
		// 					main: {
		// 						temp: 291.3,
		// 						feels_like: 291.31,
		// 						temp_min: 291.3,
		// 						temp_max: 291.3,
		// 						pressure: 1001,
		// 						sea_level: 1001,
		// 						grnd_level: 978,
		// 						humidity: 82,
		// 						temp_kf: 0,
		// 					},
		// 					weather: [
		// 						{
		// 							id: 500,
		// 							main: "Rain",
		// 							description: "light rain",
		// 							icon: "10n",
		// 						},
		// 					],
		// 					clouds: {
		// 						all: 16,
		// 					},
		// 					wind: {
		// 						speed: 5.78,
		// 						deg: 180,
		// 						gust: 12.83,
		// 					},
		// 					visibility: 10000,
		// 					pop: 1,
		// 					rain: {
		// 						"3h": 1.65,
		// 					},
		// 					sys: {
		// 						pod: "n",
		// 					},
		// 					dt_txt: "2024-04-17 06:00:00",
		// 				},
		// 				{
		// 					dt: 1713344400,
		// 					main: {
		// 						temp: 290.05,
		// 						feels_like: 290.2,
		// 						temp_min: 290.05,
		// 						temp_max: 290.05,
		// 						pressure: 1000,
		// 						sea_level: 1000,
		// 						grnd_level: 976,
		// 						humidity: 92,
		// 						temp_kf: 0,
		// 					},
		// 					weather: [
		// 						{
		// 							id: 500,
		// 							main: "Rain",
		// 							description: "light rain",
		// 							icon: "10n",
		// 						},
		// 					],
		// 					clouds: {
		// 						all: 2,
		// 					},
		// 					wind: {
		// 						speed: 7.05,
		// 						deg: 165,
		// 						gust: 15.89,
		// 					},
		// 					visibility: 10000,
		// 					pop: 1,
		// 					rain: {
		// 						"3h": 0.77,
		// 					},
		// 					sys: {
		// 						pod: "n",
		// 					},
		// 					dt_txt: "2024-04-17 09:00:00",
		// 				},
		// 				{
		// 					dt: 1713355200,
		// 					main: {
		// 						temp: 290.97,
		// 						feels_like: 290.87,
		// 						temp_min: 290.97,
		// 						temp_max: 290.97,
		// 						pressure: 999,
		// 						sea_level: 999,
		// 						grnd_level: 976,
		// 						humidity: 79,
		// 						temp_kf: 0,
		// 					},
		// 					weather: [
		// 						{
		// 							id: 500,
		// 							main: "Rain",
		// 							description: "light rain",
		// 							icon: "10d",
		// 						},
		// 					],
		// 					clouds: {
		// 						all: 47,
		// 					},
		// 					wind: {
		// 						speed: 9.09,
		// 						deg: 208,
		// 						gust: 15.04,
		// 					},
		// 					visibility: 10000,
		// 					pop: 1,
		// 					rain: {
		// 						"3h": 0.42,
		// 					},
		// 					sys: {
		// 						pod: "d",
		// 					},
		// 					dt_txt: "2024-04-17 12:00:00",
		// 				},
		// 				{
		// 					dt: 1713366000,
		// 					main: {
		// 						temp: 291.04,
		// 						feels_like: 290.79,
		// 						temp_min: 291.04,
		// 						temp_max: 291.04,
		// 						pressure: 1000,
		// 						sea_level: 1000,
		// 						grnd_level: 977,
		// 						humidity: 73,
		// 						temp_kf: 0,
		// 					},
		// 					weather: [
		// 						{
		// 							id: 500,
		// 							main: "Rain",
		// 							description: "light rain",
		// 							icon: "10d",
		// 						},
		// 					],
		// 					clouds: {
		// 						all: 66,
		// 					},
		// 					wind: {
		// 						speed: 9.42,
		// 						deg: 224,
		// 						gust: 14.53,
		// 					},
		// 					visibility: 10000,
		// 					pop: 0.2,
		// 					rain: {
		// 						"3h": 0.14,
		// 					},
		// 					sys: {
		// 						pod: "d",
		// 					},
		// 					dt_txt: "2024-04-17 15:00:00",
		// 				},
		// 				{
		// 					dt: 1713376800,
		// 					main: {
		// 						temp: 289.66,
		// 						feels_like: 289.35,
		// 						temp_min: 289.66,
		// 						temp_max: 289.66,
		// 						pressure: 1001,
		// 						sea_level: 1001,
		// 						grnd_level: 977,
		// 						humidity: 76,
		// 						temp_kf: 0,
		// 					},
		// 					weather: [
		// 						{
		// 							id: 500,
		// 							main: "Rain",
		// 							description: "light rain",
		// 							icon: "10d",
		// 						},
		// 					],
		// 					clouds: {
		// 						all: 75,
		// 					},
		// 					wind: {
		// 						speed: 10.58,
		// 						deg: 244,
		// 						gust: 15.85,
		// 					},
		// 					visibility: 10000,
		// 					pop: 1,
		// 					rain: {
		// 						"3h": 0.83,
		// 					},
		// 					sys: {
		// 						pod: "d",
		// 					},
		// 					dt_txt: "2024-04-17 18:00:00",
		// 				},
		// 				{
		// 					dt: 1713387600,
		// 					main: {
		// 						temp: 289.54,
		// 						feels_like: 289.35,
		// 						temp_min: 289.54,
		// 						temp_max: 289.54,
		// 						pressure: 1002,
		// 						sea_level: 1002,
		// 						grnd_level: 979,
		// 						humidity: 81,
		// 						temp_kf: 0,
		// 					},
		// 					weather: [
		// 						{
		// 							id: 500,
		// 							main: "Rain",
		// 							description: "light rain",
		// 							icon: "10d",
		// 						},
		// 					],
		// 					clouds: {
		// 						all: 88,
		// 					},
		// 					wind: {
		// 						speed: 9.99,
		// 						deg: 256,
		// 						gust: 16.04,
		// 					},
		// 					visibility: 10000,
		// 					pop: 0.23,
		// 					rain: {
		// 						"3h": 0.12,
		// 					},
		// 					sys: {
		// 						pod: "d",
		// 					},
		// 					dt_txt: "2024-04-17 21:00:00",
		// 				},
		// 				{
		// 					dt: 1713398400,
		// 					main: {
		// 						temp: 287.87,
		// 						feels_like: 287.54,
		// 						temp_min: 287.87,
		// 						temp_max: 287.87,
		// 						pressure: 1007,
		// 						sea_level: 1007,
		// 						grnd_level: 983,
		// 						humidity: 82,
		// 						temp_kf: 0,
		// 					},
		// 					weather: [
		// 						{
		// 							id: 500,
		// 							main: "Rain",
		// 							description: "light rain",
		// 							icon: "10d",
		// 						},
		// 					],
		// 					clouds: {
		// 						all: 89,
		// 					},
		// 					wind: {
		// 						speed: 8.63,
		// 						deg: 281,
		// 						gust: 12.86,
		// 					},
		// 					visibility: 10000,
		// 					pop: 0.2,
		// 					rain: {
		// 						"3h": 0.35,
		// 					},
		// 					sys: {
		// 						pod: "d",
		// 					},
		// 					dt_txt: "2024-04-18 00:00:00",
		// 				},
		// 				{
		// 					dt: 1713409200,
		// 					main: {
		// 						temp: 285.82,
		// 						feels_like: 285.31,
		// 						temp_min: 285.82,
		// 						temp_max: 285.82,
		// 						pressure: 1011,
		// 						sea_level: 1011,
		// 						grnd_level: 987,
		// 						humidity: 83,
		// 						temp_kf: 0,
		// 					},
		// 					weather: [
		// 						{
		// 							id: 804,
		// 							main: "Clouds",
		// 							description: "overcast clouds",
		// 							icon: "04n",
		// 						},
		// 					],
		// 					clouds: {
		// 						all: 100,
		// 					},
		// 					wind: {
		// 						speed: 6.3,
		// 						deg: 295,
		// 						gust: 11.08,
		// 					},
		// 					visibility: 10000,
		// 					pop: 0,
		// 					sys: {
		// 						pod: "n",
		// 					},
		// 					dt_txt: "2024-04-18 03:00:00",
		// 				},
		// 				{
		// 					dt: 1713420000,
		// 					main: {
		// 						temp: 283.46,
		// 						feels_like: 282.69,
		// 						temp_min: 283.46,
		// 						temp_max: 283.46,
		// 						pressure: 1013,
		// 						sea_level: 1013,
		// 						grnd_level: 989,
		// 						humidity: 82,
		// 						temp_kf: 0,
		// 					},
		// 					weather: [
		// 						{
		// 							id: 804,
		// 							main: "Clouds",
		// 							description: "overcast clouds",
		// 							icon: "04n",
		// 						},
		// 					],
		// 					clouds: {
		// 						all: 88,
		// 					},
		// 					wind: {
		// 						speed: 5.87,
		// 						deg: 310,
		// 						gust: 12.1,
		// 					},
		// 					visibility: 10000,
		// 					pop: 0,
		// 					sys: {
		// 						pod: "n",
		// 					},
		// 					dt_txt: "2024-04-18 06:00:00",
		// 				},
		// 				{
		// 					dt: 1713430800,
		// 					main: {
		// 						temp: 283.02,
		// 						feels_like: 280.55,
		// 						temp_min: 283.02,
		// 						temp_max: 283.02,
		// 						pressure: 1015,
		// 						sea_level: 1015,
		// 						grnd_level: 991,
		// 						humidity: 75,
		// 						temp_kf: 0,
		// 					},
		// 					weather: [
		// 						{
		// 							id: 803,
		// 							main: "Clouds",
		// 							description: "broken clouds",
		// 							icon: "04n",
		// 						},
		// 					],
		// 					clouds: {
		// 						all: 60,
		// 					},
		// 					wind: {
		// 						speed: 5.07,
		// 						deg: 315,
		// 						gust: 10.61,
		// 					},
		// 					visibility: 10000,
		// 					pop: 0,
		// 					sys: {
		// 						pod: "n",
		// 					},
		// 					dt_txt: "2024-04-18 09:00:00",
		// 				},
		// 				{
		// 					dt: 1713441600,
		// 					main: {
		// 						temp: 281.26,
		// 						feels_like: 279.69,
		// 						temp_min: 281.26,
		// 						temp_max: 281.26,
		// 						pressure: 1017,
		// 						sea_level: 1017,
		// 						grnd_level: 992,
		// 						humidity: 84,
		// 						temp_kf: 0,
		// 					},
		// 					weather: [
		// 						{
		// 							id: 803,
		// 							main: "Clouds",
		// 							description: "broken clouds",
		// 							icon: "04d",
		// 						},
		// 					],
		// 					clouds: {
		// 						all: 60,
		// 					},
		// 					wind: {
		// 						speed: 2.56,
		// 						deg: 329,
		// 						gust: 9.89,
		// 					},
		// 					visibility: 10000,
		// 					pop: 0,
		// 					sys: {
		// 						pod: "d",
		// 					},
		// 					dt_txt: "2024-04-18 12:00:00",
		// 				},
		// 				{
		// 					dt: 1713452400,
		// 					main: {
		// 						temp: 284.4,
		// 						feels_like: 283.43,
		// 						temp_min: 284.4,
		// 						temp_max: 284.4,
		// 						pressure: 1019,
		// 						sea_level: 1019,
		// 						grnd_level: 995,
		// 						humidity: 71,
		// 						temp_kf: 0,
		// 					},
		// 					weather: [
		// 						{
		// 							id: 500,
		// 							main: "Rain",
		// 							description: "light rain",
		// 							icon: "10d",
		// 						},
		// 					],
		// 					clouds: {
		// 						all: 91,
		// 					},
		// 					wind: {
		// 						speed: 3.85,
		// 						deg: 324,
		// 						gust: 7.06,
		// 					},
		// 					visibility: 10000,
		// 					pop: 0.2,
		// 					rain: {
		// 						"3h": 0.12,
		// 					},
		// 					sys: {
		// 						pod: "d",
		// 					},
		// 					dt_txt: "2024-04-18 15:00:00",
		// 				},
		// 				{
		// 					dt: 1713463200,
		// 					main: {
		// 						temp: 283.54,
		// 						feels_like: 282.7,
		// 						temp_min: 283.54,
		// 						temp_max: 283.54,
		// 						pressure: 1020,
		// 						sea_level: 1020,
		// 						grnd_level: 995,
		// 						humidity: 79,
		// 						temp_kf: 0,
		// 					},
		// 					weather: [
		// 						{
		// 							id: 500,
		// 							main: "Rain",
		// 							description: "light rain",
		// 							icon: "10d",
		// 						},
		// 					],
		// 					clouds: {
		// 						all: 96,
		// 					},
		// 					wind: {
		// 						speed: 4.1,
		// 						deg: 307,
		// 						gust: 5.58,
		// 					},
		// 					visibility: 10000,
		// 					pop: 0.87,
		// 					rain: {
		// 						"3h": 1.02,
		// 					},
		// 					sys: {
		// 						pod: "d",
		// 					},
		// 					dt_txt: "2024-04-18 18:00:00",
		// 				},
		// 				{
		// 					dt: 1713474000,
		// 					main: {
		// 						temp: 284.23,
		// 						feels_like: 283.48,
		// 						temp_min: 284.23,
		// 						temp_max: 284.23,
		// 						pressure: 1019,
		// 						sea_level: 1019,
		// 						grnd_level: 994,
		// 						humidity: 80,
		// 						temp_kf: 0,
		// 					},
		// 					weather: [
		// 						{
		// 							id: 500,
		// 							main: "Rain",
		// 							description: "light rain",
		// 							icon: "10d",
		// 						},
		// 					],
		// 					clouds: {
		// 						all: 100,
		// 					},
		// 					wind: {
		// 						speed: 3.37,
		// 						deg: 297,
		// 						gust: 5.23,
		// 					},
		// 					visibility: 10000,
		// 					pop: 0.93,
		// 					rain: {
		// 						"3h": 0.71,
		// 					},
		// 					sys: {
		// 						pod: "d",
		// 					},
		// 					dt_txt: "2024-04-18 21:00:00",
		// 				},
		// 				{
		// 					dt: 1713484800,
		// 					main: {
		// 						temp: 283.15,
		// 						feels_like: 281.86,
		// 						temp_min: 283.15,
		// 						temp_max: 283.15,
		// 						pressure: 1019,
		// 						sea_level: 1019,
		// 						grnd_level: 995,
		// 						humidity: 90,
		// 						temp_kf: 0,
		// 					},
		// 					weather: [
		// 						{
		// 							id: 500,
		// 							main: "Rain",
		// 							description: "light rain",
		// 							icon: "10d",
		// 						},
		// 					],
		// 					clouds: {
		// 						all: 100,
		// 					},
		// 					wind: {
		// 						speed: 2.68,
		// 						deg: 264,
		// 						gust: 6.17,
		// 					},
		// 					visibility: 10000,
		// 					pop: 1,
		// 					rain: {
		// 						"3h": 0.38,
		// 					},
		// 					sys: {
		// 						pod: "d",
		// 					},
		// 					dt_txt: "2024-04-19 00:00:00",
		// 				},
		// 				{
		// 					dt: 1713495600,
		// 					main: {
		// 						temp: 282.18,
		// 						feels_like: 280.67,
		// 						temp_min: 282.18,
		// 						temp_max: 282.18,
		// 						pressure: 1020,
		// 						sea_level: 1020,
		// 						grnd_level: 996,
		// 						humidity: 89,
		// 						temp_kf: 0,
		// 					},
		// 					weather: [
		// 						{
		// 							id: 500,
		// 							main: "Rain",
		// 							description: "light rain",
		// 							icon: "10n",
		// 						},
		// 					],
		// 					clouds: {
		// 						all: 100,
		// 					},
		// 					wind: {
		// 						speed: 2.73,
		// 						deg: 287,
		// 						gust: 6.18,
		// 					},
		// 					visibility: 10000,
		// 					pop: 0.44,
		// 					rain: {
		// 						"3h": 0.33,
		// 					},
		// 					sys: {
		// 						pod: "n",
		// 					},
		// 					dt_txt: "2024-04-19 03:00:00",
		// 				},
		// 				{
		// 					dt: 1713506400,
		// 					main: {
		// 						temp: 281.07,
		// 						feels_like: 279.32,
		// 						temp_min: 281.07,
		// 						temp_max: 281.07,
		// 						pressure: 1020,
		// 						sea_level: 1020,
		// 						grnd_level: 996,
		// 						humidity: 93,
		// 						temp_kf: 0,
		// 					},
		// 					weather: [
		// 						{
		// 							id: 804,
		// 							main: "Clouds",
		// 							description: "overcast clouds",
		// 							icon: "04n",
		// 						},
		// 					],
		// 					clouds: {
		// 						all: 100,
		// 					},
		// 					wind: {
		// 						speed: 2.77,
		// 						deg: 274,
		// 						gust: 6.68,
		// 					},
		// 					visibility: 10000,
		// 					pop: 0.01,
		// 					sys: {
		// 						pod: "n",
		// 					},
		// 					dt_txt: "2024-04-19 06:00:00",
		// 				},
		// 				{
		// 					dt: 1713517200,
		// 					main: {
		// 						temp: 279.01,
		// 						feels_like: 276.77,
		// 						temp_min: 279.01,
		// 						temp_max: 279.01,
		// 						pressure: 1021,
		// 						sea_level: 1021,
		// 						grnd_level: 996,
		// 						humidity: 90,
		// 						temp_kf: 0,
		// 					},
		// 					weather: [
		// 						{
		// 							id: 802,
		// 							main: "Clouds",
		// 							description: "scattered clouds",
		// 							icon: "03n",
		// 						},
		// 					],
		// 					clouds: {
		// 						all: 43,
		// 					},
		// 					wind: {
		// 						speed: 2.88,
		// 						deg: 298,
		// 						gust: 7.16,
		// 					},
		// 					visibility: 10000,
		// 					pop: 0,
		// 					sys: {
		// 						pod: "n",
		// 					},
		// 					dt_txt: "2024-04-19 09:00:00",
		// 				},
		// 			],
		// 			city: {
		// 				id: 4908066,
		// 				name: "Rome",
		// 				coord: {
		// 					lat: 40.8831,
		// 					lon: -89.5026,
		// 				},
		// 				country: "US",
		// 				population: 0,
		// 				timezone: -18000,
		// 				sunrise: 1713093572,
		// 				sunset: 1713141378,
		// 			},
		// 		})
		// 	)
		// );
		return this.httpClient.get<IFiveDaysForecast>(
			`https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${this.licenseApi}&units=metric`
		);
	}
}
