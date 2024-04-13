import { Routes } from "@angular/router";
import { HomeComponent } from "../home/home.component";
import { WeatherComponent } from "../weather/weather.component";
import { forecastDetailsGuard } from "./forecast-details.guard";

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
		path: "forecast",
		component: WeatherComponent,
		data: { animationState: "forecastState" },
		canActivate: [forecastDetailsGuard],
	},
	{
		path: "**",
		redirectTo: "home",
	},
];
