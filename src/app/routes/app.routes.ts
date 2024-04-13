import { Routes } from "@angular/router";
import { ForecastComponent } from "../forecast/forecast.component";
import { HomeComponent } from "../home/home.component";
import { cityResolver } from "./city.resolver";
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
		path: "forecast/:id",
		component: ForecastComponent,
		data: { animationState: "forecastState" },
		canActivate: [forecastDetailsGuard],
		resolve: [cityResolver],
	},
	{
		path: "forecast/:id",
		component: ForecastComponent,
		data: { animationState: "forecastState" },
		canActivate: [forecastDetailsGuard],
		resolve: [cityResolver],
	},
	{
		path: "**",
		redirectTo: "home",
	},
];
