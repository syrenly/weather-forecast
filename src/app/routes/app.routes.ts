import { Type } from "@angular/core";
import { DefaultExport, Routes } from "@angular/router";
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
		loadComponent: (): Promise<DefaultExport<Type<unknown>>> => import("../home/home.component"),
		data: { animationState: "homeState" },
	},
	{
		path: "forecast/:id",
		loadComponent: (): Promise<DefaultExport<Type<unknown>>> => import("../forecast/forecast.component"),
		data: { animationState: "forecastState" },
		canActivate: [forecastDetailsGuard],
		resolve: [cityResolver],
	},
	{
		path: "**",
		redirectTo: "home",
	},
];
