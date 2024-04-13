import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { WeatherComponent } from "./weather/weather.component";

export const routes: Routes = [
	{
		path: "",
		children: [
			{
				path: "home",
				component: HomeComponent,
				data: { animationState: "homeState" },
			},
			{
				path: "weather",
				component: WeatherComponent,
				data: { animationState: "weatherState" },
			},
		],
	},
	{
		path: "**",
		redirectTo: "home",
	},
];
