import { NgOptimizedImage } from "@angular/common";
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Router } from "@angular/router";
import { ICityWeather } from "../types/city-types";
import { SearchbarComponent } from "../ui-components/searchbar/searchbar.component";
import { SwitchThemeComponent } from "../ui-components/switch-theme/switch-theme.component";
/**
 * The HomeComponent is the initial page for the application.
 * - toggle button to switch between light and dark theme
 * - title
 * - small description
 * - search bar to choose a city to retrieve its weather forecasts
 * - buttons with specific city ids
 */
@Component({
	selector: "app-home",
	standalone: true,
	imports: [
		MatCardModule,
		MatButtonModule,
		NgOptimizedImage,
		SearchbarComponent,
		SwitchThemeComponent,
		MatTooltipModule,
	],
	templateUrl: "./home.component.html",
	styleUrl: "./home.component.scss",
})
export class HomeComponent {
	constructor(private readonly router: Router) {}

	navigateByCityId(cityId: number): void {
		this.router.navigate(["forecast", cityId]);
	}
	navigateToCity(city: ICityWeather): void {
		this.router.navigateByUrl(`/forecast/${city.id}`, {
			state: city,
		});
	}
}
