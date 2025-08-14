export const forecastApiConfig = {
	findCities: {
		method: `https://api.openweathermap.org/data/2.5/find`,
		params: {
			q: "",
			appid: "",
			units: "metric",
			type: "like",
		},
	},
	getCityWeather: {
		method: `https://api.openweathermap.org/data/2.5/weather`,
		params: {
			id: "",
			appid: "",
			units: "metric",
		},
	},
	getCityForecast: {
		method: `https://api.openweathermap.org/data/2.5/forecast`,
		params: {
			id: "",
			appid: "",
			units: "metric",
		},
	},
};
