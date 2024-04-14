import { registerLocaleData } from "@angular/common";
import { provideHttpClient } from "@angular/common/http";
import localeIt from "@angular/common/locales/it";
import { ApplicationConfig, LOCALE_ID } from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { routes } from "./routes/app.routes";
import { WEATHER_API_LICENSE } from "./tokens";
registerLocaleData(localeIt);

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideAnimations(),
		provideHttpClient(),
		{
			provide: WEATHER_API_LICENSE,
			useValue: "0772d97e05b9ab036c823577ba14f7be",
		},
		{ provide: LOCALE_ID, useValue: "it" },
	],
};
