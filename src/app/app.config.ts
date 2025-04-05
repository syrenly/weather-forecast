import { HttpClient, provideHttpClient } from "@angular/common/http";
import { ApplicationConfig, inject, provideAppInitializer } from "@angular/core";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { routes } from "./routes/app.routes";
import { WEATHER_API_KEY, initializeApp, provideCurrentTheme, provideWeatherApiKey } from "./tokens";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideAnimations(),
		provideHttpClient(),
		// set theme
		provideCurrentTheme(),
		// set the license key for OpenWeather API
		provideWeatherApiKey(),
		// initialize the application retrieving the configuration file
		provideAppInitializer(() => {
			const initializerFn = initializeApp(inject(HttpClient), inject(WEATHER_API_KEY));
			return initializerFn();
		}),
		// set outline style for material
		{
			provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
			useValue: { appearance: "outline" },
		},
		provideAnimationsAsync(),
	],
};
