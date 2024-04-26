import { provideHttpClient } from "@angular/common/http";
import { ApplicationConfig } from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { routes } from "./routes/app.routes";
import { CURRENT_THEME, WEATHER_API_LICENSE, currentTheme } from "./tokens";

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideAnimations(),
		provideHttpClient(),
		{
			provide: WEATHER_API_LICENSE,
			useValue: "748b5bd78f76204828fe90b418acbe5c",
		},
		{ provide: CURRENT_THEME, useFactory: currentTheme, deps: [] },
	],
};
