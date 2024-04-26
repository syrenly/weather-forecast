import { HttpClient, provideHttpClient } from "@angular/common/http";
import { APP_INITIALIZER, ApplicationConfig } from "@angular/core";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { routes } from "./routes/app.routes";
import { WEATHER_API_KEY, initializeApp, provideCurrentTheme, provideWeatherApiKey } from "./tokens";

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
		{
			provide: APP_INITIALIZER,
			useFactory: initializeApp,
			multi: true,
			deps: [HttpClient, WEATHER_API_KEY],
		},
		// set outline style for material
		{
			provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
			useValue: { appearance: "outline" },
		},
	],
};
