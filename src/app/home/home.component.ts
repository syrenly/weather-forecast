import { NgOptimizedImage } from "@angular/common";
import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Router } from "@angular/router";
import { ICityIdName, ICityWeather } from "../types/city-types";
import { ApiAlertComponent } from "../ui-components/api-alert/api-alert.component";
import { SearchbarComponent } from "../ui-components/searchbar/searchbar.component";
import { SwitchThemeComponent } from "../ui-components/switch-theme/switch-theme.component";
import { RecentCitiesService } from "./../services/recent-cities.service";
import { SearchService } from "./../services/search.service";
import { getRandomElements } from "./home.utils";
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
	imports: [
		ApiAlertComponent,
		MatButtonModule,
		MatCardModule,
		MatTooltipModule,
		NgOptimizedImage,
		SearchbarComponent,
		SwitchThemeComponent,
	],
	templateUrl: "./home.component.html",
	styleUrl: "./home.component.scss",
})
export default class HomeComponent implements OnInit {
	cities: ICityIdName[] = [];
	// #region Dependencies
	private readonly router = inject(Router);
	private readonly searchService = inject(SearchService);
	private readonly recentCitiesService = inject(RecentCitiesService);
	private readonly destroyRef = inject(DestroyRef);
	// #endregion

	ngOnInit(): void {
		this.searchService
			.getSampleCities()
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(cities => {
				this.cities = this.recentCitiesService.getHomeCities(getRandomElements<ICityIdName>(cities));
			});
	}

	navigateByCityId(city: ICityIdName): void {
		this.recentCitiesService.recordCity(city);
		this.router.navigate(["forecast", city.id]);
	}
	navigateToCity(city: ICityWeather): void {
		this.recentCitiesService.recordCity({ id: city.id, name: city.name });
		this.router.navigateByUrl(`/forecast/${city.id}`, {
			state: city,
		});
	}
}
