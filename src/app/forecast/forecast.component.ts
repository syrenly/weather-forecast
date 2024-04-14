import { NgOptimizedImage } from "@angular/common";
import { Component, DestroyRef, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { ActivatedRoute, Data, Router, RouterLink } from "@angular/router";
import { FlagPipe } from "../pipes/flag.pipe";
import { WeatherPipe } from "../pipes/weather.pipe";
import { ICity, IWeather, RouteData } from "../types";
import { SearchbarComponent } from "../ui-components/searchbar/searchbar.component";
import { SearchService } from "./../services/search.service";

@Component({
	selector: "app-forecast",
	standalone: true,
	imports: [
		SearchbarComponent,
		RouterLink,
		MatIconModule,
		MatCardModule,
		NgOptimizedImage,
		FlagPipe,
		WeatherPipe,
	],
	templateUrl: "./forecast.component.html",
	styleUrl: "./forecast.component.scss",
})
export class ForecastComponent implements OnInit {
	city: ICity | undefined;
	get mainWeather(): IWeather | undefined {
		return this.city?.weather ? this.city.weather[0] : undefined;
	}

	constructor(
		private readonly route: ActivatedRoute,
		private readonly router: Router,
		private readonly searchService: SearchService,
		private readonly destroyRef: DestroyRef
	) {}
	ngOnInit(): void {
		this.route.data
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe((value: Data) => {
				console.log(value);
				const routeData: RouteData = value[0];
				delete routeData["animationState"];
				this.city = routeData;

				// this.searchService.
			});
	}
}
