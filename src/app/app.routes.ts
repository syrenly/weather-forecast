import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { weatherDetailsGuard } from "./weather-details.guard";
import { WeatherComponent } from "./weather/weather.component";

export const routes: Routes = [
	{
		path: "",
		redirectTo: "home",
		pathMatch: "full",
	},
	{
		path: "home",
		component: HomeComponent,
		data: { animationState: "homeState" },
	},
	{
		path: "weather",
		component: WeatherComponent,
		data: { animationState: "weatherState" },
		canActivate: [weatherDetailsGuard],
	},
	{
		path: "**",
		redirectTo: "home",
	},
];
