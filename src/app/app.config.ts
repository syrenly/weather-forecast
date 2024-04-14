import { provideHttpClient } from "@angular/common/http";
import { ApplicationConfig } from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { WEATHER_API_LICENSE } from "./consts";
import { routes } from "./routes/app.routes";

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideAnimations(),
		provideHttpClient(),
		{
			provide: WEATHER_API_LICENSE,
			useValue: "0772d97e05b9ab036c823577ba14f7be",
		},
	],
};
