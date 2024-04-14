import { ICity } from "./city-types";
import { IFiveDaysForecast } from "./forecast-types";

export const forecastResult: IFiveDaysForecast = {
	cod: "200",
	message: 0,
	cnt: 40,
	list: [
		{
			dt: 1713106800,
			main: {
				temp: 26.71,
				feels_like: 26.85,
				temp_min: 24.13,
				temp_max: 26.71,
				pressure: 1023,
				sea_level: 1023,
				grnd_level: 1014,
				humidity: 44,
				temp_kf: 2.58,
			},
			weather: [
				{
					id: 800,
					main: "Clear",
					description: "clear sky",
					icon: "01d",
				},
			],
			clouds: {
				all: 0,
			},
			wind: {
				speed: 4.18,
				deg: 246,
				gust: 4.62,
			},
			visibility: 10000,
			pop: 0,
			sys: {
				pod: "d",
			},
			dt_txt: "2024-04-14 15:00:00",
		},
		{
			dt: 1713117600,
			main: {
				temp: 21.74,
				feels_like: 21.43,
				temp_min: 18.61,
				temp_max: 21.74,
				pressure: 1022,
				sea_level: 1022,
				grnd_level: 1014,
				humidity: 56,
				temp_kf: 3.13,
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
				speed: 0.78,
				deg: 267,
				gust: 0.99,
			},
			visibility: 10000,
			pop: 0,
			sys: {
				pod: "n",
			},
			dt_txt: "2024-04-14 18:00:00",
		},
		{
			dt: 1713128400,
			main: {
				temp: 16.74,
				feels_like: 16.17,
				temp_min: 16.74,
				temp_max: 16.74,
				pressure: 1023,
				sea_level: 1023,
				grnd_level: 1014,
				humidity: 65,
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
				speed: 0.9,
				deg: 334,
				gust: 0.92,
			},
			visibility: 10000,
			pop: 0,
			sys: {
				pod: "n",
			},
			dt_txt: "2024-04-14 21:00:00",
		},
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
			dt: 1713150000,
			main: {
				temp: 14.24,
				feels_like: 13.52,
				temp_min: 14.24,
				temp_max: 14.24,
				pressure: 1020,
				sea_level: 1020,
				grnd_level: 1011,
				humidity: 69,
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
				speed: 2,
				deg: 29,
				gust: 1.87,
			},
			visibility: 10000,
			pop: 0,
			sys: {
				pod: "n",
			},
			dt_txt: "2024-04-15 03:00:00",
		},
		{
			dt: 1713160800,
			main: {
				temp: 16.54,
				feels_like: 15.92,
				temp_min: 16.54,
				temp_max: 16.54,
				pressure: 1019,
				sea_level: 1019,
				grnd_level: 1011,
				humidity: 64,
				temp_kf: 0,
			},
			weather: [
				{
					id: 801,
					main: "Clouds",
					description: "few clouds",
					icon: "02d",
				},
			],
			clouds: {
				all: 19,
			},
			wind: {
				speed: 0.93,
				deg: 32,
				gust: 0.99,
			},
			visibility: 10000,
			pop: 0,
			sys: {
				pod: "d",
			},
			dt_txt: "2024-04-15 06:00:00",
		},
		{
			dt: 1713171600,
			main: {
				temp: 22.63,
				feels_like: 21.97,
				temp_min: 22.63,
				temp_max: 22.63,
				pressure: 1019,
				sea_level: 1019,
				grnd_level: 1011,
				humidity: 39,
				temp_kf: 0,
			},
			weather: [
				{
					id: 802,
					main: "Clouds",
					description: "scattered clouds",
					icon: "03d",
				},
			],
			clouds: {
				all: 32,
			},
			wind: {
				speed: 2.52,
				deg: 218,
				gust: 3.81,
			},
			visibility: 10000,
			pop: 0,
			sys: {
				pod: "d",
			},
			dt_txt: "2024-04-15 09:00:00",
		},
		{
			dt: 1713182400,
			main: {
				temp: 24.27,
				feels_like: 23.67,
				temp_min: 24.27,
				temp_max: 24.27,
				pressure: 1017,
				sea_level: 1017,
				grnd_level: 1009,
				humidity: 35,
				temp_kf: 0,
			},
			weather: [
				{
					id: 801,
					main: "Clouds",
					description: "few clouds",
					icon: "02d",
				},
			],
			clouds: {
				all: 19,
			},
			wind: {
				speed: 4.06,
				deg: 216,
				gust: 5.18,
			},
			visibility: 10000,
			pop: 0,
			sys: {
				pod: "d",
			},
			dt_txt: "2024-04-15 12:00:00",
		},
		{
			dt: 1713193200,
			main: {
				temp: 22.94,
				feels_like: 22.28,
				temp_min: 22.94,
				temp_max: 22.94,
				pressure: 1015,
				sea_level: 1015,
				grnd_level: 1007,
				humidity: 38,
				temp_kf: 0,
			},
			weather: [
				{
					id: 802,
					main: "Clouds",
					description: "scattered clouds",
					icon: "03d",
				},
			],
			clouds: {
				all: 25,
			},
			wind: {
				speed: 2.95,
				deg: 237,
				gust: 3.56,
			},
			visibility: 10000,
			pop: 0,
			sys: {
				pod: "d",
			},
			dt_txt: "2024-04-15 15:00:00",
		},
		{
			dt: 1713204000,
			main: {
				temp: 17.42,
				feels_like: 16.63,
				temp_min: 17.42,
				temp_max: 17.42,
				pressure: 1014,
				sea_level: 1014,
				grnd_level: 1006,
				humidity: 54,
				temp_kf: 0,
			},
			weather: [
				{
					id: 801,
					main: "Clouds",
					description: "few clouds",
					icon: "02n",
				},
			],
			clouds: {
				all: 17,
			},
			wind: {
				speed: 2.38,
				deg: 207,
				gust: 5.56,
			},
			visibility: 10000,
			pop: 0,
			sys: {
				pod: "n",
			},
			dt_txt: "2024-04-15 18:00:00",
		},
		{
			dt: 1713214800,
			main: {
				temp: 14.94,
				feels_like: 14.13,
				temp_min: 14.94,
				temp_max: 14.94,
				pressure: 1014,
				sea_level: 1014,
				grnd_level: 1006,
				humidity: 63,
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
				all: 26,
			},
			wind: {
				speed: 0.41,
				deg: 124,
				gust: 0.79,
			},
			visibility: 10000,
			pop: 0,
			sys: {
				pod: "n",
			},
			dt_txt: "2024-04-15 21:00:00",
		},
		{
			dt: 1713225600,
			main: {
				temp: 14.83,
				feels_like: 13.99,
				temp_min: 14.83,
				temp_max: 14.83,
				pressure: 1012,
				sea_level: 1012,
				grnd_level: 1004,
				humidity: 62,
				temp_kf: 0,
			},
			weather: [
				{
					id: 801,
					main: "Clouds",
					description: "few clouds",
					icon: "02n",
				},
			],
			clouds: {
				all: 13,
			},
			wind: {
				speed: 2,
				deg: 174,
				gust: 5.18,
			},
			visibility: 10000,
			pop: 0,
			sys: {
				pod: "n",
			},
			dt_txt: "2024-04-16 00:00:00",
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
			dt: 1713247200,
			main: {
				temp: 16.59,
				feels_like: 16,
				temp_min: 16.59,
				temp_max: 16.59,
				pressure: 1008,
				sea_level: 1008,
				grnd_level: 1000,
				humidity: 65,
				temp_kf: 0,
			},
			weather: [
				{
					id: 803,
					main: "Clouds",
					description: "broken clouds",
					icon: "04d",
				},
			],
			clouds: {
				all: 60,
			},
			wind: {
				speed: 4.94,
				deg: 165,
				gust: 9.56,
			},
			visibility: 10000,
			pop: 0,
			sys: {
				pod: "d",
			},
			dt_txt: "2024-04-16 06:00:00",
		},
		{
			dt: 1713258000,
			main: {
				temp: 18.5,
				feels_like: 17.89,
				temp_min: 18.5,
				temp_max: 18.5,
				pressure: 1007,
				sea_level: 1007,
				grnd_level: 999,
				humidity: 57,
				temp_kf: 0,
			},
			weather: [
				{
					id: 800,
					main: "Clear",
					description: "clear sky",
					icon: "01d",
				},
			],
			clouds: {
				all: 2,
			},
			wind: {
				speed: 6.98,
				deg: 206,
				gust: 9.44,
			},
			visibility: 10000,
			pop: 0,
			sys: {
				pod: "d",
			},
			dt_txt: "2024-04-16 09:00:00",
		},
		{
			dt: 1713268800,
			main: {
				temp: 19.23,
				feels_like: 18.46,
				temp_min: 19.23,
				temp_max: 19.23,
				pressure: 1006,
				sea_level: 1006,
				grnd_level: 998,
				humidity: 48,
				temp_kf: 0,
			},
			weather: [
				{
					id: 800,
					main: "Clear",
					description: "clear sky",
					icon: "01d",
				},
			],
			clouds: {
				all: 1,
			},
			wind: {
				speed: 7.64,
				deg: 222,
				gust: 12.4,
			},
			visibility: 10000,
			pop: 0,
			sys: {
				pod: "d",
			},
			dt_txt: "2024-04-16 12:00:00",
		},
		{
			dt: 1713279600,
			main: {
				temp: 16.28,
				feels_like: 15.5,
				temp_min: 16.28,
				temp_max: 16.28,
				pressure: 1004,
				sea_level: 1004,
				grnd_level: 996,
				humidity: 59,
				temp_kf: 0,
			},
			weather: [
				{
					id: 802,
					main: "Clouds",
					description: "scattered clouds",
					icon: "03d",
				},
			],
			clouds: {
				all: 42,
			},
			wind: {
				speed: 7.61,
				deg: 218,
				gust: 10.95,
			},
			visibility: 10000,
			pop: 0,
			sys: {
				pod: "d",
			},
			dt_txt: "2024-04-16 15:00:00",
		},
		{
			dt: 1713290400,
			main: {
				temp: 13.42,
				feels_like: 12.49,
				temp_min: 13.42,
				temp_max: 13.42,
				pressure: 1003,
				sea_level: 1003,
				grnd_level: 995,
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
				all: 41,
			},
			wind: {
				speed: 6.22,
				deg: 190,
				gust: 9.36,
			},
			visibility: 10000,
			pop: 0,
			sys: {
				pod: "n",
			},
			dt_txt: "2024-04-16 18:00:00",
		},
		{
			dt: 1713301200,
			main: {
				temp: 13.37,
				feels_like: 12.43,
				temp_min: 13.37,
				temp_max: 13.37,
				pressure: 1002,
				sea_level: 1002,
				grnd_level: 994,
				humidity: 64,
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
				all: 80,
			},
			wind: {
				speed: 4.37,
				deg: 133,
				gust: 6.62,
			},
			visibility: 10000,
			pop: 0,
			sys: {
				pod: "n",
			},
			dt_txt: "2024-04-16 21:00:00",
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
			dt: 1713322800,
			main: {
				temp: 11.83,
				feels_like: 10.79,
				temp_min: 11.83,
				temp_max: 11.83,
				pressure: 1003,
				sea_level: 1003,
				grnd_level: 995,
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
				all: 53,
			},
			wind: {
				speed: 4.67,
				deg: 358,
				gust: 10.05,
			},
			visibility: 10000,
			pop: 0,
			sys: {
				pod: "n",
			},
			dt_txt: "2024-04-17 03:00:00",
		},
		{
			dt: 1713333600,
			main: {
				temp: 10.61,
				feels_like: 9.45,
				temp_min: 10.61,
				temp_max: 10.61,
				pressure: 1004,
				sea_level: 1004,
				grnd_level: 996,
				humidity: 66,
				temp_kf: 0,
			},
			weather: [
				{
					id: 802,
					main: "Clouds",
					description: "scattered clouds",
					icon: "03d",
				},
			],
			clouds: {
				all: 28,
			},
			wind: {
				speed: 5.01,
				deg: 1,
				gust: 7.39,
			},
			visibility: 10000,
			pop: 0,
			sys: {
				pod: "d",
			},
			dt_txt: "2024-04-17 06:00:00",
		},
		{
			dt: 1713344400,
			main: {
				temp: 16.07,
				feels_like: 14.99,
				temp_min: 16.07,
				temp_max: 16.07,
				pressure: 1005,
				sea_level: 1005,
				grnd_level: 997,
				humidity: 48,
				temp_kf: 0,
			},
			weather: [
				{
					id: 800,
					main: "Clear",
					description: "clear sky",
					icon: "01d",
				},
			],
			clouds: {
				all: 4,
			},
			wind: {
				speed: 3.07,
				deg: 342,
				gust: 3.48,
			},
			visibility: 10000,
			pop: 0,
			sys: {
				pod: "d",
			},
			dt_txt: "2024-04-17 09:00:00",
		},
		{
			dt: 1713355200,
			main: {
				temp: 19.51,
				feels_like: 18.25,
				temp_min: 19.51,
				temp_max: 19.51,
				pressure: 1005,
				sea_level: 1005,
				grnd_level: 997,
				humidity: 28,
				temp_kf: 0,
			},
			weather: [
				{
					id: 800,
					main: "Clear",
					description: "clear sky",
					icon: "01d",
				},
			],
			clouds: {
				all: 2,
			},
			wind: {
				speed: 3.3,
				deg: 315,
				gust: 4.26,
			},
			visibility: 10000,
			pop: 0,
			sys: {
				pod: "d",
			},
			dt_txt: "2024-04-17 12:00:00",
		},
		{
			dt: 1713366000,
			main: {
				temp: 19.03,
				feels_like: 17.72,
				temp_min: 19.03,
				temp_max: 19.03,
				pressure: 1004,
				sea_level: 1004,
				grnd_level: 996,
				humidity: 28,
				temp_kf: 0,
			},
			weather: [
				{
					id: 800,
					main: "Clear",
					description: "clear sky",
					icon: "01d",
				},
			],
			clouds: {
				all: 1,
			},
			wind: {
				speed: 4.64,
				deg: 309,
				gust: 4.26,
			},
			visibility: 10000,
			pop: 0,
			sys: {
				pod: "d",
			},
			dt_txt: "2024-04-17 15:00:00",
		},
		{
			dt: 1713376800,
			main: {
				temp: 12.6,
				feels_like: 11.48,
				temp_min: 12.6,
				temp_max: 12.6,
				pressure: 1006,
				sea_level: 1006,
				grnd_level: 998,
				humidity: 60,
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
				all: 1,
			},
			wind: {
				speed: 2.66,
				deg: 298,
				gust: 6.02,
			},
			visibility: 10000,
			pop: 0,
			sys: {
				pod: "n",
			},
			dt_txt: "2024-04-17 18:00:00",
		},
		{
			dt: 1713387600,
			main: {
				temp: 10.68,
				feels_like: 9.61,
				temp_min: 10.68,
				temp_max: 10.68,
				pressure: 1008,
				sea_level: 1008,
				grnd_level: 999,
				humidity: 69,
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
				all: 62,
			},
			wind: {
				speed: 0.61,
				deg: 229,
				gust: 1.15,
			},
			visibility: 10000,
			pop: 0,
			sys: {
				pod: "n",
			},
			dt_txt: "2024-04-17 21:00:00",
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
			dt: 1713409200,
			main: {
				temp: 9.9,
				feels_like: 7.72,
				temp_min: 9.9,
				temp_max: 9.9,
				pressure: 1005,
				sea_level: 1005,
				grnd_level: 997,
				humidity: 81,
				temp_kf: 0,
			},
			weather: [
				{
					id: 801,
					main: "Clouds",
					description: "few clouds",
					icon: "02n",
				},
			],
			clouds: {
				all: 14,
			},
			wind: {
				speed: 4.36,
				deg: 110,
				gust: 7.9,
			},
			visibility: 10000,
			pop: 0,
			sys: {
				pod: "n",
			},
			dt_txt: "2024-04-18 03:00:00",
		},
		{
			dt: 1713420000,
			main: {
				temp: 13.06,
				feels_like: 12.22,
				temp_min: 13.06,
				temp_max: 13.06,
				pressure: 1004,
				sea_level: 1004,
				grnd_level: 996,
				humidity: 69,
				temp_kf: 0,
			},
			weather: [
				{
					id: 500,
					main: "Rain",
					description: "light rain",
					icon: "10d",
				},
			],
			clouds: {
				all: 48,
			},
			wind: {
				speed: 4.31,
				deg: 152,
				gust: 7.91,
			},
			visibility: 10000,
			pop: 0.2,
			rain: {
				"3h": 0.15,
			},
			sys: {
				pod: "d",
			},
			dt_txt: "2024-04-18 06:00:00",
		},
		{
			dt: 1713430800,
			main: {
				temp: 16.83,
				feels_like: 15.87,
				temp_min: 16.83,
				temp_max: 16.83,
				pressure: 1004,
				sea_level: 1004,
				grnd_level: 996,
				humidity: 50,
				temp_kf: 0,
			},
			weather: [
				{
					id: 802,
					main: "Clouds",
					description: "scattered clouds",
					icon: "03d",
				},
			],
			clouds: {
				all: 50,
			},
			wind: {
				speed: 3.97,
				deg: 205,
				gust: 4.73,
			},
			visibility: 10000,
			pop: 0,
			sys: {
				pod: "d",
			},
			dt_txt: "2024-04-18 09:00:00",
		},
		{
			dt: 1713441600,
			main: {
				temp: 17.14,
				feels_like: 16.24,
				temp_min: 17.14,
				temp_max: 17.14,
				pressure: 1004,
				sea_level: 1004,
				grnd_level: 996,
				humidity: 51,
				temp_kf: 0,
			},
			weather: [
				{
					id: 802,
					main: "Clouds",
					description: "scattered clouds",
					icon: "03d",
				},
			],
			clouds: {
				all: 32,
			},
			wind: {
				speed: 6.84,
				deg: 230,
				gust: 7.31,
			},
			visibility: 10000,
			pop: 0.21,
			sys: {
				pod: "d",
			},
			dt_txt: "2024-04-18 12:00:00",
		},
		{
			dt: 1713452400,
			main: {
				temp: 16.74,
				feels_like: 15.72,
				temp_min: 16.74,
				temp_max: 16.74,
				pressure: 1003,
				sea_level: 1003,
				grnd_level: 995,
				humidity: 48,
				temp_kf: 0,
			},
			weather: [
				{
					id: 800,
					main: "Clear",
					description: "clear sky",
					icon: "01d",
				},
			],
			clouds: {
				all: 0,
			},
			wind: {
				speed: 3.73,
				deg: 246,
				gust: 4.67,
			},
			visibility: 10000,
			pop: 0.13,
			sys: {
				pod: "d",
			},
			dt_txt: "2024-04-18 15:00:00",
		},
		{
			dt: 1713463200,
			main: {
				temp: 12.23,
				feels_like: 11.44,
				temp_min: 12.23,
				temp_max: 12.23,
				pressure: 1005,
				sea_level: 1005,
				grnd_level: 997,
				humidity: 74,
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
				all: 7,
			},
			wind: {
				speed: 2.62,
				deg: 274,
				gust: 4.84,
			},
			visibility: 10000,
			pop: 0.53,
			rain: {
				"3h": 0.6,
			},
			sys: {
				pod: "n",
			},
			dt_txt: "2024-04-18 18:00:00",
		},
		{
			dt: 1713474000,
			main: {
				temp: 9.4,
				feels_like: 9.4,
				temp_min: 9.4,
				temp_max: 9.4,
				pressure: 1007,
				sea_level: 1007,
				grnd_level: 999,
				humidity: 89,
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
				all: 13,
			},
			wind: {
				speed: 1.1,
				deg: 278,
				gust: 2.58,
			},
			visibility: 10000,
			pop: 0.79,
			rain: {
				"3h": 0.42,
			},
			sys: {
				pod: "n",
			},
			dt_txt: "2024-04-18 21:00:00",
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
		{
			dt: 1713495600,
			main: {
				temp: 8.78,
				feels_like: 7.61,
				temp_min: 8.78,
				temp_max: 8.78,
				pressure: 1008,
				sea_level: 1008,
				grnd_level: 1000,
				humidity: 93,
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
				all: 65,
			},
			wind: {
				speed: 2.19,
				deg: 316,
				gust: 5.59,
			},
			visibility: 10000,
			pop: 0.22,
			rain: {
				"3h": 0.11,
			},
			sys: {
				pod: "n",
			},
			dt_txt: "2024-04-19 03:00:00",
		},
		{
			dt: 1713506400,
			main: {
				temp: 9.2,
				feels_like: 9.2,
				temp_min: 9.2,
				temp_max: 9.2,
				pressure: 1009,
				sea_level: 1009,
				grnd_level: 1001,
				humidity: 84,
				temp_kf: 0,
			},
			weather: [
				{
					id: 802,
					main: "Clouds",
					description: "scattered clouds",
					icon: "03d",
				},
			],
			clouds: {
				all: 43,
			},
			wind: {
				speed: 1.2,
				deg: 302,
				gust: 3.15,
			},
			visibility: 10000,
			pop: 0,
			sys: {
				pod: "d",
			},
			dt_txt: "2024-04-19 06:00:00",
		},
		{
			dt: 1713517200,
			main: {
				temp: 13.57,
				feels_like: 12.55,
				temp_min: 13.57,
				temp_max: 13.57,
				pressure: 1010,
				sea_level: 1010,
				grnd_level: 1002,
				humidity: 60,
				temp_kf: 0,
			},
			weather: [
				{
					id: 500,
					main: "Rain",
					description: "light rain",
					icon: "10d",
				},
			],
			clouds: {
				all: 32,
			},
			wind: {
				speed: 3.25,
				deg: 357,
				gust: 3.51,
			},
			visibility: 10000,
			pop: 0.2,
			rain: {
				"3h": 0.15,
			},
			sys: {
				pod: "d",
			},
			dt_txt: "2024-04-19 09:00:00",
		},
		{
			dt: 1713528000,
			main: {
				temp: 14.61,
				feels_like: 13.48,
				temp_min: 14.61,
				temp_max: 14.61,
				pressure: 1010,
				sea_level: 1010,
				grnd_level: 1002,
				humidity: 52,
				temp_kf: 0,
			},
			weather: [
				{
					id: 500,
					main: "Rain",
					description: "light rain",
					icon: "10d",
				},
			],
			clouds: {
				all: 60,
			},
			wind: {
				speed: 4.02,
				deg: 337,
				gust: 4.29,
			},
			visibility: 10000,
			pop: 0.26,
			rain: {
				"3h": 0.12,
			},
			sys: {
				pod: "d",
			},
			dt_txt: "2024-04-19 12:00:00",
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

export const city: ICity = {
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
