import { HttpClient, provideHttpClient } from "@angular/common/http";
import { ApplicationConfig, inject, provideAppInitializer } from "@angular/core";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from "@angular/router";
import { routes } from "./routes/app.routes";
import {
	IS_DEV_MODE,
	WEATHER_API_KEY,
	initializeApp,
	provideCurrentTheme,
	provideIsDevEnvironment,
	provideWeatherApiKey,
} from "./tokens";

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideAnimations(),
		provideHttpClient(),
		// set theme
		provideCurrentTheme(),
		// set the license key for OpenWeather API
		provideWeatherApiKey(),
		// wrap the environment check to allow easier tests
		provideIsDevEnvironment(),
		// initialize the application retrieving the configuration file
		provideAppInitializer(() => {
			const initializerFn = initializeApp(inject(HttpClient), inject(WEATHER_API_KEY), inject(IS_DEV_MODE));
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
